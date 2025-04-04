"use client";

import { selectCurrentUser, TUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import Image from "next/image";
import React from "react";
import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";
import { useSingleUserQuery } from "@/src/redux/features/user/userApi";

const Sidebar = () => {
  const loggedUser = useAppSelector(selectCurrentUser) as TUser;
  const { data: userInfo } = useSingleUserQuery(loggedUser?.email);
  const user = userInfo?.data[0];

  return (
    <div className="text-black">
      <div className="bg-blue-200 p-2">
        <div className="h-[330px] w-full rounded-md">
          <Image
            alt="profile"
            className="w-full h-full object-cover rounded-md"
            height={330}
            src={
              user?.profileImg ||
              "https://i.pravatar.cc/150?u=a04258114e29026702d"
            }
            width={330}
          />
        </div>
        <div className="my-3 text-center ">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
          <p className="break-words text-sm">{user?.role}</p>
        </div>
      </div>
      <div className="space-y-2 bg-blue-200 p-2 text-center">
        <SidebarOptions
          links={user?.role === "admin" ? adminLinks : userLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
