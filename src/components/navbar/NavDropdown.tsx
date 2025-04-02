"use client";

import { TUser } from "@/src/redux/features/auth/authSlice";
import { useSingleUserQuery } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import Link from "next/link";

const NavDropdown = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userInfo } = useSingleUserQuery(loggedUser?.email);
  const user = userInfo?.data[0];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer"
          name="profileImg"
          src={user?.profileImg || ""}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="dashboard">
          <Link href={`/${user?.role}`}>Dashboard</Link>
        </DropdownItem>
        <DropdownItem key="delete">
          <Button size="sm">Logout</Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavDropdown;
