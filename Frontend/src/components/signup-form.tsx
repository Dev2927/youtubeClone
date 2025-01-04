import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  initialSignupBody,
  initialSignupErrorBody,
  SignupBody,
  SignupErrorBody,
} from "@/auth/Auth.interface";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/env";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();

  const [signupBody, setSignupBody] = useState<SignupBody>(initialSignupBody);

  const [errorBody, setErrorBody] = useState<SignupErrorBody>(
    initialSignupErrorBody
  );

  const [passwordRegexValidation, setPasswordRegexValidation] =
    useState<boolean>(false);
  const [emailRegexValidation, setEmailRegexValidation] =
    useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  // ---------------------- Handle Change Input -------------------------
  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.name === "avatar" || target.name === "coverImage") {
      const file = target.files?.[0];
      if (file) {
        setSignupBody((prev) => ({
          ...prev,
          [target.name]: file,
        }));
      }
    } else {
      setSignupBody((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }

    setErrorBody((prev) => ({ ...prev, [e.target.name]: false }));
    setEmailRegexValidation(false);
    setPasswordRegexValidation(false);
  };

  // ----------------------- Form Validation ----------------------------
  const formValidation = () => {
    let isValid = true;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    Object.entries(signupBody).forEach(([key, value]) => {
      if (!value) {
        setErrorBody((prev) => ({ ...prev, [key]: true }));
        isValid = false;
      }
    });

    if (!emailRegex.test(signupBody?.email)) {
      setEmailRegexValidation(true);
      isValid = false;
    }

    if (!passwordRegex.test(signupBody?.password)) {
      setPasswordRegexValidation(true);
      isValid = false;
    }

    return isValid;
  };

  // ------------------------Handle Submit --------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValidation()) return;

    const formData = new FormData();
    formData.append("fullName", signupBody.fullName);
    formData.append("username", signupBody.username);
    formData.append("email", signupBody.email);
    formData.append("password", signupBody.password);

    if (signupBody.avatar) formData.append("avatar", signupBody.avatar);
    if (signupBody.coverImage)
      formData.append("coverImage", signupBody.coverImage);

    console.log('Sign Up Body : ', signupBody)

    setButtonLoader(true);
    try {
      const response = await axios.post(`${BASE_URL}users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success == true) {
        toast("Account has created! Please login", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        setButtonLoader(false);
        navigate("/login");
      } else {
        setButtonLoader(false);
        toast("User has not been created! Try again later", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
    } catch (error: any) {
      setButtonLoader(false);
      console.error("Signup Error:", error);
      let message = error?.response?.data?.message;
      console.log(message);
      toast(message, {
        action: {
          label: "Undo",
          onClick: () => console.log("UNDO"),
        },
      });
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Signup to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label
            htmlFor="email"
            className={`text-left ${errorBody.fullName && "text-red-500"}`}
          >
            Full Name
          </Label>
          <Input
            id="fullname"
            type="text"
            placeholder="Dev anand"
            name="fullName"
            value={signupBody.fullName}
            onChange={handleValueChange}
          />
          {errorBody.fullName && (
            <p className="text-left text-sm text-red-500">
              Fullname is required
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="email"
            className={`text-left ${errorBody.username && "text-red-500"}`}
          >
            User Name
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="_devanand_29"
            required
            name="username"
            value={signupBody.username}
            onChange={handleValueChange}
          />
          {errorBody.username && (
            <p className="text-left text-sm text-red-500">
              Username is required
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="email"
            className={`text-left ${
              (errorBody.email || emailRegexValidation) && "text-red-500"
            }`}
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
            value={signupBody.email}
            onChange={handleValueChange}
            required
          />
          {errorBody.email && (
            <p className="text-left text-sm text-red-500">Email is required</p>
          )}
          {emailRegexValidation && !errorBody.email && (
            <p className="text-left text-sm text-red-500">Email is not valid</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="password"
            className={`text-left ${
              (errorBody.password || passwordRegexValidation) && "text-red-500"
            }`}
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="**********"
            name="password"
            value={signupBody.password}
            onChange={handleValueChange}
            required
          />
          {errorBody.password && (
            <p className="text-left text-sm text-red-500">
              Password is required
            </p>
          )}
          {passwordRegexValidation && !errorBody.password && (
            <p className="text-left text-sm text-red-500">
              Password should contain capital letter, Number, special characters
              and upto 8 characters long!
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="password"
            className={`text-left ${errorBody.avatar && "text-red-500"}`}
          >
            Avatar
          </Label>
          <Input
            id="avatar"
            type="file"
            name="avatar"
            onChange={handleValueChange}
            accept="image/*"
            required
          />
          {errorBody.avatar && (
            <p className="text-left text-sm text-red-500">Avatar is required</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="password"
            className={`text-left ${errorBody.coverImage && "text-red-500"}`}
          >
            Cover Image
          </Label>
          <Input
            id="coverImage"
            type="file"
            name="coverImage"
            onChange={handleValueChange}
            accept="image/*"
          />
          {errorBody.coverImage && (
            <p className="text-left text-sm text-red-500">
              Cover image is required
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" onClick={handleSubmit} disabled={buttonLoader}>
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
            "Signup"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="login" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
