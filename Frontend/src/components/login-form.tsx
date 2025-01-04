<<<<<<< HEAD
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
=======
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
<<<<<<< HEAD
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

=======
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
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
<<<<<<< HEAD
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
=======
          <Label htmlFor="email" className="text-left">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
<<<<<<< HEAD
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
=======
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
}
