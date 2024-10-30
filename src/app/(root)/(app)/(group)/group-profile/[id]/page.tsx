"use client";

import React from 'react';
import { useParams } from 'next/navigation';


export default function Profile() {
    const params = useParams();
    const { id } = params;

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-white text-black'>
            <h1 className='text-2xl text-center'>Group Profile Page</h1>
            <p className='text-xl text-red-500'>profile id : {id}</p>
           
        </div>
    );
}
