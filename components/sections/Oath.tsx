"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import InfoSection from "./InfoSection";

export default function Oath() {
  const blockquoteRef = useRef<HTMLQuoteElement>(null);
  const isAnimating = useRef(false); // Controla se a animação está rodando
  
  // Texto original do juramento
  const originalText = `"Na escuridão, somos a chama.
Na batalha, somos a espada.
Na vitória, somos um só."`;

  /**
   * Aplica o efeito glitch ao elemento HTML fornecido.
   * @param {HTMLElement} el
   */
  const glitch = useCallback((el: HTMLElement) => {
    // Se já está animando, não faz nada
    if (isAnimating.current) return;
    
    // Marca como animando
    isAnimating.current = true;
    
    // Nomes dos membros da guild para o efeito glitch
    const guildMembers = [
      'Hyabak', 'Morcegao', 'Luminha', 'Pizzol', 'SAFADA1', 'HENIKA',
      'Mahzao', 'Bkzaooo', 'Pelesz', 'RedFox', 'Kalybu', 'Hurana',
      'Bubsy', 'IRONIC', 'LZKING', 'Robacena', 'Tiik', 'Dami',
      '0xLuan', 'ADDICTED', 'Pepo', 'Marcilli', 'Zine', 'Burroso',
      'KissMe', 'HolyWitch', 'Insidious', 'SerafimSUM', 'Dunne',
      'OMagico', 'Pir4', 'Diguin', 'KilluaHxH', 'DrKz', 'Choco',
      '4rlequina', 'Patriota', 'DeepRF', 'ElonMusk', 'F0rget', 'HolyWitch',
      'Chapis', 'OnlyHiT', 'LeiDL', 'Brutus', 'K3NNDY', 'Doce',
      'G4mbyra', 'Wisee', 'Kenshim', 'DzseT', 'Godfather', 'Darklau',
      'SirHellsz'
    ];
    
    // Separa o texto em linhas e palavras
    const text = originalText;
    const lines = text.split('\n');
    
    // Estrutura para armazenar palavras originais e nicks aleatórios
    const wordData: Array<{original: string, randomName: string}> = [];
    
    lines.forEach(line => {
      const words = line.split(' ');
      words.forEach(word => {
        wordData.push({
          original: word,
          randomName: guildMembers[Math.floor(Math.random() * guildMembers.length)]
        });
      });
    });
    
    let iterations = 0;
    const totalWords = wordData.length;
    const minIterations = 3; // Número de frames antes de começar a revelar

    const interval = setInterval(() => {
      let wordIndex = 0;
      
      const glitchedLines = lines.map(line => {
        const words = line.split(' ');
        
        return words.map(() => {
          const data = wordData[wordIndex];
          wordIndex++;
          
          // Efeito de onda: revela palavra por palavra
          if (iterations > wordIndex + minIterations || wordIndex > iterations + minIterations) {
            return data.original; // Mostra a palavra original
          } else {
            return data.randomName; // Mostra o nick aleatório
          }
        }).join(' ');
      });
      
      el.innerHTML = glitchedLines.join('<br/>');

      iterations++;
      
      // Para quando todas as palavras forem reveladas
      if (iterations >= totalWords + minIterations + 5) {
        clearInterval(interval);
        el.innerHTML = originalText.replace(/\n/g, '<br/>');
        // Libera para a próxima animação
        isAnimating.current = false;
      }
    }, 200); // Velocidade da animação
  }, [originalText]);

  // Handler para o evento de mouse hover
  const handleMouseOver = () => {
    if (blockquoteRef.current) {
      glitch(blockquoteRef.current);
    }
  };
  
  return (
    <InfoSection
      id="oath"
      title="O Juramento"
      subtitle="Código de Honra"
      align="left"
      visual={
        <div className="relative aspect-square md:aspect-video flex items-center justify-center p-8 rounded-lg overflow-hidden group">
           {/* Background Image */}
           <Image 
             src="/oath_sword.png" 
             alt="Espada Mística" 
             fill
             className="object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-700" 
           />
           
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-br from-void/80 via-magma/40 to-fire-orange/30" />
           
           {/* Decorative Runes */}
           <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-magma/50 rounded-tl-lg animate-pulse" />
           <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-magma/50 rounded-br-lg animate-pulse" />
           
           {/* Quote Block with Fire Effect */}
           <div className="relative z-10 p-4 sm:p-6 md:p-8 border-y-2 border-magma/50 bg-void/70 backdrop-blur-sm rounded-lg transition-all duration-700 group-hover:border-fire-orange/60">
             <blockquote 
               ref={blockquoteRef}
               onMouseOver={handleMouseOver}
               className="font-decorative text-lg sm:text-xl md:text-2xl lg:text-3xl text-center italic text-gold leading-tight sm:leading-relaxed drop-shadow-lg transition-all duration-700 group-hover:text-fire-orange group-hover:[text-shadow:0_0_10px_rgba(255,69,0,0.8),0_0_20px_rgba(255,69,0,0.6),0_0_30px_rgba(255,69,0,0.4)] cursor-pointer"
             >
               &quot;Na escuridão, somos a chama.<br/>
               Na batalha, somos a espada.<br/>
               Na vitória, somos um só.&quot;
             </blockquote>
           </div>
        </div>
      }
    >
      <p>
        Ser um PHOENIX não é apenas usar uma tag. É viver por um código.
      </p>
      <div className="space-y-8 mt-8">
        <div>
          <h3 className="text-gold font-bold font-display text-2xl mb-2">Lealdade</h3>
          <p className="text-lg text-white/90 leading-relaxed">Nunca abandonamos um irmão em batalha. A guilda vem antes do indivíduo, sempre.</p>
        </div>
        <div>
          <h3 className="text-gold font-bold font-display text-2xl mb-2">Excelência</h3>
          <p className="text-lg text-white/90 leading-relaxed">Buscamos a perfeição em cada movimento, cada combo, cada estratégia. O bom é inimigo do ótimo.</p>
        </div>
        <div>
          <h3 className="text-gold font-bold font-display text-2xl mb-2">Respeito</h3>
          <p className="text-lg text-white/90 leading-relaxed">Vencemos com honra. Derrotamos nossos inimigos, mas respeitamos a batalha e o oponente digno.</p>
        </div>
      </div>
    </InfoSection>
  );
}
