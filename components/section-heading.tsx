import React from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`text-3xl font-bold capitalize mb-10 text-center relative ${className}`}>
      <span className="relative inline-block">
        {children}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#016782] rounded-full" />
      </span>
    </h2>
  );
}