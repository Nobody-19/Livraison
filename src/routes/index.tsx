import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Package, UtensilsCrossed, Zap, FileText, ShoppingBag,
  Clock, Shield, Wallet, Calendar,
  ClipboardList, Bike, Truck, MapPin,
  Phone, Mail, MessageCircle, ArrowRight, Star, Instagram,
  Facebook, Menu, X, CheckCircle2, Circle, Navigation,
} from "lucide-react";

// Imports des images
import heroImage from "@/assets/hero-delivery.jpg";
import hero2Image from "@/assets/hero2-delivery.png"; // Ajouté selon tes instructions
import logo from "@/assets/logo-nesorkaba.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NésorKaba Delivery — Commandez aujourd'hui, recevez sans attendre" },
      { name: "description", content: "NésorKaba Delivery, basée à Lomé (Baguida, Togo) : livraison de repas, colis, documents et courses. Rapide, sécurisé, 7j/7." },
      { property: "og:title", content: "NésorKaba Delivery — Commandez aujourd'hui, recevez sans attendre" },
      { property: "og:description", content: "Société de livraison basée à Lomé-Baguida (Togo). Repas, colis, courses et documents livrés rapidement, 7j/7." },
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
  { icon: UtensilsCrossed, title: "Livraison de repas", desc: "Vos plats préférés livrés chauds en un temps record." },
  { icon: Package, title: "Livraison de colis", desc: "Petits ou grands colis, livrés en toute sécurité." },
  { icon: Zap, title: "Livraison express", desc: "Urgent ? En moins d'une heure." },
  { icon: FileText, title: "Documents", desc: "Traités avec discrétion et rapidité." },
  { icon: ShoppingBag, title: "Courses", desc: "On fait vos courses et on vous les livre." },
];

const advantages = [
  { icon: Clock, title: "Rapidité", desc: "30 min en moyenne." },
  { icon: Shield, title: "Sécurité", desc: "Colis assurés, suivi en temps réel." },
  { icon: Wallet, title: "Abordable", desc: "Prix transparents, sans surprise." },
  { icon: Calendar, title: "7j/7", desc: "Disponible jour et nuit." },
];

const steps = [
  { icon: ClipboardList, title: "Commande", desc: "En quelques clics." },
  { icon: Bike, title: "Récupération", desc: "Le livreur vient chercher." },
  { icon: Truck, title: "Transport", desc: "Rapide et sécurisé." },
  { icon: MapPin, title: "Livraison", desc: "Remise en main propre." },
];

const testimonials = [
  { name: "Amegan J.", role: "Client fidèle", text: "Service impeccable, livraison toujours à l'heure !" },
  { name: "Kodjo B.", role: "Restaurateur", text: "Mes plats arrivent chauds chez mes clients. Partenaire de confiance." },
  { name: "Sophie L.", role: "Entrepreneure", text: "Rapides, pros et abordables. Indispensables." },
];

const TRACKER_STEPS = [
  { id: 0, icon: ClipboardList, label: "Commande reçue", time: "09:14", detail: "Commande confirmée" },
  { id: 1, icon: Bike, label: "Livreur en route", time: "09:18", detail: "Koffi se dirige vers le restaurant" },
  { id: 2, icon: Package, label: "Colis récupéré", time: "09:27", detail: "Récupéré chez le partenaire" },
  { id: 3, icon: Navigation, label: "En livraison", time: "09:31", detail: "Arrivée dans ~8 min" },
  { id: 4, icon: CheckCircle2, label: "Livré ✓", time: "09:39", detail: "Livraison effectuée !" },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
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
    const patterns: Record<string, number[]> = {
      light: [8], medium: [18], heavy: [25, 8, 25],
    };
    navigator.vibrate(patterns[type]);
  }, []);
}

// ─── Icons ─────────────────────────────────────────────────────────────────
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.54V6.78a4.85 4.85 0 0 1-1.06-.09z" />
    </svg>
  );
}

// ─── Components ────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(value, 1600, active);
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-display font-bold">
        {suffix === "★" ? `${count}${suffix}` : suffix === "min" ? `${count}${suffix}` : `${Math.round(count as number).toLocaleString()}${suffix}`}
      </div>
      <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function HapticLink({ href, children, className, target, rel, "aria-label": ariaLabel, hapticType = "light" }: {
  href: string; children: React.ReactNode; className?: string;
  target?: string; rel?: string; "aria-label"?: string;
  hapticType?: "light" | "medium" | "heavy";
}) {
  const haptic = useHaptic();
  return (
    <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={className}
      onPointerDown={() => haptic(hapticType)}>
      {children}
    </a>
  );
}

// ─── Delivery Tracker ───────────────────────────────────────────────────────
function DeliveryTracker() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const haptic = useHaptic();
  const { ref, inView } = useInView(0.2);

  useEffect(() => {
    if (inView && !isPlaying && activeStep === 0)
      setTimeout(() => setIsPlaying(true), 400);
  }, [inView]);

  useEffect(() => {
    if (!isPlaying) return;
    if (activeStep >= TRACKER_STEPS.length - 1) { setIsPlaying(false); return; }
    setProgress(0);
    const duration = 2000;
    const interval = 30;
    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min((elapsed / duration) * 100, 100));
      if (elapsed >= duration) {
        clearInterval(timer);
        haptic("medium");
        setActiveStep(s => s + 1);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isPlaying, activeStep]);

  const restart = () => { haptic("heavy"); setActiveStep(0); setProgress(0); setIsPlaying(true); };
  const isDone = activeStep >= TRACKER_STEPS.length - 1;

  return (
    <div ref={ref} className="bg-foreground text-background rounded-2xl p-4 md:p-6 shadow-xl border border-background/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className={`w-2 h-2 rounded-full ${isDone ? "bg-green-400" : "bg-yellow animate-pulse"}`} />
            <span className="text-[10px] font-semibold text-background/50 uppercase tracking-wider">
              {isDone ? "Terminée" : "En direct"}
            </span>
          </div>
          <div className="font-display font-bold text-base">#NK-2847</div>
          <div className="text-xs text-background/40">Baguida → Hédzranawoé</div>
        </div>
        <button onPointerDown={() => haptic("medium")} onClick={restart}
          className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground transition active:scale-90" aria-label="Rejouer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* Livreur */}
      <div className="flex items-center gap-3 bg-background/5 rounded-xl p-3 mb-4 border border-background/10">
        <div className="w-10 h-10 rounded-full bg-yellow flex items-center justify-center font-display font-bold text-yellow-foreground shrink-0">K</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">Koffi Mensah</div>
          <div className="text-xs text-background/40">⭐ 4.9 · Votre livreur</div>
        </div>
        <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" hapticType="light"
          className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 active:scale-90 transition" aria-label="Contacter">
          <MessageCircle className="w-4 h-4 text-white" />
        </HapticLink>
      </div>

      {/* Steps */}
      <div className="space-y-0.5 mb-4">
        {TRACKER_STEPS.map((step, i) => {
          const isCompleted = i < activeStep;
          const isCurrent = i === activeStep;
          return (
            <div key={step.id}>
              <div className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-500 ${isCurrent ? "bg-yellow/15 border border-yellow/30" : isCompleted ? "opacity-50" : "opacity-25"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-yellow text-yellow-foreground" : "bg-background/10"}`}>
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <step.icon className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                  <span className={`text-xs font-semibold truncate ${isCurrent ? "text-yellow" : isCompleted ? "text-background/70" : "text-background/30"}`}>{step.label}</span>
                  {(isCompleted || isCurrent) && <span className="text-[10px] text-background/30 shrink-0">{step.time}</span>}
                </div>
              </div>
              {isCurrent && i < TRACKER_STEPS.length - 1 && (
                <div className="ml-6 my-0.5 h-0.5 bg-background/10 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow rounded-full" style={{ width: `${progress}%`, transition: "width 30ms linear" }} />
                </div>
              )}
              {isCompleted && i < TRACKER_STEPS.length - 1 && <div className="ml-6 my-0.5 h-0.5 bg-green-500/30 rounded-full" />}
            </div>
          );
        })}
      </div>

      {!isDone ? (
        <div className="flex items-center justify-between bg-background/5 rounded-xl px-3 py-2 border border-background/10">
          <span className="text-xs text-background/40">Temps estimé</span>
          <span className="font-display font-bold text-yellow text-sm">~{Math.max(2, (TRACKER_STEPS.length - 1 - activeStep) * 8)} min</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 bg-green-500/20 border border-green-500/30 rounded-xl px-3 py-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-xs font-semibold text-green-400">Livré avec succès ! 🎉</span>
        </div>
      )}
      <p className="text-center text-[10px] text-background/20 mt-3">— Démonstration interactive —</p>
    </div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const haptic = useHaptic();

  // État pour le carrousel d'images
  const [heroSlide, setHeroSlide] = useState(0);

  // Auto-rotation du carrousel
  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % 2), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const socialLinks = [
    { href: SOCIAL_LINKS.facebook, icon: Facebook, label: "Facebook" },
    { href: SOCIAL_LINKS.tiktok, icon: TikTokIcon, label: "TikTok" },
    { href: SOCIAL_LINKS.instagram, icon: Instagram, label: "Instagram" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Floating WhatsApp ── */}
      <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" hapticType="medium" aria-label="WhatsApp"
        className="fixed bottom-5 right-4 z-50 w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_6px_24px_-4px_#25D366bb] hover:scale-110 active:scale-95 transition-transform"
        style={{ width: 52, height: 52 }}>
        <MessageCircle className="w-5 h-5" />
      </HapticLink>

      {/* ── Nav ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-background/95 border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-display font-bold text-base">
            <img src={logo} alt="NésorKaba" className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover" />
            <span className="hidden sm:inline">NésorKaba</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {["Services", "Avantages", "Fonctionnement", "Localisation", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-yellow transition-colors">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" hapticType="heavy"
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow text-yellow-foreground text-xs font-semibold active:scale-95 transition">
              Commander <ArrowRight className="w-3 h-3" />
            </HapticLink>
            <HapticLink href="#contact" hapticType="light"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:scale-105 active:scale-95 transition">
              Commander <ArrowRight className="w-4 h-4" />
            </HapticLink>
            <button onPointerDown={() => haptic("light")} onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-secondary active:scale-90 transition" aria-label="Menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-72 border-b border-border" : "max-h-0"} bg-background/98 backdrop-blur-md`}>
          <nav className="px-4 py-3 flex flex-col gap-1">
            {["Services", "Avantages", "Fonctionnement", "Localisation", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                onClick={() => { setMenuOpen(false); haptic("light"); }}
                className="py-2.5 px-3 rounded-xl hover:bg-secondary text-sm font-medium transition-colors">{item}</a>
            ))}
            <div className="flex gap-3 px-3 pt-2 pb-1 border-t border-border mt-1">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <HapticLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} hapticType="light"
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground transition active:scale-90">
                  <Icon className="w-3.5 h-3.5" />
                </HapticLink>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-14 pb-6 md:pt-24 md:pb-16 overflow-hidden">
        <div className="absolute -top-16 -right-24 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full bg-yellow/20 blur-3xl" style={{ animation: "pulse 4s ease-in-out infinite" }} />
        <div className="absolute bottom-0 -left-20 w-48 h-48 rounded-full bg-yellow/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center gap-0">

            {/* Text */}
            <div className="order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium mb-4 animate-fade-up">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-ping" />
                7j/7 · 24h/24 — Lomé, Togo
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Commandez aujourd'hui,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">recevez</span>
                  <span className="absolute inset-x-0 bottom-0.5 h-3 bg-yellow -z-0" />
                </span>{" "}
                sans attendre
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mb-5 max-w-sm animate-fade-up" style={{ animationDelay: "0.2s" }}>
                Repas, colis, courses ou documents livrés à Lomé — Baguida. Rapide, sécurisé, 7j/7.
              </p>

              {/* CTA buttons */}
              <div className="flex gap-3 mb-5 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" hapticType="heavy"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-yellow text-yellow-foreground font-semibold text-sm shadow-[0_8px_30px_-8px_var(--yellow)] hover:scale-105 active:scale-95 transition">
                  Commander <ArrowRight className="w-4 h-4" />
                </HapticLink>
                <HapticLink href="tel:+22870074420" hapticType="medium"
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-foreground font-semibold text-sm hover:bg-foreground hover:text-background active:scale-95 transition">
                  <Phone className="w-4 h-4" /> Appeler
                </HapticLink>
              </div>

              {/* Social */}
              <div className="flex items-center gap-2.5 mb-5 animate-fade-up" style={{ animationDelay: "0.35s" }}>
                <span className="text-xs text-muted-foreground">Suivez-nous :</span>
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <HapticLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} hapticType="light"
                    className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground active:scale-90 transition">
                    <Icon className="w-3 h-3" />
                  </HapticLink>
                ))}
              </div>
            </div>

            {/* Image carousel (Mise à jour selon Étape 2) */}
            <div className="order-2 relative animate-fade-up" style={{ animationDelay: "0.25s" }}>
              {[heroImage, hero2Image].map((img, i) => (
                <div key={i} className={`transition-opacity duration-700 ${i === 0 ? "relative" : "absolute inset-0"}`}
                  style={{ opacity: heroSlide === i ? 1 : 0 }}>
                  <div className="absolute inset-0 bg-yellow rounded-2xl md:rounded-[2rem] rotate-2" />
                  <img src={img} alt="Livreur NésorKaba" width={1536} height={1024}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="relative rounded-2xl md:rounded-[2rem] object-cover w-full h-56 md:h-auto md:max-h-[520px] bg-background shadow-lg"
                    style={{ animation: "floatSlow 6s ease-in-out infinite" }} />
                </div>
              ))}
              
              {/* Dots navigation */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {[0, 1].map(i => (
                  <button key={i} onClick={() => setHeroSlide(i)}
                    className={`rounded-full transition-all duration-300 ${heroSlide === i ? "w-5 h-1.5 bg-yellow" : "w-1.5 h-1.5 bg-foreground/30"}`} />
                ))}
              </div>

              {/* En route badge */}
              <div className="absolute -bottom-3 left-3 md:-bottom-5 md:-left-5 bg-background border border-border rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
                style={{ animation: "floatSlow 6s ease-in-out infinite", animationDelay: "1s" }}>
                <img src={logo} alt="" className="w-8 h-8 md:w-11 md:h-11 rounded-full" />
                <div>
                  <div className="text-[10px] md:text-xs text-muted-foreground">NésorKaba Delivery</div>
                  <div className="font-bold text-xs md:text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> En route…
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Mobile */}
            <div ref={statsRef} className="order-3 lg:hidden animate-fade-up mt-6" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-around bg-secondary rounded-2xl px-4 py-4 border border-border">
                <StatCard value={10000} suffix="+" label="Livraisons" active={statsVisible} />
                <div className="w-px h-8 bg-border" />
                <StatCard value={30} suffix="min" label="Délai moyen" active={statsVisible} />
                <div className="w-px h-8 bg-border" />
                <StatCard value={4.9} suffix="★" label="Satisfaction" active={statsVisible} />
              </div>
            </div>

            {/* Stats desktop */}
            <div className="order-4 hidden lg:flex items-center gap-6 pt-6 border-t border-border animate-fade-up" style={{ animationDelay: "0.5s" }}>
              {[{ value: 10000, suffix: "+", label: "Livraisons" }, { value: 30, suffix: "min", label: "Délai moyen" }, { value: 4.9, suffix: "★", label: "Satisfaction" }].map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  <StatCard {...s} active={statsVisible} />
                  {i < 2 && <div className="w-px h-10 bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-12 md:py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal className="mb-8 md:mb-12">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nos services</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-2">On se charge de tout.</h2>
          </Reveal>
          <div className="flex gap-3 overflow-x-auto pb-3 md:pb-0 md:grid md:grid-cols-3 md:gap-5 snap-x snap-mandatory scrollbar-hide">
            {services.map((s) => (
              <div key={s.title} className="snap-start shrink-0 w-44 md:w-auto bg-background rounded-2xl p-4 md:p-7 border border-border hover:border-yellow hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                <div className="w-10 h-10 md:w-13 md:h-13 rounded-xl bg-yellow/20 flex items-center justify-center mb-3 group-hover:bg-yellow group-hover:scale-110 transition-all duration-300">
                  <s.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="font-display text-sm md:text-lg font-bold mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="md:hidden text-center text-xs text-muted-foreground mt-3">← Glisser pour voir plus →</p>
        </div>
      </section>

      {/* ── Tracker ── */}
      <section id="tracker" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal className="mb-6 md:mb-10">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suivi en temps réel</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-2">
              Votre livraison,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">en direct</span>
                <span className="absolute inset-x-0 bottom-0 h-2.5 bg-yellow -z-0" />
              </span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 md:items-center">
            <Reveal className="hidden md:block">
              <ul className="space-y-3 mb-6">
                {["Notifications à chaque étape", "Contact direct avec le livreur", "Heure d'arrivée estimée en temps réel"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-yellow shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" hapticType="heavy"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow text-yellow-foreground font-semibold text-sm hover:scale-105 active:scale-95 transition shadow-[0_6px_24px_-6px_var(--yellow)]">
                Commander maintenant <ArrowRight className="w-4 h-4" />
              </HapticLink>
            </Reveal>
            <Reveal delay={0.1}>
              <DeliveryTracker />
              <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" hapticType="heavy"
                className="md:hidden mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-yellow text-yellow-foreground font-semibold text-sm active:scale-95 transition shadow-[0_6px_24px_-6px_var(--yellow)]">
                Commander maintenant <ArrowRight className="w-4 h-4" />
              </HapticLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Avantages ── */}
      <section id="avantages" className="py-12 md:py-20 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal className="mb-8">
            <span className="text-xs font-semibold text-yellow uppercase tracking-wider">Pourquoi NésorKaba</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-2">
              Livraison <span className="text-yellow">sans compromis</span>.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="bg-background/5 border border-background/10 rounded-2xl p-4 md:p-6 hover:bg-yellow hover:text-yellow-foreground transition-all duration-300 group h-full">
                  <a.icon className="w-6 h-6 md:w-8 md:h-8 mb-3 text-yellow group-hover:text-yellow-foreground transition" />
                  <h3 className="font-display text-sm md:text-lg font-bold mb-1">{a.title}</h3>
                  <p className="text-xs md:text-sm opacity-60">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fonctionnement ── */}
      <section id="fonctionnement" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal className="mb-8 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comment ça marche</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-2">4 étapes simples</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="bg-background border border-border rounded-2xl p-4 md:p-7 hover:border-yellow hover:shadow-md transition-all duration-300 group h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-yellow group-hover:text-yellow-foreground transition-colors">
                      <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="font-display text-3xl md:text-4xl font-bold text-yellow opacity-60">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-sm md:text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-12 md:py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal className="mb-8 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Témoignages</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-2">Ils nous font confiance</h2>
          </Reveal>
          <div className="flex gap-3 overflow-x-auto pb-3 md:pb-0 md:grid md:grid-cols-3 md:gap-5 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((t) => (
              <div key={t.name} className="snap-start shrink-0 w-72 md:w-auto bg-background rounded-2xl p-5 md:p-7 border border-border hover:shadow-md transition-all duration-300">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow text-yellow" />)}
                </div>
                <p className="text-foreground/80 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-yellow flex items-center justify-center font-bold text-yellow-foreground text-sm">{t.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Localisation ── */}
      <section id="localisation" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal className="mb-6 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Où nous trouver</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold mt-2">Notre localisation</h2>
          </Reveal>
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d1.316760!3d6.174995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMjkuOSJOIDHCsDE5JzAwLjMiRQ!5e0!3m2!1sfr!2stg!4v1"
                width="100%" height="260" className="md:h-96" style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="PAPY SPOT — Baguida, Lomé"
              />
            </div>
            <div className="flex items-center justify-between bg-secondary rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-yellow/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-yellow" />
                </div>
                <div>
                  <div className="font-bold text-sm">PAPY SPOT</div>
                  <div className="text-xs text-muted-foreground">Baguida, Lomé — Togo</div>
                </div>
              </div>
              <HapticLink href={SOCIAL_LINKS.maps} target="_blank" rel="noopener noreferrer" hapticType="medium"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background font-semibold text-xs hover:scale-105 active:scale-95 transition shrink-0">
                <MapPin className="w-3.5 h-3.5" /> Maps
              </HapticLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="relative bg-yellow rounded-2xl md:rounded-[2rem] p-8 md:p-14 overflow-hidden">
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-yellow-foreground/10" />
              <div className="relative">
                <h2 className="font-display text-2xl md:text-4xl font-bold text-yellow-foreground mb-3">
                  Prêt à commander ?
                </h2>
                <p className="text-yellow-foreground/80 text-sm md:text-base mb-6">
                  Contactez NésorKaba pour une prise en charge immédiate.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <HapticLink href="tel:+22870074420" hapticType="medium"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:scale-105 active:scale-95 transition">
                    <Phone className="w-4 h-4" /> +228 70 07 44 20
                  </HapticLink>
                  <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" hapticType="heavy"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-background text-foreground font-semibold text-sm hover:scale-105 active:scale-95 transition">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </HapticLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-foreground text-background pt-10 pb-6 md:pt-16 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Mobile footer */}
          <div className="md:hidden">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="NésorKaba" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-display font-bold">NésorKaba Delivery</div>
                <div className="text-xs text-background/50">Baguida, Lomé — Togo</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <a href="tel:+22870074420" className="flex items-center gap-2 bg-background/5 border border-background/10 rounded-xl px-3 py-2.5 text-xs font-medium active:scale-95 transition">
                <Phone className="w-4 h-4 text-yellow shrink-0" /> +228 70 07 44 20
              </a>
              <HapticLink href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" hapticType="heavy"
                className="flex items-center gap-2 bg-yellow text-yellow-foreground rounded-xl px-3 py-2.5 text-xs font-semibold active:scale-95 transition">
                <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp
              </HapticLink>
            </div>
            <p className="text-[10px] text-background/30 text-center uppercase tracking-widest">© 2026 NésorKaba Delivery</p>
          </div>

          {/* Desktop footer */}
          <div className="hidden md:grid md:grid-cols-4 gap-10 pb-12 border-b border-background/10">
            <div>
              <div className="flex items-center gap-3 font-display font-bold text-lg mb-3">
                <img src={logo} alt="NésorKaba" className="w-11 h-11 rounded-full object-cover" />
                NésorKaba
              </div>
              <p className="text-yellow font-semibold mb-2 italic text-sm">« {TAGLINE} »</p>
              <div className="flex gap-2.5 mt-4">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <HapticLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} hapticType="light"
                    className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground transition-all">
                    <Icon className="w-3.5 h-3.5" />
                  </HapticLink>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3 text-sm">Contact</h4>
              <ul className="space-y-2.5 text-xs text-background/60">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-yellow" /> +228 70 07 44 20</li>
                <li className="flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5 text-yellow" /> WhatsApp 24/7</li>
                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-yellow" /> Baguida, Lomé</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3 text-sm">Services</h4>
              <ul className="space-y-1.5 text-xs text-background/60">
                {services.map(s => <li key={s.title}>{s.title}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3 text-sm">Horaires</h4>
              <p className="text-yellow font-semibold text-sm">24h/24 — 7j/7</p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes floatSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 0.6s ease both; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}