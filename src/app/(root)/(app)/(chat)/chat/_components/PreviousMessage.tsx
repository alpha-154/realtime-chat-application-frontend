import React from "react";
import { Message } from "@/interface/index";


export default function PreviousMessage({ message , currentUser}: { message: Message; currentUser: string }) {
  return (
    <div className={`relative ${message.from === currentUser ? "bg-blue-500" : "bg-gray-300"} max-w-[500px] flex flex-col gap-4 p-5 border ${message.from === currentUser ? "text-white" : "text-black"} rounded-md ${message.from === currentUser ? "self-end" : " self-start"}`}>
      <p className="text-left text-md">
        {message.content}
      </p>
      <span className="absolute bottom-0 right-0  border border-black rounded-md text-black">
        {message.createdAt}
      </span>
    </div>
  );
}
