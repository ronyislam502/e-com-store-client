"use client";

import EForm from "@/src/components/form/EForm";
import EInput from "@/src/components/form/EInput";
import { useSigninMutation } from "@/src/redux/features/auth/authApi";
import { setUser, TUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { TError } from "@/src/types";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { verifyToken } from "@/src/utils/verifyToken";
import loginValidationSchema from "@/src/schemas/loginValidationSchema";

const Login = () => {
  const [signin] = useSigninMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Login loading....");

    try {
      const userData = {
        email: data?.email,
        password: data?.password,
      };

      const res = await signin(userData).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res?.data?.accessToken }));

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 2000 });
        router.push("/");
      }
    } catch (error) {
      const err = error as TError;

      toast.error(err?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold">Login with FoundX</h3>
      <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
      <div className="w-[35%]">
        <EForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <EInput label="Email" name="email" type="email" />
          </div>
          <div className="py-3">
            <EInput label="Password" name="password" type="password" />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Login
          </Button>
        </EForm>
        <div className="text-center">
          Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
