"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ReactNode } from "react";

interface InfoSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  align?: "left" | "right";
  visual?: ReactNode;
}

export default function InfoSection({
  id,
  title,
  subtitle,
  children,
  align = "left",
  visual,
}: InfoSectionProps) {
  return (
    <section id={id} className="relative py-32 overflow-hidden snap-start">
      <div className="container mx-auto px-6 md:px-12">
        <div className={clsx(
          "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center",
          align === "right" ? "direction-rtl" : ""
        )}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={clsx(
              "lg:col-span-6 flex flex-col gap-6",
              align === "right" ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div>
              {subtitle && (
                <span className="text-fire-orange font-sans uppercase tracking-widest text-sm font-bold mb-2 block">
                  {subtitle}
                </span>
              )}
              <h2 className="font-decorative text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-fire-orange to-transparent" />
            </div>
            
            <div className="font-sans text-lg text-white/70 leading-relaxed space-y-4">
              {children}
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={clsx(
              "lg:col-span-6 relative",
              align === "right" ? "lg:order-1" : "lg:order-2"
            )}
          >
            <div className="relative z-10 rounded-lg overflow-hidden border border-glass-border bg-void-light/50 backdrop-blur-sm p-1">
              {visual || (
                <div className="aspect-video bg-gradient-to-br from-void-light to-void w-full flex items-center justify-center">
                  <span className="text-white/20 font-display text-xl">Visual Placeholder</span>
                </div>
              )}
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-magma/20 rounded-full blur-[50px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-fire-orange/20 rounded-full blur-[50px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
