"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/app/helpers/timeFormatter";
import { formatDate } from "../helpers/dateFormatter";
import { LuPencilLine } from "react-icons/lu";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Statusbar = () => {
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
  const [user, setUser] = useState("User");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(formatTime(now));
      setCurrentDate(formatDate(now));
    }, 30000); // Refresh every 30 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  async function showPopup() {
    const { value: text } = await Swal.fire({
      backdrop: "#fff2",
      title: "Enter your name",
      input: "text",
      inputPlaceholder: user,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Username cannot be empty!";
        }
      },
    });
    if (text) {
      localStorage.setItem("user", text);
      setUser(text);
    }
  }
  return (
    <div className="flex h-[125px] flex-col  justify-center text-lg">
      <div className="flex items-center">
        Hello {user}!
        <LuPencilLine className="ml-2 cursor-pointer" onClick={showPopup} />
      </div>
      <div className="text-4xl font-bold">{currentTime}</div>
      <div className="date">{currentDate}</div>
    </div>
  );
};

export default Statusbar;
