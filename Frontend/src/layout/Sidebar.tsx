import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconSearch,
} from "@tabler/icons-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BlitzLogo from "../assets/BlitzTV.jpg";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import axios from "axios";
import { BASE_URL } from "@/env";
import { useAuthStore } from "@/auth/Auth.interface";
import { userDataState } from "./layout.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropDown from "./DropDown";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onclick: () => console.log("Logout"),
    },
  ];

  const [open, setOpen] = useState(false);

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            {open ? (
              <div className="mt-4 flex flex-col justify-center  items-center px-2">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleChange}
                  onSubmit={onSubmit}
                />
              </div>
            ) : (
              <div className="mt-4 flex flex-col justify-center  items-start">
                <IconSearch className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
              </div>
            )}
            <div className="mt-2 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Dev Anand",
                href: "#",
                icon: (
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4D03AQGEA4M26ub0sA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714142613330?e=1740009600&v=beta&t=8Ab-gqJZCTuG_-HzSRuv1uPR-Nz2SKPQxKCWknFtzrs"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to={"/"}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <img
        src={BlitzLogo}
        className="h-5 w-6 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        BlitzTV
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to={"/"}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src={BlitzLogo}
        className="h-5 w-6 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
      />
    </Link>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  let refreshToken = localStorage.getItem("@token");
  let avatar = userDataState((state) => state?.avatar)

  let addAccessToken = useAuthStore((state) => state?.addAccessToken);
  let addAvatar = userDataState((state) => state?.addAvatar);
  let addCoverImage = userDataState((state) => state?.addCoverImage);
  let addEmail = userDataState((state) => state?.addEmail);
  let addFullName = userDataState((state) => state?.addFullName);
  let addUserName = userDataState((state) => state?.addUserName);
  let addId = userDataState((state) => state?.addId);

  useEffect(() => {
    (async () => {
      const body = {
        refreshToken: refreshToken,
      };

      try {
        const res = await axios.post(`${BASE_URL}users/refresh-token`, body);
        if (res.data.success == true) {
          addAccessToken(res?.data?.data?.accessToken);
          getUserDetails(res?.data?.data?.accessToken);
        } else {
          localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.log("Refresh Token : ", error);
        localStorage.clear();
        navigate("/login");
      }
    })();
  }, []);

  const getUserDetails = async (accessToken: string) => {
    try {
      const response = await axios.get(`${BASE_URL}users/current-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success === true) {
        addAvatar(response?.data?.data?.avatar);
        addCoverImage(response?.data?.data?.coverImage);
        addEmail(response?.data?.data?.email);
        addFullName(response?.data?.data?.fullName);
        addUserName(response?.data?.data?.username);
        addId(response?.data?.data?._id);
      }
    } catch (error) {
      console.log("Get User : ", error);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full overflow-y-auto">
        <div className="mx-2 my-2 flex flex-row justify-end gap-3">
          <div>
            <DropDown />
          </div>
          <div>
            <Avatar className="w-9 h-9">
              <AvatarImage src={avatar}  />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
