// components/List.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ListProps {
  username: string;
  avatar: string;
  loggedInUserUsername: string;
}

const UserSearchList: React.FC<ListProps> = ({ username , avatar, loggedInUserUsername}) => {
  return (
    <Link href={`/user-profile/${username}?user=${loggedInUserUsername}`}>
    <div className="p-4 border border-gray-300 rounded-md">
      <div className="flex justify-start items-center space-x-2">
        <div className="border border-black rounded-full w-10 h-8 flex items-center justify-center">
          {
            avatar === "" ? (
              <p className="text-black font-semibold">{username.charAt(0).toUpperCase()}</p>
            ) :  <Image src={avatar} alt="avatar" width={40} height={25}  className='rounded-full' />
          }
         
        </div>
        <div>
          <p className="font-semibold text-red-500">{username}</p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default UserSearchList;
