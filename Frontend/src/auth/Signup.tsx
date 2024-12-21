import { GalleryVerticalEnd } from "lucide-react";
import blitzLogo from "../assets/BlitzTV.png";
import { SignupForm } from "@/components/signup-form";

function Signup() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            BlitzTV.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block bg-primary">
        <img
          src={blitzLogo}
          alt="Image"
          className="absolute dark:brightness-[0.2] dark:grayscale h-[40%] w-[50%] object-cover inset-1/4"
        />
      </div>
    </div>
  );
}

export default Signup;
