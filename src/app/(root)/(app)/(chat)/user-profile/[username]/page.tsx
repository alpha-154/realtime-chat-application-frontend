"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";

export default function Profile() {
  const { username } = useParams();
  const params = useSearchParams();
  const user = params.get("user");

  const handleMessageRequest = async () => {
    if (!user) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/message-request`,
        {
          sender: user,
          receiver: username,
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert("message request not sent!");
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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black">
      <h1 className="text-2xl text-center">Profile page</h1>
      <p className="text-xl text-red-500">profile id : {username}</p>
      <p className="text-xl text-black">
        send a message request?{" "}
        <button
          onClick={handleMessageRequest}
          className="text-red-500 font-bold"
        >
          send
        </button>
      </p>
    </div>
  );
}
