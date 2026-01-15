"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import { canSubmitForm, recordSubmission } from "@/lib/rateLimiter";

type FormData = {
  charName: string;
  experience: "yes" | "no";
  motivation: string;
  discordUser: string;
  accept: boolean;
};

export default function RebirthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // Check rate limiting before submission
      const rateLimitCheck = canSubmitForm();
      
      if (!rateLimitCheck.canSubmit) {
        toast.error(rateLimitCheck.message || 'Você atingiu o limite de envios.');
        return;
      }

      // Send form data to API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle error responses
        toast.error(result.error || 'Erro ao enviar formulário. Tente novamente.');
        return;
      }

      // Success! Record the submission and show success message
      recordSubmission();
      toast.success(result.message || 'Grito de Guerra enviado com sucesso! A PHOENIX entrará em contato.');
      
      // Reset form fields
      reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Erro inesperado. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <section id="join" className="relative py-32 px-6 md:px-12 overflow-hidden snap-start">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-decorative text-4xl md:text-6xl font-black text-white mb-4">
            O RENASCIMENTO DE UMA <span className="text-fire-orange">LENDA</span>
          </h2>
          <p className="font-sans text-lg text-gold/70 mt-12">
            Preencha o formulário abaixo e prove seu valor.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-void-light/80 backdrop-blur-md border border-magma p-8 md:p-12 rounded-2xl space-y-8 relative overflow-hidden shadow-[0_0_50px_rgba(139,0,0,0.2)]"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-magma via-fire-orange to-magma" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="font-display text-sm uppercase tracking-widest text-gold/80">
                Nome do Personagem
              </label>
              <input
                {...register("charName", { required: "Nome é obrigatório" })}
                className="w-full bg-void border border-magma rounded p-4 text-white focus:border-fire-orange focus:outline-none transition-colors placeholder:text-white/20"
                placeholder="Ex: H3NIK4"
              />
              {errors.charName && (
                <span className="text-red-500 text-xs">{errors.charName.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-display text-sm uppercase tracking-widest text-gold/80">
                Usuário do Discord
              </label>
              <input
                {...register("discordUser", { required: "Discord é obrigatório" })}
                className="w-full bg-void border border-magma rounded p-4 text-white focus:border-fire-orange focus:outline-none transition-colors placeholder:text-white/20"
                placeholder="Ex: user#1234"
              />
              {errors.discordUser && (
                <span className="text-red-500 text-xs">{errors.discordUser.message}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-display text-sm uppercase tracking-widest text-gold/80">
              Possui experiência na Season 20+?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    value="yes"
                    {...register("experience", { required: "Selecione uma opção" })}
                    className="peer sr-only"
                  />
                  <div className="w-6 h-6 border-2 border-magma rounded-full peer-checked:border-fire-orange peer-checked:bg-fire-orange/40 flex items-center justify-center transition-all"></div>
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gold opacity-0 peer-checked:opacity-100 transition-all duration-300 transform scale-0 peer-checked:scale-100 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                  </svg>
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors">Sim, sou veterano</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    value="no"
                    {...register("experience", { required: "Selecione uma opção" })}
                    className="peer sr-only"
                  />
                  <div className="w-6 h-6 border-2 border-magma rounded-full peer-checked:border-fire-orange peer-checked:bg-fire-orange/40 flex items-center justify-center transition-all"></div>
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gold opacity-0 peer-checked:opacity-100 transition-all duration-300 transform scale-0 peer-checked:scale-100 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                  </svg>
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors">Não, busco glória</span>
              </label>
            </div>
            {errors.experience && (
              <span className="text-red-500 text-xs">{errors.experience.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-display text-sm uppercase tracking-widest text-gold/80">
              Por que você deseja forjar seu destino com a PHOENIX?
            </label>
            <textarea
              {...register("motivation", { required: "Motivação é obrigatória" })}
              rows={4}
              className="w-full bg-void border border-magma rounded p-4 text-white focus:border-fire-orange focus:outline-none transition-colors placeholder:text-white/20 resize-none"
              placeholder="Conte-nos sua história..."
            />
            {errors.motivation && (
              <span className="text-red-500 text-xs">{errors.motivation.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  {...register("accept", { required: "Você deve aceitar para continuar" })}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-magma rounded peer-checked:border-fire-orange peer-checked:bg-fire-orange/40 flex items-center justify-center transition-all shrink-0"></div>
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gold opacity-0 peer-checked:opacity-100 transition-all duration-300 transform scale-0 peer-checked:scale-100 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                </svg>
              </div>
              <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">
                Aceito ser contatado via Discord para dar continuidade à minha aplicação. Entendo que a PHOENIX exige lealdade absoluta.
              </span>
            </label>
            {errors.accept && (
              <span className="text-red-500 text-xs block">{errors.accept.message}</span>
            )}
          </div>

          <div className="flex justify-center pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto min-w-[300px]">
              {isSubmitting ? "Enviando..." : "Enviar Grito de Guerra"}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
