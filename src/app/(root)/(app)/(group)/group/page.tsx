"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { useDispatch,useSelector } from "react-redux";
import { fetchUser } from "@/utils/slices/userSlice";
import { AppDispatch, RootState } from "@/utils/store";
import GroupSearchList from "@/components/GroupSearchList";
import debounce from "lodash.debounce";
import GroupList from "@/components/GroupList";
import { ISearchGroup, IGroup } from "@/interface/index";

export default function Group() {
  const [groupName, setGroupName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { userId, username, profileImage, status, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/group/create",
        {
          groupName,
          admin: username, // Pass the username as admin
        }
      );

      if (response.status === 201) {
        alert(response.data.message);
        setGroupName(""); // Reset the form after successful submission
      }
    } catch (error) {
      const errorResponse = error as AxiosError<{ message: string }>;
      if (errorResponse.response && errorResponse.response.data) {
        alert(errorResponse.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  //for search functionality
  const [query, setQuery] = useState<string>("");
  const [groups, setGroups] = useState<ISearchGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

  // Debounced search function
  const fetchGroups = debounce(async (query: string) => {
    if (query.trim() === "") {
      setGroups([]);
      setLoading(false);
      return;
    }
    setLoading(true); // Start loading when search begins
    try {
      const response = await axios.get(
        `http://localhost:8000/api/group/search`,
        {
          params: { query },
        }
      );
      console.log("searched user data", response.data);
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // End loading when search completes
    }
  }, 300);

  // Effect to handle input change
  useEffect(() => {
    fetchGroups(query);
  }, [query]);

  // Handle search button click
  const handleSearch = () => {
    setSearchClicked(true);
    fetchGroups(query);
  };

  // fetching the grouplist for current logged in user
  const [connectedGroups, setConnectedGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/group/getGroups/${username}`, // Pass username in URL
          {
            withCredentials: true, // Optional: if needed for authentication
          }
        );
    

        if (response.status === 200) {
          setConnectedGroups(response.data.groups);
          console.log("groupslist ", response.data.groups);
        } else {
          console.error("Failed to fetch group list from token!");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    if(username){
      fetchGroups();
    }

  }, [username]);


  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center gap-5 bg-white">
      { username && userId && profileImage && (
          <div className="flex flex-col items-center">
          {profileImage !== "" && (
            <Image
              src={profileImage}
              alt="Profile"
              width={100}
              height={50}
              className="rounded-full"
            />
          )}
  
          <h1 className="text-3xl mt-5 font-bold text-red-500">
            {username}: {userId}
          </h1>
        </div>
      )}
      

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 mt-5 p-4 text-black border border-black rounded-md">
          <input
            type="text"
            placeholder="search a group"
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
            <h1 className="text-2xl">Available Groups:</h1>

            {/* Show loading message */}
            {loading && !searchClicked ? (
              <p>Searching the user...</p>
            ) : (
              <>
                {/* Show search results or "No users found" based on results */}
                {
                  groups.length > 0
                    ? groups.map((group, index) => (
                        <GroupSearchList
                          key={index}
                          groupname={group.groupName}
                          avatar=""
                        />
                      ))
                    : searchClicked && <p>No groups found</p> // Show "No users found" only if search button is clicked
                }
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2 p-4 mt-5 text-black border border-black rounded-md"
        >
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
            className="p-2 text-black text-md border border-black rounded-md"
          />
          <button
            type="submit"
            className="p-2 text-black ml-2 text-md border border-black rounded-md"
          >
            create
          </button>
        </form>
      </div>
      <div className="flex flex-col p-4 gap-2 mt-5 text-black border border-black rounded-md">
        <h1 className="text-2xl">Connected Groups List: </h1>

        {connectedGroups.length > 0 ? (
          connectedGroups.map((connectedGroup, index) => (
            <GroupList
              key={index}
              groupName={connectedGroup.groupName}
              avatar=""
              members={connectedGroup.members.length}
              isAdmin={connectedGroup.admin === userId}
            />
          ))
        ) : (
          <p className="text-2xl text-red-500">No groups found</p>
        )}
      </div>
    </div>
  );
}
