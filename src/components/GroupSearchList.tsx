// components/List.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ListProps {
  groupname: string;
  avatar: string;
}

const GroupSearchList: React.FC<ListProps> = ({ groupname , avatar}) => {
  return (
    <Link href={`/group-profile/${groupname}`}>
    <div className="p-4 border border-gray-300 rounded-md">
      <div className="flex justify-start items-center space-x-2">
        <div className="border border-black rounded-full w-10 h-8 flex items-center justify-center">
          {
            avatar === "" ? (
              <p className="text-black font-semibold">{groupname.charAt(0).toUpperCase()}</p>
            ) :  <Image src={avatar} alt="avatar" width={40} height={25}  className='rounded-full' />
          }
         
        </div>
        <div>
          <p className="font-semibold text-red-500">{groupname}</p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default GroupSearchList;
