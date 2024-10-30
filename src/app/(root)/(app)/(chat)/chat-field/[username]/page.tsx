"use client";
import React from 'react'
import { useParams } from 'next/navigation';

export default function ChatField() {
  const { username } = useParams();
  return (
    <div className='min-h-screen max-w-7xl mx-auto'>
        <h1 className='text-3xl text-center mt-5'>Chat field</h1>
     <div className='flex flex-col gap-4 mt-5 items-center justify-center border border-red-500 rounded-md p-5 '>
        {/* individual messages */}
        <div className='relative flex flex-col gap-4 p-5 border border-black rounded-md'>
        <span className='absolute top-0 left-0 border border-black rounded-full text-red-600'>{username}</span>
        <p className='mt-2 text-left text-md '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, modi maxime rerum expedita explicabo tempora vero quod incidunt inventore laboriosam.</p>
        <span className='absolute bottom-0 right-0 p-2 border border-black rounded-md text-violet-600'>date:</span>
        </div>
       {/*  */}

       {/* input field */}
       <form>
        <input type="text" placeholder='message' className='p-2 text-black text-md border border-black rounded-md'/>
        <button type='submit' className='p-2 text-black text-md border border-black rounded-md'>send</button>
       </form>
     </div>
    </div>
  )
}
