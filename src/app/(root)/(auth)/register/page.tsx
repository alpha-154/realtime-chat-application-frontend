"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ErrorResponse {
  message: string;
}

const Register: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      let imageUrl = "";

      // 1. Upload image to Cloudinary if an image is provided
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "user_profile_image");

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dyy7hjubd/image/upload`,
          formData
        );

        imageUrl = cloudinaryResponse.data.secure_url;
      }

      // 2. Register the user with imageUrl if provided
      const response = await axios.post("http://localhost:8000/api/user/register", {
        userName,
        password,
        imageUrl,
      });
      
      setSuccessMessage(response.data.message);
      setUserName("");
      setPassword("");
      setImage(null);
      router.replace("/login");
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
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
        <div>
          <label htmlFor="image" className="block mb-2">Profile Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 w-full"
            accept="image/*"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
      <h1 className="text-center mt-4 text-green-500">Have an account? <Link href="/login">Log In</Link></h1>
    </div>
  );
};

export default Register;












// "use client";
// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// interface ErrorResponse {
//     message: string;
//   }
  

// const Register: React.FC = () => {
//   const [userName, setUserName] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [successMessage, setSuccessMessage] = useState<string>('');

//   const router = useRouter();

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage('');

//     try {
//       const response = await axios.post('http://localhost:8000/api/user/register', {
//         userName,
//         password,
//       });
//       setSuccessMessage(response.data.message);
//       setUserName('');
//       setPassword('');
//       router.replace("/login");
//     } catch (err) {
//       const error = err as  AxiosError<ErrorResponse>;
//      // setError('Something went wrong. Please try again later.');
//       // Handle error response from the backend
//       if (error.response && error.response.data) {
//         setError(error.response.data.message);
//       } else {
//         setError('Something went wrong. Please try again later.');
//       }
//       setUserName('');
//       setPassword('');
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 bg-white text-black">
//       <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
//       <form onSubmit={handleRegister} className="flex flex-col space-y-4">
//         <div>
//           <label htmlFor="userName" className="block mb-2">Username</label>
//           <input
//             type="text"
//             id="userName"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             className="border border-gray-300 p-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="block mb-2">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border border-gray-300 p-2 w-full"
//             required
//           />
//         </div>
//         {error && <p className="text-red-500">{error}</p>}
//         {successMessage && <p className="text-green-500">{successMessage}</p>}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Register
//         </button>
//       </form>
//       <h1 className="text-center mt-4 text-green-500">Have an account? <Link href="/login">Log In</Link></h1>
//     </div>
//   );
// };

// export default Register;

