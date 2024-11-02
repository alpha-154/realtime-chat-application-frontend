"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/utils/slices/userSlice";
import { AppDispatch, RootState } from "@/utils/store";
import List from "./_components/List";
import UserSearchList from "@/components/UserSearchList";
import { SearchUser } from "@/interface/index";
import debounce from "lodash.debounce";
import axios from "axios";
import { connectedUsers } from "@/interface/index";

import ChatField from "./_components/ChatField";

export default function Chat() {
  // accessing the user Id of the logged in user
  const dispatch = useDispatch<AppDispatch>();
  const { username: loggedInUserUsername } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // fetching connected users list:
  const [connectedUsers, setConnectedUsers] = useState<connectedUsers[]>([]);

  useEffect(() => {
    const fetchConnectedUsers = async () => {
      if (!loggedInUserUsername) {
        return;
      }
      try {
        console.log("username", loggedInUserUsername);
        const response = await axios.get(
          `http://localhost:8000/api/user/getConnectedUsers/${loggedInUserUsername}`
        );
        if (response.status === 200) {
          setConnectedUsers(response.data.connectedUsers);
        }
      } catch (error) {
        console.error("Error fetching connected users:", error);
      }
    };

    fetchConnectedUsers();
  }, [loggedInUserUsername]);

  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

  // Debounced search function
  const fetchUsers = debounce(async (query: string) => {
    if (query.trim() === "") {
      setUsers([]);
      setLoading(false);
      return;
    }
    setLoading(true); // Start loading when search begins
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/search`,
        {
          params: { query },
        }
      );
      console.log("searched user data", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // End loading when search completes
    }
  }, 300);

  // Effect to handle input change
  useEffect(() => {
    fetchUsers(query);
  }, [query]);

  // Handle search button click
  const handleSearch = () => {
    setSearchClicked(true);
    fetchUsers(query);
  };

  //chat field codes
  const [selectedUsers, setSelectedUsers] = useState({
    currentUser: "",
    chatWithUser: "",
    privateMessageId: "",
  });

  const handleChatField = ({
    currentUser,
    chatWithUser,
    privateMessageId,
  }: {
    currentUser: string;
    chatWithUser: string;
    privateMessageId: string;
  }) => {
    if (!currentUser && !chatWithUser && !privateMessageId) return;

    setSelectedUsers({
      currentUser,
      chatWithUser,
      privateMessageId,
    });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex justify-between items-center gap-5 bg-white p-4">
      <div className="basis-[35%] flex flex-col gap-4">
        <div className="flex flex-col gap-2 mt-5 p-4 text-black border border-black rounded-md">
          <input
            type="text"
            placeholder="search a user"
            className="p-2 text-black text-md border border-black rounded-md"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLoading(true); // Show "searching the user..." message while typing
              setSearchClicked(false); // Reset search click
            }}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>

          <div className="flex flex-col gap-2 p-4 mt-2 ">
            <h1 className="text-2xl">Available Users:</h1>

            {/* Show loading message */}
            {loading && !searchClicked ? (
              <p>Searching the user...</p>
            ) : (
              <>
                {/* Show search results or "No users found" based on results */}
                {
                  users.length > 0
                    ? users.map((user, index) => (
                        <UserSearchList
                          key={index}
                          username={user.userName}
                          avatar={user.profileImage}
                          loggedInUserUsername={loggedInUserUsername}
                        />
                      ))
                    : searchClicked && <p>No users found</p> // Show "No users found" only if search button is clicked
                }
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 mt-5 text-black border border-black rounded-md">
          <h1 className="text-2xl">Connected Users List:</h1>
          {connectedUsers.length > 0 ? (
            connectedUsers.map((user, index) => (
              <List
                key={index}
                currLoggedInUserUsername={loggedInUserUsername}
                userName={user.userName}
                profileImage={user.profileImage}
                privateMessageId={user.privateMessageId}
                onClickFunction={handleChatField}
              />
            ))
          ) : (
            <p className="text-xl text-red-500">No connected users</p>
          )}
        </div>
      </div>

      <div className="basis-[60%]">
        <h1 className="text-3xl text-red-500 mb-4">
          Your profile: {loggedInUserUsername}
        </h1>
        {!selectedUsers?.currentUser && !selectedUsers?.chatWithUser && !selectedUsers?.privateMessageId ? (
          <p className="text-2xl text-red-500">Select a user to chat</p>
        ) : (
          <ChatField selectedUsers={selectedUsers} />
        )}
      </div>
    </div>
  );
}
