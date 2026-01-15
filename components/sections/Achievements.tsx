"use client";

import Image from "next/image";
import InfoSection from "./InfoSection";
import { Trophy, Crown, Swords, Target } from "lucide-react";

export default function Achievements() {
  return (
    <InfoSection
      id="achievements"
      title="Nossas Proezas"
      subtitle="Conquistas Lendárias"
      align="right"
      visual={
        <div className="aspect-video relative overflow-hidden group rounded-lg border border-magma/50">
          {/* Background Image */}
          <Image 
            src="/achievements_trophy.png" 
            alt="Tesouro Lendário" 
            fill
            className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent" />
          
          {/* Stats Grid Overlay */}
          <div className="relative z-10 h-full flex items-end p-4 sm:p-6 pb-6">
            {/* Mobile: Horizontal Scroll | Tablet+: Grid */}
            <div className="w-full overflow-x-auto sm:overflow-visible pb-2">
              <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 min-w-max sm:min-w-0 sm:w-full">
                {[
                  { icon: Trophy, label: "Onde Começamos", value: "S18+" },
                  { icon: Crown, label: "Dominância Territorial", value: "90%" },
                  { icon: Swords, label: "Guerras Vencidas", value: "600+" },
                  { icon: Target, label: "Bosses Mortos", value: "10K+" },
                ].map((item, i) => (
                  <div key={i} className="bg-void/90 backdrop-blur-sm border border-gold/20 p-3 rounded flex flex-col items-center justify-center gap-1 hover:border-fire-orange hover:bg-void transition-all group/card min-w-[140px] sm:min-w-0">
                    <item.icon className="w-6 h-6 text-gold group-hover/card:text-fire-orange transition-colors" />
                    <span className="font-display text-xl font-bold text-white">{item.value}</span>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-white/50 text-center leading-tight whitespace-nowrap">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <p>
        Nossa sala de troféus não é apenas decoração. É a prova de nossa dedicação inabalável.
      </p>
      <ul className="space-y-4 mt-4">
        <li className="flex items-start gap-3">
          <span className="text-fire-orange mt-1">✦</span>
          <span>Conquistamos o servidor <strong className="text-gold">RealMU</strong> por anos.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-fire-orange mt-1">✦</span>
          <span>Vencedores de todos os <strong className="text-gold">Speed Servers</strong> por 2 anos consecutivos.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-fire-orange mt-1">✦</span>
          <span>Reconhecidos pela comunidade como a guilda mais organizada e letal.</span>
        </li>
      </ul>
    </InfoSection>
  );
}
