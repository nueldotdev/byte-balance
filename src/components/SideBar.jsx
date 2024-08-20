import React from "react";
import { Stack } from "@mantine/core";
import { GoHomeFill } from "react-icons/go";
import { BiSolidUser } from "react-icons/bi";
import { RiSettingsFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo/Logo";

const menuItems = [
  { label: "Home", icon: GoHomeFill, path: "/dashboard/home" },
  { label: "Profile", icon: BiSolidUser, path: "/dashboard/profile" },
  { label: "Settings", icon: RiSettingsFill, path: "/dashboard/settings" },
];


const SideBar = () => {
  const location = useLocation();

  return (
    <>
      <Stack className="bg-secondary h-full">
        <div className="flex items-center justify-between m-4">
          <Logo className="text-tertiary" />
        </div>
        <Stack gap={1}>
          <div>
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `option ${
                    isActive ? "active-opt" : ""
                  }`
                }
              >
                <item.icon size={18} className="mx-2" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default SideBar;