import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {
  initialLoginBody,
  initialLoginErrorBody,
  LoginBody,
  LoginErrorBody,
  useAuthStore,
} from "@/auth/Auth.interface";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { BASE_URL } from "@/env";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();

  const [sendLoginBody, setLoginBody] = useState<LoginBody>(initialLoginBody);
  const [loginError, setLoginError] = useState<LoginErrorBody>(
    initialLoginErrorBody
  );

  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginBody((prev) => ({
      ...prev,
      [name]: value,
    }));

    setLoginError((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const formValidation = () => {
    let isValid = true;

    Object.entries(sendLoginBody).forEach(([key, value]) => {
      if (!value) {
        setLoginError((prev) => ({
          ...prev,
          [key]: true,
        }));
        isValid = false;
      }
    });

    return isValid;
  };

  let addRefreshToken = useAuthStore((state) => state.addRefreshToken);
  let addAccessToken = useAuthStore((state) => state.addAccessToken);

  const submitLoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValidation()) return;

    setButtonLoader(true);
    try {
      const response = await axios.post(
        `${BASE_URL}users/login`,
        sendLoginBody
      );
      console.log("login : ", response.data.data);
      if (response.data.success == true) {
        toast("You are successfully login!", {
          action: {
            label: "Undo",
            onClick: () => console.log("UNDO"),
          },
        });
        setButtonLoader(false);
        addAccessToken(response?.data?.data?.accessToken);
        addRefreshToken(response?.data?.data?.refreshToken)
        localStorage.setItem("@token", response?.data?.data?.refreshToken)
        navigate("/Dashboard");
      } else {
        toast("Unable to login into your account!", {
          action: {
            label: "Undo",
            onClick: () => console.log("UNDO"),
          },
        });
      }
      setButtonLoader(false);
    } catch (error: any) {
      console.log("Login : ", error);
      let errorMessage = error?.response?.data?.message;
      errorMessage != "" &&
        toast(errorMessage, {
          action: {
            label: "Undo",
            onClick: () => console.log("UNDO"),
          },
        });
      setButtonLoader(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label
            htmlFor="email"
            className={`text-left ${loginError.email && "text-red-500"}`}
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
            value={sendLoginBody.email}
            onChange={handleValueChange}
          />
          {loginError.email && (
            <p className="text-left text-sm text-red-500">Email is required</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label
              htmlFor="password"
              className={`text-left ${loginError.password && "text-red-500"}`}
            >
              Password
            </Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="*********"
            name="password"
            value={sendLoginBody.password}
            onChange={handleValueChange}
          />
          {loginError.password && (
            <p className="text-left text-sm text-red-500">
              Password is required
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" onClick={submitLoginHandler}>
          {buttonLoader ? (
            <RotatingLines
              visible={true}
              width="100"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              strokeColor="white"
            />
          ) : (
            "Login"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
