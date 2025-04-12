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
        <div className=" h-auto w-full rounded-md">
          <Image
            alt="profile"
            className="w-full h-auto object-cover rounded-md"
            height={330}
            src={
              user?.profileImg ||
              "https://i.postimg.cc/wvz0bsz5/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            width={330}
          />
        </div>
        <div className="text-center mt-6">
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
