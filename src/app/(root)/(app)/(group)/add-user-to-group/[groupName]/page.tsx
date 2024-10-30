"use client";
import React from 'react'
import { useParams } from 'next/navigation';

export default function AddUserToGroup() {
    const { groupName } = useParams();

  return (
    <div className='min-h-screen flex flex-col justify-start items-center gap-2 mt-10 bg-white text-black'>
      <h1 className='text-2xl text-red-500 text-center'> {groupName}</h1>
      <p className='text-xl text-center'>Group list will be showed here</p>
    </div>
  )
}
