"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function List({
  userName,
  profileImage,
}: {
  userName: string;
  profileImage: string;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/chat-field/${userName}`);
      }}
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
