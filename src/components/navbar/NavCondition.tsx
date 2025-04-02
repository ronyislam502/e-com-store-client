"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { TUser } from "@/src/types/user";
import NavDropdown from "./NavDropdown";

const NavCondition = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;

  return (
    <>
      {user ? (
        <NavDropdown />
      ) : (
        <Button className="w-[20%]" color="primary" size="md">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </>
  );
};

export default NavCondition;
