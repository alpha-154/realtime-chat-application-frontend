"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { INotification } from "@/interface/index";
import axios from "axios";
import Notification from "../_components/Notification";

export default function NotificationPage() {
  const { username } = useParams();
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/notifications/${username}`
        );
        if (response.status === 200) {
          setNotifications(response.data.notifications);
          console.log("notifications", response.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);

      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <h1 className="text-2xl text-center">
        Your notifications will be showed here
      </h1>
      <div className="flex flex-col items-center gap-2">
        { notifications?.map( (notification, index) => (
            <Notification key={index} currentUserUsername={username as string} requestedUserUsername={notification?.userName} profileImage={notification?.profileImage} />
        ))}
      </div>
    </div>
  );
}
