"use client";
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

interface ConnectedGroupListProps {
    groupName: string;
    avatar: string;
    members: number;
    isAdmin: boolean;
}

export default function GroupList({
    groupName,
    avatar,
    members,
    isAdmin
}: ConnectedGroupListProps) {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/group/delete/${groupName}`);
            if(response.status === 200){
                alert("group deleted")
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Failed to delete");
        }
    }

  return (
    <div className='relative w-full flex flex-col gap-2 p-5 max-h-[300px] cursor-pointer border border-black rounded-md text-black'>
        <div className='flex items-center justify-start gap-4'>
        { isAdmin && ( <button onClick={handleDelete} className='absolute top-0 right-0 cursor-pointer text-red-500'>delete</button>)}
     <span className="absolute bottom-0 right-0 text-red-500">members: {members}</span>
      <span className="text-sm p-4 border border-black rounded-full">{avatar}</span>
      <h1 className="text-md">{groupName}</h1>
        </div>
      <div className='w-full'>
        <Link href={`/add-user-to-group/${groupName}`} className="text-md text-green-500">Add Users to this group</Link>
      </div>

    </div>
  )
}
