import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconSearch
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BlitzLogo from "../assets/BlitzTV.jpg";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";

export function SidebarDemo() {

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
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

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};
