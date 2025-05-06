/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Sidebar from "@/src/components/sidebar/Sidebar";
import { setUser, TUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { verifyToken } from "@/src/utils/verifyToken";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user) as TUser;
  const token = Cookies.get("accessToken");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      Cookies.set("redirect", "/admin");
      router.push("/login");

      return;
    }

    if (!user) {
      try {
        const verifiedUser = verifyToken(token) as TUser;

        if (verifiedUser?.role !== "admin") {
          router.push("/");

          return;
        }
        dispatch(setUser({ user: verifiedUser, token }));
        setIsAuthorized(true);
      } catch (err: any) {
        Cookies.remove("accessToken");
        router.push("/login");
      }
    } else {
      if (user.role !== "admin") {
        router.push("/");
      } else {
        setIsAuthorized(true);
      }
    }

    setLoading(false);
  }, [token, user, dispatch, router]);

  if (loading || !isAuthorized) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-4 h-[67vh]">{children}</div>
    </div>
  );
};

export default adminLayout;
