"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  // 🎨 Ajuste manual da opacidade da imagem do Phoenix (0 a 1)
  const phoenixImageOpacity = 0.65; // Valor padrão: 0.25 (mais escuro que antes)
  
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center overflow-hidden snap-start">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fire-orange/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Phoenix Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: phoenixImageOpacity, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-full h-full -z-10 mix-blend-screen"
      >
         <Image 
           src="/hero_phoenix.png" 
           alt="Phoenix" 
           fill
           className="object-cover" 
           priority
         />
      </motion.div>

      {/* Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-void/60 to-void z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-5xl"
      >
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gold via-fire-orange to-magma drop-shadow-[0_0_30px_rgba(255,69,0,0.5)]">
          FORJE SEU <br />
          <span className="text-stroke-1 text-transparent bg-clip-text bg-gradient-to-r from-gold to-fire-orange">
            LEGADO
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mt-8 max-w-2xl font-display text-lg md:text-xl text-gold/90 tracking-wide drop-shadow-md"
      >
        Junte-se à PHOENIX. Sua jornada para a imortalidade começa agora.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 mt-12 mb-20 md:mb-12 flex flex-col md:flex-row gap-6"
      >
        <Button onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}>
          Aplique Agora
        </Button>
        <Button variant="outline" onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}>
          Conheça Nossa História
        </Button>
      </motion.div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-4 z-10"
      >
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Scroll</span>
        <div className="h-16 w-[2px] bg-gradient-to-b from-fire-orange to-transparent" />
      </motion.div>
    </section>
  );
}
