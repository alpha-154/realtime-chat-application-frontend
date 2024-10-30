// components/Login.tsx
"use client"; // Next.js directive for client components

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  

    console.log("username", userName)
    console.log("password", password)
    
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        userName,
        password,
      },
      {
        withCredentials: true,
      }
    );
    
      setSuccessMessage(response.data.message);
      console.log("response.data.message", response.data.user)
      setUserName('');
      setPassword('');
      
      router.replace("/");
    } catch (err) {
      
      const error = err as AxiosError<{ message: string }>; // Type assertion for error response
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
      setUserName('');
      setPassword('');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="userName" className="block mb-2">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
      <h1 className="text-center mt-4 text-green-500">Don&apos;t have an account? <Link href="/register">Register</Link></h1>
    </div>
  );
};

export default Login;
