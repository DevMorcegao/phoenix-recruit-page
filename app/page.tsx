import BackgroundNarrative from "@/components/background/BackgroundNarrative";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import History from "@/components/sections/History";
import Achievements from "@/components/sections/Achievements";
import Oath from "@/components/sections/Oath";
import RebirthForm from "@/components/sections/RebirthForm";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      <BackgroundNarrative />
      <Header />
      
      <div className="flex-grow">
        <Hero />
        <History />
        <Achievements />
        <Oath />
        <RebirthForm />
      </div>

      <Footer />
    </main>
  );
}
