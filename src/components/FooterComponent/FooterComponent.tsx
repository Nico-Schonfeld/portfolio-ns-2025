"use client";

import React from "react";
import { Link } from "next-view-transitions";
import { motion } from "framer-motion";

const FooterComponent = () => {
  return (
    <footer className="w-full flex items-start justify-center h-auto bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="container max-w-5xl flex flex-col items-center justify-center h-full p-5 gap-10 border-r border-l border-dashed bg-[#fcfcfb]"
      >
        <Link
          href="https://www.linkedin.com/in/nicoschonfeld/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500"
        >
          © Portfolio {new Date().getFullYear()}{" "}
          <span className="hover:text-gray-800 transition-all">
            @nicoshconfeld
          </span>
        </Link>
      </motion.div>
    </footer>
  );
};

export default FooterComponent;
