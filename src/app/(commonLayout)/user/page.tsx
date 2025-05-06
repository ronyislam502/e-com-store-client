"use client";

import { TUser } from "@/src/redux/features/auth/authSlice";
import { useSingleUserQuery } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { formatDate } from "@/src/utils/Date";
import EditProfile from "./_component/EditProfile";

const User = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userInfo } = useSingleUserQuery(loggedUser?.email);
  const user = userInfo?.data[0];

  return (
    <div className="items-center text-center">
      <h2 className="text-4xl font-bold ">User Info</h2>
      <div className=" py-4">
        {" "}
        <EditProfile user={user} />
      </div>
      <div className="max-w-xl mx-auto bg-slate-100 p-5 shadow-lg rounded-md mt-5 text-black py-10">
        <div className="flex justify-between space-y-4">
          <div className="mt-4">
            <h3 className="text-xl font-bold">Name</h3>
            <p className="text-md font-semibold">{user?.name}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">E-mail</h3>
            <p className="text-md font-semibold">{user?.email}</p>
          </div>
        </div>
        <div className="flex justify-between space-y-4">
          <div className="mt-4">
            <h3 className="text-xl font-bold">Phone</h3>
            <p className="text-md font-semibold">{user?.phone}</p>
          </div>
          <div className="px-12">
            <h3 className="text-xl font-bold">Role</h3>
            <p className="text-md font-semibold">{user?.role}</p>
          </div>
        </div>
        <div className="flex justify-between space-y-4">
          <div className="">
            <h3 className="text-xl font-bold mt-4">Last Update</h3>
            <p className="text-md font-semibold">
              {formatDate(user?.updateAt)}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Since Member</h3>
            <p className="text-md font-semibold">
              {formatDate(user?.createdAt)}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Address</h3>
          <p className="text-md font-semibold">{user?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
