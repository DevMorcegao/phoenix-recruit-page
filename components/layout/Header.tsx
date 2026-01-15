"use client";

import { Flame, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";

const navItems = [
  { name: "História", id: "history" },
  { name: "Proezas", id: "achievements" },
  { name: "Juramento", id: "oath" },
  { name: "Alistar-se", id: "join" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12",
          scrolled ? "bg-void/80 backdrop-blur-md border-b border-glass-border" : "bg-transparent"
        )}
      >
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-fire-orange to-magma rounded-full flex items-center justify-center text-void group-hover:animate-burn">
            <Flame size={18} strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-bold tracking-widest text-white group-hover:text-fire-orange transition-colors">
            PHOENIX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={`#${item.id}`}
              className="font-sans text-sm font-medium uppercase tracking-widest text-white/70 hover:text-fire-orange transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-fire-orange transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          aria-label="Open menu"
        >
          <div className="h-0.5 w-8 bg-white transition-all" />
          <div className="h-0.5 w-6 bg-white ml-auto transition-all" />
        </button>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-void border-l border-magma z-50 md:hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white hover:text-fire-orange transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2 px-6 pt-8 pb-12 border-b border-magma/50">
                <div className="h-8 w-8 bg-gradient-to-br from-fire-orange to-magma rounded-full flex items-center justify-center text-void">
                  <Flame size={20} strokeWidth={2.5} />
                </div>
                <span className="font-display text-xl font-bold tracking-widest text-white">
                  PHOENIX
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col px-6 py-8 gap-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.id)}
                    className="font-sans text-lg font-medium uppercase tracking-widest text-white/70 hover:text-fire-orange transition-colors text-left relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-fire-orange transition-all duration-300 group-hover:w-full" />
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
