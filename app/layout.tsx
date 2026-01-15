import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Rajdhani } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PHOENIX Guild | Forje seu Legado",
  description: "Junte-se à elite. A PHOENIX aguarda por você.",
};

import CustomCursor from "@/components/ui/CustomCursor";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={clsx(
          cinzel.variable,
          cinzelDecorative.variable,
          rajdhani.variable,
          "antialiased bg-void text-foreground font-sans overflow-x-hidden selection:bg-fire-orange selection:text-void"
        )}
      >
        <CustomCursor />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a0a0a',
              color: '#FFD700',
              border: '1px solid #8B0000',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
