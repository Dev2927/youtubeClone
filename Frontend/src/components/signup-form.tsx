import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
<<<<<<< HEAD
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
=======
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
<<<<<<< HEAD
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

=======
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
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
<<<<<<< HEAD
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
=======
          <Label htmlFor="email" className="text-left">
            Full Name
          </Label>
          <Input id="fullname" type="text" placeholder="Dev anand" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-left">
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
            User Name
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="_devanand_29"
            required
<<<<<<< HEAD
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
=======
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-left">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Signup
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
        </Button>
      </div>
      <div className="text-center text-sm">
        have an account?{" "}
>>>>>>> 6b32cb50d51753ce7e5cc17012000dd8ac306ed9
        <a href="login" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
