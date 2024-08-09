"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ProfileImg } from "@/assets/images/Main";
import { usePathname, useRouter } from "next/navigation";
import AddTask from "./add-task";
import {
  AnalyticsIcon,
  BoardsIcon,
  CreateTaskIcon,
  HomeIcon,
  NotificationBellIcon,
  SettingsIcon,
  SunIcons,
  TeamsIcon,
} from "@/assets/images/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logOutUser } from "@/service";

const Sidebar = () => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const menuItems = [
    { href: "/", icon: <HomeIcon />, label: "Home" },
    { href: "/boarddfsfs", icon: <BoardsIcon />, label: "Boards" },
    { href: "/settisdsdfngs", icon: <SettingsIcon />, label: "Settings" },
    { href: "/tsdfdsfdsams", icon: <TeamsIcon />, label: "Teams" },
    { href: "/anasdfdslytics", icon: <AnalyticsIcon />, label: "Analytics" },
  ];

  const linkClasses = (isActive: boolean) =>
    cn(
      "flex items-center gap-[14px] text-xl font-normal text-[#797979] p-2 rounded-[4px]",
      {
        "border border-[#DDDDDD] bg-[#F4F4F4]": isActive,
      }
    );

  const handleLOgOutClick = async () => {

    console.log('check')
    try {
      const response = await logOutUser();

      console.log(response)
      if (response.success === true) {

        router.push("/login");
      }
    } catch (error) {
      console.error("Error while logging out", error);
    }
  };

  return (
    <div className="w-64 pt-6 px-4 bg-[#FFFFFF] border-r border-[#DEDEDE] h-screen fixed top-0 left-0">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="aspect-square max-w-[31px] w-full rounded-[8px] overflow-hidden">
            <Image
              src={ProfileImg}
              alt="Profile Image"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-medium">Joe Gardner</h3>
        </div>
        <div className="flex items-center gap-5">
          <span className="size-6">
            <NotificationBellIcon />
          </span>
          <span className="size-6">
            <SunIcons />
          </span>

          <Button
            className="pt-[10px] px-2 bg-[#F4F4F4] text-base font-normal text-[#797979] rounded-[4px] ml-auto hover:text-white"
            onClick={handleLOgOutClick}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="my-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClasses(pathname === item.href)}
            >
              <span className="size-6">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </ul>
      </div>

      <div>
        <Button
          className="py-[14px] px-4 text-xl font-medium text-white bg-[linear-gradient(180deg,#4C38C2_0%,#2F2188_100%)] border border-image[linear-gradient(360deg,#4B36CC_0%,#9C93D4_107.69%)] shadow-[0px_1px_8px_0px_#00000040,inset_0px_12px_16px_0px_#BABABA33] rounded-[8px]"
          onClick={() => setIsModalOpen(true)}
        >
          Create new task
          <span className="block size-6 ml-2">
            <CreateTaskIcon />
          </span>
        </Button>

        <AddTask isOpen={isModalOpen} onClose={closeModal} taskStatus="" />
      </div>
    </div>
  );
};

export default Sidebar;
