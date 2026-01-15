"use client";

import Image from "next/image";
import InfoSection from "./InfoSection";

export default function History() {
  return (
    <InfoSection
      id="history"
      title="Nossa História"
      subtitle="A Origem"
      align="left"
      visual={
        <div className="aspect-video relative overflow-hidden group rounded-lg border border-magma/50">
           <Image 
             src="/history_ruins.png" 
             alt="Ruínas Antigas" 
             fill
             className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        </div>
      }
    >
      <p>
        Nascida das cinzas de antigos impérios, a <strong className="text-fire-orange">PHOENIX</strong> surgiu não apenas como uma guilda, mas como um movimento. Em 2023, um grupo de elite decidiu desbravar novos horizontes.
      </p>  
      <p>
        Buscávamos mais do que loot ou território. Buscávamos a glória eterna. Através de batalhas sangrentas e alianças estratégicas, forjamos nosso nome no ferro e no fogo.
      </p>
      <p>
        Hoje, somos uma lenda viva. Um farol para aqueles que buscam a excelência e a irmandade verdadeira.
      </p>
    </InfoSection>
  );
}
