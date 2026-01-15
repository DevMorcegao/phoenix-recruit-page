"use client";

import Link from "next/link";
import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-magma overflow-hidden snap-start">
      {/* Marquee */}
      <div className="absolute top-0 left-0 w-full overflow-hidden py-4 bg-fire-orange/5 border-b border-fire-orange/10">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 font-display text-sm uppercase tracking-[0.3em] text-fire-orange/50">
              Phoenix Guild • Forje seu Legado • Elite MMORPG •
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="group flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-gradient-to-br from-fire-orange to-magma rounded-full flex items-center justify-center text-void group-hover:animate-burn">
                <Flame size={18} strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold tracking-widest text-white">
                PHOENIX
              </span>
            </Link>
            <p className="font-sans text-white/50 max-w-sm">
              Uma comunidade forjada no fogo da batalha. Unimos jogadores de elite em busca da glória eterna nos mundos virtuais.
            </p>
          </div>

          <div>
            <h4 className="font-display text-gold font-bold mb-6">Navegação</h4>
            <ul className="space-y-4 font-sans text-sm text-white/50">
              <li><Link href="#history" className="hover:text-fire-orange transition-colors">Nossa História</Link></li>
              <li><Link href="#achievements" className="hover:text-fire-orange transition-colors">Proezas</Link></li>
              <li><Link href="#oath" className="hover:text-fire-orange transition-colors">O Juramento</Link></li>
              <li><Link href="#join" className="hover:text-fire-orange transition-colors">Alistar-se</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            © 2025 PHOENIX Guild. Todos os direitos reservados.
          </p>
          <p className="font-sans text-xs text-white/30">
            Design by Morcegao
          </p> 
        </div>
      </div>
    </footer>
  );
}
