"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps & React.ComponentProps<typeof motion.button>) {
  const variants = {
    primary: "bg-gradient-to-b from-magma to-void border border-fire-orange text-gold hover:text-white hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] hover:border-gold",
    secondary: "bg-void-light text-white border border-magma hover:border-fire-orange hover:text-fire-orange",
    outline: "bg-transparent text-white border border-white/20 hover:border-fire-orange hover:text-fire-orange",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={clsx(
        "relative px-8 py-4 font-display font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden group cursor-pointer text-center",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Fire Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-fire-orange/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-fire-orange shadow-[0_0_20px_#FF4500] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}
