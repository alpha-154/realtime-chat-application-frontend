import React from 'react'
import Image from 'next/image'
import axios from 'axios';
//import axios from 'axios';

export default function Notification({ 
    currentUserUsername,
    requestedUserUsername,
    profileImage
}: {
    currentUserUsername: string;
    requestedUserUsername: string;
    profileImage: string;
}) {

  const handleAcceptRequest = async () => {
     if(!currentUserUsername || !requestedUserUsername) return;
     try {
       const response = await axios.post("http://localhost:8000/api/user/accept-message-request", {
         currentUser: currentUserUsername,
         requestedUser: requestedUserUsername
       });
       if(response.status === 200){
         alert(response.data.message);
       }
     } catch (error) {
       console.log("from error", error)
       alert("something went wrong while accepting user message request!")
     }
  }

  return (
    <>
     <h1 className='text-lg text-red-500'>{requestedUserUsername} sent you a message request</h1>
     <div className='w-full p-2 flex items-center justify-between border border-black rounded-md'>
        <div className='flex items-center justify-center gap-2'>
         
          { profileImage &&  <Image src={profileImage} alt="avatar" width={40} height={25} className='rounded-full' />}
       
        <p className='ml-2'>{requestedUserUsername} </p>
       
        </div>
        <button onClick={handleAcceptRequest} className='p-2 text-black text-md border border-red-500 rounded-md'>Accept</button>
     
    </div>
    </>
   
  )
}
