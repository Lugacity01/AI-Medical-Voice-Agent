import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserMd } from "react-icons/fa";

const menuOptions = [
  {
    id: 1,
    name: "Home",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "History",
    path: "/dashboard/history",
  },
  {
    id: 3,
    name: "Pricing",
    path: "/dashboard/billing",
  },

  {
    id: 4,
    name: "Profile",
    path: "/profile",
  },
];

function AppHeader() {
  return (
    <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <FaUserMd className="text-xl" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          MediVoice AI
        </h1>
      </div>
      <div className="hidden md:flex gap-12 items-center">
        {menuOptions.map((option, index) =>(
            <Link key={index} href={option.path}>
                <h2 className="hover:font-bold cursor-pointer transition-all">{option.name}</h2>
            </Link>
        ))}
      </div>

      <UserButton/>
    </div>
  );
}

export default AppHeader;
