import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Package, UtensilsCrossed, Zap, FileText, ShoppingBag,
  Clock, Shield, Wallet, Calendar,
  ClipboardList, Bike, Truck, MapPin,
  Phone, Mail, MessageCircle, ArrowRight, Star, Instagram,
  Facebook, Menu, X, CheckCircle2, Navigation,
} from "lucide-react";

// Imports des images
import heroImage from "@/assets/hero-delivery.jpg";
import hero2Image from "@/assets/hero2-delivery.png";
import logo from "@/assets/logo-nesorkaba.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NésorKaba Delivery — Commandez aujourd'hui, recevez sans attendre" },
      { name: "description", content: "NésorKaba Delivery, basée à Lomé (Baguida, Togo) : livraison de repas, colis, documents et courses." },
    ],
  }),
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
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

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
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const haptic = useHaptic();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % 2), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      
      {/* ── WhatsApp Floating Button ── */}
      <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" hapticType="medium"
        className="fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
        <MessageCircle className="w-8 h-8" />
      </HapticLink>

      {/* ── Header ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-black text-white shadow-lg py-2" : "bg-transparent py-4"}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border border-yellow" />
            <span className={`font-display font-bold text-lg ${scrolled ? "text-white" : "text-black"}`}>NésorKaba</span>
          </a>
          <div className="flex items-center gap-3">
            <HapticLink href={SOCIAL_LINKS.whatsapp} className="bg-yellow text-black px-4 py-2 rounded-full text-xs font-bold uppercase shadow-md shadow-yellow/20">
              Commander →
            </HapticLink>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`p-2 rounded-full ${scrolled ? "bg-white/10" : "bg-black/5"}`}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div className={`fixed inset-0 bg-black text-white z-[60] transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex justify-end"><button onClick={() => setMenuOpen(false)}><X size={32} /></button></div>
        <div className="flex flex-col items-center gap-8 pt-10 text-2xl font-display font-bold">
          {["Services", "Avantages", "Localisation"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="hover:text-yellow transition">{item}</a>
          ))}
          <HapticLink href={SOCIAL_LINKS.whatsapp} className="bg-yellow text-black px-10 py-4 rounded-full mt-4">Commander</HapticLink>
        </div>
      </div>

      {/* ── Hero Section (JAUNE AU PREMIER PLAN) ── */}
      <section className="pt-24 pb-12 bg-yellow rounded-b-[3rem] shadow-2xl">
        <div className="px-5 max-w-7xl mx-auto flex flex-col gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-yellow rounded-full text-[10px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-yellow rounded-full animate-pulse" /> 7j/7 · Lomé, Togo
            </div>
            <h1 className="text-4xl font-display font-bold leading-tight text-black">
              Commandez aujourd'hui, <br />
              <span className="bg-black text-white px-2 py-1 inline-block mt-1">recevez sans</span> attendre
            </h1>
            <p className="text-black/70 text-sm font-medium">
              Livraison de repas, colis, documents et courses à Lomé — Baguida.
            </p>
            <div className="flex gap-3 pt-2">
              <HapticLink href={SOCIAL_LINKS.whatsapp} hapticType="heavy" className="flex-1 bg-black text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
                Commander <ArrowRight size={18} />
              </HapticLink>
              <HapticLink href="tel:+22870074420" hapticType="medium" className="flex-1 bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border border-black/10 shadow-sm">
                <Phone size={18} /> Appeler
              </HapticLink>
            </div>
          </div>

          {/* Carousel Image (Visage visible) */}
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-black shadow-2xl shadow-black/20">
            {[heroImage, hero2Image].map((img, i) => (
              <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${heroSlide === i ? "opacity-100" : "opacity-0"}`}>
                <img src={img} alt="Livreur" className="w-full h-full object-cover object-top" />
              </div>
            ))}
            {/* Badge flottant */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 text-white border border-white/10">
              <img src={logo} className="w-10 h-10 rounded-full border border-yellow" alt="Logo" />
              <div>
                <p className="text-[10px] text-yellow font-bold uppercase tracking-widest">NésorKaba Delivery</p>
                <p className="text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> En route pour vous livrer...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services (NOIR AU SECOND PLAN) ── */}
      <section id="services" className="py-20 px-5 bg-black text-white rounded-t-[3rem] -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold">Nos Services</h2>
            <div className="w-20 h-1.5 bg-yellow mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid gap-4">
            {services.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center gap-4 active:scale-95 transition">
                <div className="w-14 h-14 bg-yellow rounded-2xl flex items-center justify-center shrink-0">
                  <s.icon className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-yellow">{s.title}</h3>
                  <p className="text-sm text-white/60">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracker ── */}
      <section className="py-20 px-5 bg-white">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold">Suivi en Direct</h2>
          <p className="text-black/50 text-sm mt-2">Démonstration interactive de livraison</p>
        </div>
        <div className="bg-black text-white p-6 rounded-[2.5rem] shadow-2xl border border-black/5">
            <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-yellow uppercase">Suivi #NK-2847</span>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold">ACTIF</div>
            </div>
            <div className="space-y-6">
                {TRACKER_STEPS.map((step, i) => (
                    <div key={i} className={`flex items-center gap-4 ${i > 1 ? "opacity-30" : ""}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= 1 ? "bg-yellow text-black" : "bg-white/10"}`}>
                            <step.icon size={16} />
                        </div>
                        <div className="flex-1 border-b border-white/10 pb-2 flex justify-between items-center">
                            <span className="text-sm font-bold">{step.label}</span>
                            <span className="text-[10px] opacity-40">{step.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ── Footer Original Restauré (VERSION NOIRE) ── */}
      <footer id="contact" className="bg-black text-white pt-16 pb-8 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-yellow font-bold italic mb-2">« {TAGLINE} »</p>
            <p className="text-white/50 text-xs leading-relaxed max-w-sm">
                Société de livraison basée à Baguida (Lomé, Togo). Fondée en mars 2026 par M. Yevuyibor Kodjo Michael.
            </p>
            <div className="flex gap-3 mt-6">
              <HapticLink href={SOCIAL_LINKS.facebook} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Facebook size={18} /></HapticLink>
              <HapticLink href={SOCIAL_LINKS.tiktok} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-xs">TT</HapticLink>
              <HapticLink href={SOCIAL_LINKS.instagram} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"><Instagram size={18} /></HapticLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mb-12">
            <div>
              <h4 className="font-display font-bold mb-5 text-yellow uppercase tracking-widest text-xs">Contact</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-3"><Phone size={16} className="text-yellow" /> +228 70 07 44 20</li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-yellow" /> +228 96 36 27 47</li>
                <li className="flex items-center gap-3"><MessageCircle size={16} className="text-yellow" /> WhatsApp 24/7</li>
                <li className="flex items-center gap-3"><Mail size={16} className="text-yellow" /> contact@nesorkaba.tg</li>
                <li className="flex items-start gap-3"><MapPin size={16} className="text-yellow shrink-0" /> Baguida, Lomé — Togo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-5 text-yellow uppercase tracking-widest text-xs">Services</h4>
              <ul className="space-y-3 text-sm opacity-80">
                {services.map(s => <li key={s.title}>{s.title}</li>)}
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="font-display font-bold mb-4 text-yellow uppercase tracking-widest text-xs">Horaires</h4>
            <p className="text-sm mb-1 opacity-60">Lundi — Dimanche</p>
            <p className="text-yellow font-bold text-lg mb-4">24h/24 — 7j/7</p>
            <HapticLink href={SOCIAL_LINKS.whatsapp} className="bg-yellow text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 w-fit">
              <MessageCircle size={18} /> Chatter
            </HapticLink>
          </div>

          <div className="pt-8 border-t border-white/10 text-center space-y-4">
            <p className="text-[10px] text-white/30 px-4">
              © 2026 NésorKaba Delivery — Fondée par Yevuyibor Kodjo Michael. Tous droits réservés.
            </p>
            <div className="flex justify-center gap-6 text-[10px] font-bold text-yellow/50">
              <a href="#">Mentions légales</a>
              <a href="#">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @font-face { font-family: 'Display'; src: url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap'); }
        body { font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; }
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; }
      `}</style>
    </div>
  );
}