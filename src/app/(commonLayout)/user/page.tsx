"use client";

import { TUser } from "@/src/redux/features/auth/authSlice";
import { useSingleUserQuery } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";

const User = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userInfo } = useSingleUserQuery(loggedUser?.email);
  const user = userInfo?.data[0];

  return (
    <div>
      <h2>{user?.name}</h2>
    </div>
  );
};

export default User;
