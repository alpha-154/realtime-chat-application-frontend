"use client";

import React from "react";
import Image from "next/image";
export default function List({
  currLoggedInUserUsername,
  userName,
  profileImage,
  privateMessageId,
  onClickFunction,
}: {
  currLoggedInUserUsername: string;
  userName: string;
  profileImage: string;
  privateMessageId: string;
  onClickFunction: ({currentUser, chatWithUser,  privateMessageId}: {currentUser: string, chatWithUser: string; privateMessageId: string}) => void;
}) {

  return (
    <div
      onClick={ () => onClickFunction({
        currentUser: currLoggedInUserUsername,
        chatWithUser: userName,
        privateMessageId
      })}
      className="w-full p-5 max-h-[300px] cursor-pointer flex items-center justify-start gap-4 border border-black rounded-md text-black"
    >
      {profileImage && (
        <Image
          src={profileImage}
          alt="profile image"
          width={50}
          height={50}
          className="rounded-full"
        />
      )}
      <div className="flex flex-col gap-2 ">
        <h1 className="text-md ">{userName}</h1>
        <h1 className="text-md ">last message</h1>
      </div>
    </div>
  );
}
