"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

const NavbarComponent = () => {
  const pathName = usePathname();

  return (
    <AnimatePresence>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed top-0 left-0 z-10 flex items-start justify-center w-full h-20"
      >
        <div className="container max-w-5xl flex items-center justify-start h-full p-2 gap-4 border-r border-l border-dashed bg-[#fcfcfb80] backdrop-blur-sm px-5 lg:px-10">
          <Link href="/" rel="noopener noreferrer">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/assets/logos/logo-ns.svg"
                alt="@nicoshconfeld_"
                width={100}
                height={100}
              />
              <AvatarFallback>NS</AvatarFallback>
            </Avatar>
          </Link>

          <nav className="flex items-center justify-center gap-2 text-sm">
            <Link
              href="/"
              rel="noopener noreferrer"
              className={`transition-colors ${
                pathName === "/"
                  ? "text-gray-800 font-medium"
                  : "text-gray-500 hover:text-gray-800 focus:text-gray-800"
              }`}
            >
              About
            </Link>
            <Link
              href="/blog"
              rel="noopener noreferrer"
              className={`transition-colors ${
                pathName === "/blog"
                  ? "text-gray-800 font-medium"
                  : "text-gray-500 hover:text-gray-800 focus:text-gray-800"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              rel="noopener noreferrer"
              className={`transition-colors ${
                pathName === "/contact"
                  ? "text-gray-800 font-medium"
                  : "text-gray-500 hover:text-gray-800 focus:text-gray-800"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default NavbarComponent;
