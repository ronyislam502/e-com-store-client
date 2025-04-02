"use client";

import { TUser } from "@/src/redux/features/auth/authSlice";
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
  const user = useAppSelector((state) => state.auth.user) as TUser;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" name="profileImg" src={""} />
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
