import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Package, UtensilsCrossed, Zap, FileText, ShoppingBag,
  ClipboardList, Bike, Truck, MapPin,
  Phone, Mail, MessageCircle, ArrowRight, Instagram,
  Facebook, Menu, X, CheckCircle2, Navigation, Send
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
  whatsapp: "https://wa.me/22896362747", // Numéro principal
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

function HapticLink({ href, children, className, target, rel, hapticType = "light", onClick }: any) {
  const haptic = useHaptic();
  return (
    <a href={href} target={target} rel={rel} className={className} 
       onClick={onClick} onPointerDown={() => haptic(hapticType)}>
      {children}
    </a>
  );
}

// ─── Delivery Tracker Component ───
function DeliveryTracker() {
  const [activeStep, setActiveStep] = useState(-1);
  const haptic = useHaptic();
  const trackerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && activeStep === -1) {
          let step = 0;
          const interval = setInterval(() => {
            setActiveStep(step);
            haptic("light");
            step++;
            if (step >= TRACKER_STEPS.length) clearInterval(interval);
          }, 1500);
        }
      }, { threshold: 0.5 }
    );
    if (trackerRef.current) observer.observe(trackerRef.current);
    return () => observer.disconnect();
  }, [activeStep, haptic]);

  return (
    <div ref={trackerRef} className="bg-black text-white p-7 rounded-[2.5rem] shadow-2xl border border-white/5 max-w-sm mx-auto">
      <div className="space-y-7">
        {TRACKER_STEPS.map((step, i) => {
          const isReached = i <= activeStep;
          const isCurrent = i === activeStep;
          return (
            <div key={i} className={`flex items-center gap-5 transition-all duration-700 ${isReached ? "opacity-100" : "opacity-10"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 
                ${isReached ? "bg-[#FFCC00] text-black shadow-lg scale-110" : "bg-white/10 text-white"}`}>
                {isReached && i < activeStep ? <CheckCircle2 size={20} /> : <step.icon size={20} className={isCurrent ? "animate-pulse" : ""} />}
              </div>
              <div className={`flex-1 border-b border-white/5 pb-3 flex justify-between items-center ${isCurrent ? "text-[#FFCC00]" : "text-white"}`}>
                <span className="text-sm font-black uppercase tracking-tight">{step.label}</span>
                <span className="text-[10px] font-bold opacity-40">{step.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const haptic = useHaptic();

  // État du formulaire
  const [form, setForm] = useState({
    depart: "",
    arrivee: "",
    colis: "",
    contact: "",
    heure: ""
  });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % 2), 4500);
    return () => clearInterval(t);
  }, []);

  const closeMenu = () => { haptic("light"); setMenuOpen(false); };

  const sendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    haptic("heavy");
    const message = `📋 DEMANDE DE LIVRAISON – NÉSORKABA 🚚\n\n1️⃣ Lieu de départ : ${form.depart}\n2️⃣ Lieu d’arrivée : ${form.arrivee}\n3️⃣ Type de colis : ${form.colis}\n4️⃣ Contact du receveur : ${form.contact}\n5️⃣ Heure souhaitée : ${form.heure}\n\n📞 Votre demande sera traitée immédiatement.`;
    const whatsappUrl = `https://wa.me/22896362747?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      
      {/* ── WhatsApp Floating ── */}
      <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" hapticType="medium"
        className="fixed bottom-6 right-5 z-[100] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
        <MessageCircle className="w-8 h-8" fill="currentColor" />
      </HapticLink>

      {/* ── Header ── */}
      <header className={`fixed top-0 inset-x-0 z-[80] transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md text-white py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border-2 border-yellow-400" />
            <span className={`font-display font-black text-xl tracking-tighter ${scrolled ? "text-white" : "text-black"}`}>NésorKaba</span>
          </a>
          <button onClick={() => { haptic("medium"); setMenuOpen(!menuOpen); }} 
                  className={`p-2 rounded-full ${scrolled ? "bg-white/10 text-white" : "bg-black/5 text-black"}`}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div className={`fixed inset-0 bg-black text-white z-[90] transition-transform duration-500 flex flex-col ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex justify-end"><button onClick={closeMenu}><X size={32} /></button></div>
        <nav className="flex flex-col items-center gap-8 pt-10 text-3xl font-display font-black">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#commande" onClick={closeMenu}>Commander</a>
          <a href="#localisation" onClick={closeMenu}>Localisation</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="pt-28 pb-16 bg-[#FFCC00] relative">
        <div className="px-5 max-w-7xl mx-auto flex flex-col gap-8">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#FFCC00] rounded-full text-[10px] font-black uppercase tracking-widest">
              7j/7 · Lomé, Togo
            </div>
            <h1 className="text-[2.6rem] font-display font-black leading-[0.95] text-black tracking-tighter">
                Commandez <br /><span className="text-white drop-shadow-md">aujourd'hui,</span> <br />recevez vite.
            </h1>
            <div className="flex gap-3 pt-2">
              <a href="#commande" className="flex-1 bg-black text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2">Commander</a>
              <HapticLink href="tel:+22870074420" className="flex-1 bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 border-b-4 border-black/10">Appeler</HapticLink>
            </div>
          </div>
          <div className="relative w-full aspect-[4/5] rounded-[2.5rem] border-[6px] border-black overflow-hidden shadow-2xl">
            {[heroImage, hero2Image].map((img, i) => (
              <img key={i} src={img} className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${heroSlide === i ? "opacity-100" : "opacity-0"}`} alt="Livreur" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="bg-black text-white rounded-t-[3.5rem] pt-16 pb-20 px-6 -mt-12 relative z-20">
        <h2 className="text-4xl font-display font-black tracking-tighter mb-10">Nos <span className="text-[#FFCC00]">Services</span></h2>
        <div className="grid gap-5">
          {services.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex items-center gap-4">
              <div className="w-14 h-14 bg-[#FFCC00] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/20"><s.icon className="text-black" /></div>
              <div><h3 className="font-black text-[#FFCC00]">{s.title}</h3><p className="text-sm opacity-50">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Formulaire de Commande (NOUVEAUTÉ) ── */}
      <section id="commande" className="py-20 px-5 bg-white">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-black tracking-tight text-black">Prise en <span className="text-[#FFCC00] bg-black px-2">charge</span> immédiate</h2>
            <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Remplissez et validez sur WhatsApp</p>
          </div>

          <form onSubmit={sendOrder} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-4 text-gray-500">1️⃣ Lieu de départ</label>
              <input required type="text" placeholder="Ex: Baguida, Rue de la Paix" 
                className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#FFCC00] transition"
                value={form.depart} onChange={e => setForm({...form, depart: e.target.value})} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-4 text-gray-500">2️⃣ Lieu d'arrivée</label>
              <input required type="text" placeholder="Ex: Hédzranawoé, Marché" 
                className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#FFCC00] transition"
                value={form.arrivee} onChange={e => setForm({...form, arrivee: e.target.value})} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-4 text-gray-500">3️⃣ Type de colis</label>
              <input required type="text" placeholder="Ex: Repas chaud, Documents, etc." 
                className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#FFCC00] transition"
                value={form.colis} onChange={e => setForm({...form, colis: e.target.value})} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-4 text-gray-500">4️⃣ Contact du receveur</label>
              <input required type="tel" placeholder="Ex: +228 90 00 00 00" 
                className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#FFCC00] transition"
                value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase ml-4 text-gray-500">5️⃣ Heure souhaitée</label>
              <input required type="text" placeholder="Ex: Maintenant ou 14h30" 
                className="w-full bg-gray-100 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-[#FFCC00] transition"
                value={form.heure} onChange={e => setForm({...form, heure: e.target.value})} />
            </div>

            <button type="submit" className="w-full bg-[#FFCC00] text-black font-black py-5 rounded-[2rem] shadow-xl shadow-yellow-500/30 flex items-center justify-center gap-3 active:scale-95 transition mt-4">
              Envoyer la demande <Send size={20} />
            </button>
            <p className="text-[9px] text-center font-bold text-gray-400 mt-2 px-6">📞 Votre demande sera traitée immédiatement par nos équipes après envoi.</p>
          </form>
        </div>
      </section>

      {/* ── Tracker ── */}
      <section id="fonctionnement" className="py-20 px-5 bg-gray-50 text-center">
        <h2 className="text-3xl font-display font-black mb-10">Suivi en Direct</h2>
        <DeliveryTracker />
      </section>

      {/* ── Localisation ── */}
      <section id="localisation" className="py-20 px-5 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-display font-black tracking-tight">Notre Localisation</h2>
        </div>
        <div className="rounded-[2.5rem] overflow-hidden border-[6px] border-black shadow-2xl mb-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d1.316760!3d6.174995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMjkuOSJOIDHCsDE5JzAwLjMiRQ!5e0!3m2!1sfr!2stg!4v1"
            width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" title="Maps"
          />
        </div>
        <div className="bg-black text-white p-6 rounded-[2rem] flex items-center justify-between border-b-4 border-[#FFCC00]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFCC00] rounded-full flex items-center justify-center"><MapPin className="text-black" /></div>
            <div className="text-left"><p className="font-black">PAPY SPOT</p><p className="text-xs opacity-50">Baguida, Lomé — Togo</p></div>
          </div>
          <HapticLink href={SOCIAL_LINKS.maps} target="_blank" className="bg-white text-black px-5 py-2 rounded-full font-black text-xs">Maps</HapticLink>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-black text-white pt-16 pb-10 rounded-t-[3.5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#FFCC00] font-black italic text-lg mb-3">« {TAGLINE} »</p>
            <div className="flex gap-4 mt-8">
              <HapticLink href={SOCIAL_LINKS.facebook} className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center"><Facebook size={20} /></HapticLink>
              <HapticLink href={SOCIAL_LINKS.tiktok} className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center font-black text-xs">TT</HapticLink>
              <HapticLink href={SOCIAL_LINKS.instagram} className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center"><Instagram size={20} /></HapticLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <h4 className="text-[#FFCC00] font-black uppercase text-[10px] tracking-widest">Contact</h4>
              <ul className="space-y-4 text-xs font-bold">
                <li><a href="tel:+22896362747">+228 96 36 27 47</a></li>
                <li><a href="tel:+22870074420">+228 70 07 44 20</a></li>
                <li>Baguida, Lomé</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[#FFCC00] font-black uppercase text-[10px] tracking-widest">Services</h4>
              <ul className="space-y-4 text-xs font-bold opacity-50">
                {services.map(s => <li key={s.title}>{s.title}</li>)}
              </ul>
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
            <p className="text-2xl font-black text-[#FFCC00] mb-5">24h/24 — 7j/7</p>
            <HapticLink href={SOCIAL_LINKS.whatsapp} className="bg-[#FFCC00] text-black px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 w-full">Chatter maintenant</HapticLink>
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