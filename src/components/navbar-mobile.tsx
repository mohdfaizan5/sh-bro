"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHome, FaRegNewspaper, FaUserCircle } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";

const MobileNavbar = ({ className }: { className?: string }) => {
  const path = usePathname();

  return (
    <nav
      className={cn(
        "flex fixed bg-background py-2 h-16 bottom-0 left-0 w-full justify-evenly sm:hidden rounded-t-md border-t",
        className
      )}
    >
      <Link
        href={"/"}
        className={cn(
          "flex  flex-col gap-1 items-center justify-center text-sm",
          path === "/" && "text-muted-foreground scale-105"
        )}
      >
        <FaHome size={20} /> Home
      </Link>
      <Link
        href={"/daily-update"}
        className={cn(
          "flex  flex-col flex-wrap text-balance gap-1 items-center justify-center text-sm",
          path === "/daily-update" && "text-primary scale-105"
        )}
      >
        <FaRegNewspaper size={20} /> Daily Update
      </Link>

      {/* <Link
        href={"/companies"}
        className={cn(
          "flex  flex-col gap-1 items-center justify-center text-sm bg-primary size-14 rounded-full -translate-y-4",
          path === "/companies" && "text-primary scale-105"
        )}
      >
        <IoSearchSharp size={20} className="text-white" />
        PI
      </Link> */}
      <Link
        href={"/challenges"}
        className={cn(
          "flex  flex-col gap-1 items-center justify-center text-sm",
          path === "/challenges" && "text-primary scale-105"
        )}
      >
        <TbUsersGroup size={20} /> Challenges
      </Link>
      {/* <Link
        href={"/profile"}
        className={cn(
          "flex  flex-col gap-1 items-center justify-center text-sm",
          path === "/profile" && "text-primary scale-105"
        )}
      >
        <FaUserCircle size={20} /> Profile
      </Link> */}
    </nav>
  );
};

export default MobileNavbar;
