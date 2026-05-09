import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Package, UtensilsCrossed, Zap, FileText, ShoppingBag,
  ClipboardList, Bike, Truck, MapPin,
  Phone, Mail, MessageCircle, ArrowRight, Instagram,
  Facebook, Menu, X, CheckCircle2, Navigation,
} from "lucide-react";

// Images
import heroImage from "@/assets/hero-delivery.jpg";
import hero2Image from "@/assets/hero2-delivery.png";
import logo from "@/assets/logo-nesorkaba.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const TAGLINE = "Commandez aujourd'hui, recevez sans attendre";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/1E4YNzPwWn/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@nesorka_delivery.tg?_r=1&_t=ZN-95UMqZPJZzi",
  instagram: "https://www.instagram.com/nesorkaba.tg?igsh=MWY2c2ZrMXJrbHdybw%3D%3D&utm_source=qr",
  whatsapp: "https://wa.me/22870074420",
  maps: "https://maps.google.com/?q=6.174995,1.316760",
};

const services = [
  { icon: UtensilsCrossed, title: "Livraison de repas", desc: "Vos plats préférés livrés chauds." },
  { icon: Package, title: "Livraison de colis", desc: "Petits ou grands colis, sécurisés." },
  { icon: Zap, title: "Livraison express", desc: "Urgent ? En moins d'une heure." },
  { icon: FileText, title: "Documents", desc: "Traités avec discrétion." },
  { icon: ShoppingBag, title: "Livraison de courses", desc: "On fait vos courses pour vous." },
];

const TRACKER_STEPS = [
  { id: 0, icon: ClipboardList, label: "Commande reçue", time: "09:14" },
  { id: 1, icon: Bike, label: "Livreur en route", time: "09:18" },
  { id: 2, icon: Package, label: "Colis récupéré", time: "09:27" },
  { id: 3, icon: Navigation, label: "En livraison", time: "09:31" },
  { id: 4, icon: CheckCircle2, label: "Livré ✓", time: "09:39" },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────
function useHaptic() {
  return useCallback((type: "light" | "medium" | "heavy" = "light") => {
    if (!("vibrate" in navigator)) return;
    const patterns: Record<string, number[]> = { light: [8], medium: [18], heavy: [25, 8, 25] };
    navigator.vibrate(patterns[type]);
  }, []);
}

function HapticLink({ href, children, className, target, rel, hapticType = "light" }: any) {
  const haptic = useHaptic();
  return (
    <a href={href} target={target} rel={rel} className={className} onPointerDown={() => haptic(hapticType)}>
      {children}
    </a>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const haptic = useHaptic();

  // Jaune Premium
  const BRAND_YELLOW = "#FFCC00"; 

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % 2), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden" style={{ "--brand-yellow": BRAND_YELLOW } as any}>
      
      {/* ── WhatsApp Floating Button ── */}
      <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" hapticType="medium"
        className="fixed bottom-6 right-5 z-[100] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
        <MessageCircle className="w-8 h-8" fill="currentColor" />
      </HapticLink>

      {/* ── Header (Bouton Commander supprimé) ── */}
      <header className={`fixed top-0 inset-x-0 z-[80] transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md text-white py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border-2 border-yellow-400" />
            <span className={`font-display font-black text-xl tracking-tighter ${scrolled ? "text-white" : "text-black"}`}>NésorKaba</span>
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`p-2 rounded-full ${scrolled ? "bg-white/10 text-white" : "bg-black/5 text-black"}`}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div className={`fixed inset-0 bg-black text-white z-[90] transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex justify-end"><button onClick={() => setMenuOpen(false)}><X size={32} /></button></div>
        <div className="flex flex-col items-center gap-8 pt-10 text-3xl font-display font-black">
          {["Services", "Avantages", "Localisation"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="active:text-[#FFCC00]">{item}</a>
          ))}
          <HapticLink href={SOCIAL_LINKS.whatsapp} className="bg-[#FFCC00] text-black px-12 py-4 rounded-full mt-6 text-xl font-black">Commander</HapticLink>
        </div>
      </div>

      {/* ── Hero Section (Jaune Premium & Pas d'arrondi en bas) ── */}
      <section className="pt-28 pb-16 bg-[#FFCC00] relative">
        <div className="px-5 max-w-7xl mx-auto flex flex-col gap-8">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#FFCC00] rounded-full text-[10px] font-black uppercase tracking-widest mx-auto">
              <span className="w-2 h-2 bg-[#FFCC00] rounded-full animate-pulse" /> Lomé, Togo
            </div>
            <h1 className="text-[2.6rem] font-display font-black leading-[0.95] text-black tracking-tighter">
              Commandez <br />
              <span className="text-white drop-shadow-md">aujourd'hui,</span> <br />
              recevez vite.
            </h1>
            <p className="text-black/80 text-sm font-bold leading-tight mx-auto max-w-[280px]">
              La livraison la plus rapide de Baguida. Repas, colis & courses 7j/7.
            </p>
            <div className="flex gap-3 pt-2">
              <HapticLink href={SOCIAL_LINKS.whatsapp} hapticType="heavy" className="flex-1 bg-black text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-black/20">
                Commander <ArrowRight size={18} />
              </HapticLink>
              <HapticLink href="tel:+22870074420" hapticType="medium" className="flex-1 bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 border-b-4 border-black/10 shadow-sm">
                <Phone size={18} /> Appeler
              </HapticLink>
            </div>
          </div>

          {/* Carousel Photo (Object-top pour voir la tête) */}
          <div className="relative w-full aspect-[4/5] rounded-[2.5rem] border-[6px] border-black overflow-hidden shadow-2xl">
            {[heroImage, hero2Image].map((img, i) => (
              <img key={i} src={img} alt="Livreur" className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${heroSlide === i ? "opacity-100" : "opacity-0"}`} />
            ))}
            {/* Badge flottant */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/95 p-4 rounded-[1.5rem] flex items-center gap-4 text-white border border-white/20">
              <img src={logo} className="w-10 h-10 rounded-full border border-[#FFCC00]" alt="Logo" />
              <div>
                <p className="text-[10px] text-[#FFCC00] font-black uppercase tracking-widest">NésorKaba Delivery</p>
                <p className="text-[11px] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> En route pour vous livrer...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services (Arrondi seulement en haut pour effacer les "oreilles") ── */}
      <section id="services" className="bg-black text-white rounded-t-[3.5rem] pt-16 pb-20 px-6 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-display font-black tracking-tighter">Nos <br /><span className="text-[#FFCC00]">Services</span></h2>
            <div className="w-16 h-2 bg-[#FFCC00] mt-4 rounded-full" />
          </div>
          <div className="grid gap-5">
            {services.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center gap-5 active:scale-95 transition-transform">
                <div className="w-14 h-14 bg-[#FFCC00] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#FFCC00]/20">
                  <s.icon className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#FFCC00] leading-none mb-1">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracker ── */}
      <section className="py-20 px-5 bg-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-black tracking-tight">Suivi en Direct</h2>
          <div className="w-12 h-1 bg-black mx-auto mt-2" />
        </div>
        <div className="bg-black text-white p-7 rounded-[2.5rem] shadow-2xl max-w-sm mx-auto">
            <div className="space-y-7">
                {TRACKER_STEPS.map((step, i) => (
                    <div key={i} className={`flex items-center gap-5 ${i > 1 ? "opacity-20" : ""}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= 1 ? "bg-[#FFCC00] text-black shadow-lg shadow-[#FFCC00]/30" : "bg-white/10"}`}>
                            <step.icon size={20} />
                        </div>
                        <div className="flex-1 border-b border-white/5 pb-3 flex justify-between items-center">
                            <span className="text-sm font-black uppercase tracking-tight">{step.label}</span>
                            <span className="text-[10px] font-bold opacity-40">{step.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ── Footer Restauré (Version Originale Noire) ── */}
      <footer id="contact" className="bg-black text-white pt-16 pb-10 rounded-t-[3.5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#FFCC00] font-black italic text-lg mb-3">« {TAGLINE} »</p>
            <p className="text-white/40 text-[11px] leading-relaxed max-w-xs font-medium">
                Société de livraison basée à Baguida (Lomé, Togo). Fondée en mars 2026 par M. Yevuyibor Kodjo Michael.
            </p>
            <div className="flex gap-4 mt-8">
              <HapticLink href={SOCIAL_LINKS.facebook} className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center"><Facebook size={20} /></HapticLink>
              <HapticLink href={SOCIAL_LINKS.tiktok} className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center font-black text-xs">TT</HapticLink>
              <HapticLink href={SOCIAL_LINKS.instagram} className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center"><Instagram size={20} /></HapticLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <h4 className="font-display font-black text-[#FFCC00] uppercase tracking-widest text-[10px]">Contact</h4>
              <ul className="space-y-5 text-xs font-bold">
                <li className="flex items-center gap-3"><Phone size={14} className="text-[#FFCC00]" /> +228 70 07 44 20</li>
                <li className="flex items-center gap-3"><Phone size={14} className="text-[#FFCC00]" /> +228 96 36 27 47</li>
                <li className="flex items-center gap-3"><MessageCircle size={14} className="text-[#FFCC00]" /> WhatsApp 24/7</li>
                <li className="flex items-start gap-3"><MapPin size={14} className="text-[#FFCC00] shrink-0" /> Baguida, Lomé</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-display font-black text-[#FFCC00] uppercase tracking-widest text-[10px]">Services</h4>
              <ul className="space-y-4 text-xs font-bold opacity-60">
                {services.map(s => <li key={s.title}>{s.title}</li>)}
              </ul>
            </div>
          </div>

          <div className="mb-12 bg-white/5 p-6 rounded-[2rem] border border-white/10">
            <h4 className="font-display font-black text-[#FFCC00] uppercase tracking-widest text-[10px] mb-4">Disponibilité</h4>
            <p className="text-xs opacity-60 mb-1">Lundi — Dimanche</p>
            <p className="text-[#FFCC00] font-black text-2xl mb-5">24h/24 — 7j/7</p>
            <HapticLink href={SOCIAL_LINKS.whatsapp} className="bg-[#FFCC00] text-black px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 w-full text-sm">
              <MessageCircle size={20} fill="currentColor" /> Chatter maintenant
            </HapticLink>
          </div>

          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold">
              © 2026 NésorKaba Delivery — Lomé, Togo
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; }
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
    </div>
  );
}