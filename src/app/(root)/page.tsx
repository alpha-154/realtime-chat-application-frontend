"use client";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/store";
import { fetchUser } from "@/utils/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userId, username, profileImage, status, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout",
        {}, // Empty object for POST body if needed
        { withCredentials: true } // Ensure cookies are included
      );
      router.replace("/login");
      if (response.status === 200) {
        alert("logged out");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-white text-black">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 p-2 text-black text-md border border-black rounded-md"
      >
        logout
      </button>
      { username && profileImage && userId && (
          <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl text-center">Welcome {username}</h1>
          <Image
            src={profileImage}
            alt="profile image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-2xl text-center mt-5">UserId: {userId}</h1>
          <Link href={`/notification/${username}`} className="text-xl text-red-500">see notifications</Link>
        </div>
      )}
      
      <div className="flex items-center justify-center gap-4 mt-5 p-4 border border-black rounded-md">
        <Link href="/group">Visit Groups</Link>
        <Link href="/chat">Visit Chats</Link>
      </div>
    </div>
  );
}
