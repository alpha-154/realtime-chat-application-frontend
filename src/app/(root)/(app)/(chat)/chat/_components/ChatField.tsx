'use client';
import React, { useEffect, useState, useMemo } from "react";
import { selectedUsersProps } from "@/interface/index";
import axios, { AxiosError } from "axios";
import { Message } from "@/interface/index";
import PreviousMessage from "./PreviousMessage";
import { getSocket } from "@/lib/socket.config";
import { Socket } from "socket.io-client";

export default function ChatField( { selectedUsers }: { selectedUsers: selectedUsersProps } ) {

 
 // State for the socket instance
 const [socket, setSocket] = useState<Socket | null>(null);

 // Set up the socket connection when selectedUsers.chatWithUser changes
 useEffect(() => {
   const socketInstance = getSocket();
   socketInstance.auth = {
     room: selectedUsers.privateMessageId,
   };
   socketInstance.connect();
   setSocket(socketInstance);

   return () => {
     socketInstance.disconnect(); // Clean up the socket when component unmounts or selectedUsers.chatWithUser changes
   };
 }, [selectedUsers.chatWithUser]);

 

  

   //for sending message
   const [message, setMessage] = useState<string>("");


   const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     

     if (!selectedUsers.currentUser && !selectedUsers.chatWithUser && message === "") return;
     try {
       const response = await axios.post(
         "http://localhost:8000/api/user/send-message",
         {
           sender: selectedUsers.currentUser,
           receiver: selectedUsers.chatWithUser,
           content: message,
         }
       );
      
     
        console.log("response.data.message from send api", response.data.message);
         socket?.emit("message", response.data.message);
         setMessage("");
         setPreviousMessages([...previousMessages, response.data.message]);
        console.log("message sent successfully");

      
     } catch (error) {
       console.log("from error");
       const errorResponse = error as AxiosError<{ message: string }>;
       if (errorResponse.response && errorResponse.response.data) {
         alert(errorResponse.response.data.message);
       } else {
         alert("Something went wrong. Please try again later.");
       }
     }

   };
 
   //for getting previous messages
   const [previousMessages, setPreviousMessages] = useState<Message[]>([]);
   useEffect(() => {
     const getPreviousMessages = async () => {
       if (!selectedUsers.currentUser) return;
       try {
         const response = await axios.get(
            `http://localhost:8000/api/user/get-previous-messages/${selectedUsers.currentUser}/${selectedUsers.chatWithUser}`
         );
         if (response.status === 200) {
           setPreviousMessages(response.data.messages);
         }
       } catch (error) {
         console.log("from error");
         const errorResponse = error as AxiosError<{ message: string }>;
         if (errorResponse.response && errorResponse.response.data) {
           alert(errorResponse.response.data.message);
         } else {
           alert("Something went wrong. Please try again later.");
         }
       }
     };
     getPreviousMessages();
   }, [selectedUsers.currentUser, selectedUsers.chatWithUser]);


   //listening for new messages
   useEffect(() => {
    console.log("socket listening started frontend");
    socket?.on("message", (data: Message) => {
      console.log("The message payload is", data);
      setPreviousMessages((prevMessages) => [...prevMessages, data]);
      //scrollToBottom();
    });

    return () => {
      //socket?.disconnect();
      socket?.off("message"); // Clean up only the "message" listener here
    };
   
  }, [socket]);


  return (
    <div className="flex flex-col gap-2 w-full border border-black rounded-md p-4">
      <h1 className="text-lg text-center text-red-500">Chat with {selectedUsers.chatWithUser}</h1>
      <div>
      <div className="flex flex-col gap-4 mt-5  border border-red-500 rounded-md p-5 ">
        {/* individual messages */}
        {previousMessages.length > 0 ? (
          previousMessages.map((message, index) => (
            <PreviousMessage key={index} message={message} currentUser={selectedUsers.currentUser as string} />
          ))
        ) : (
          <h1 className="text-2xl text-center">No messages yet!</h1>
        )}

        {/*  */}
      </div>
       {/* sending message input field */}
       <form onSubmit={handleMessageSend} className="flex items-center justify-center gap-2 mt-5">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="message"
          className="p-2 text-black text-md border border-black rounded-md"
        />
        <button
          type="submit"
          className="p-2 text-black text-md border border-black rounded-md"
        >
          send
        </button>
      </form>
      </div>
    </div>
  )
}
