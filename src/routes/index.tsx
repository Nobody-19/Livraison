import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Package, UtensilsCrossed, Zap, FileText, ShoppingBag,
  Clock, Shield, Wallet, Calendar,
  ClipboardList, Bike, Truck, MapPin,
  Phone, Mail, MessageCircle, ArrowRight, Star, Instagram,
  Facebook, Menu, X,
} from "lucide-react";
import heroImage from "@/assets/hero-delivery.jpg";
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
  { icon: Zap, title: "Livraison express", desc: "Urgent ? On s'en occupe en moins d'une heure." },
  { icon: FileText, title: "Livraison de documents", desc: "Documents confidentiels traités avec discrétion." },
  { icon: ShoppingBag, title: "Livraison de courses", desc: "On fait vos courses et on vous les livre." },
];

const advantages = [
  { icon: Clock, title: "Rapidité", desc: "Livraison en 30 min en moyenne." },
  { icon: Shield, title: "Sécurité", desc: "Vos colis assurés et suivis en temps réel." },
  { icon: Wallet, title: "Tarifs abordables", desc: "Prix transparents, sans surprise." },
  { icon: Calendar, title: "Disponible 7j/7", desc: "À votre service jour et nuit." },
];

const steps = [
  { icon: ClipboardList, title: "Commande", desc: "Vous passez commande en quelques clics." },
  { icon: Bike, title: "Récupération", desc: "Notre livreur récupère votre colis." },
  { icon: Truck, title: "Transport", desc: "Acheminement rapide et sécurisé." },
  { icon: MapPin, title: "Livraison", desc: "Remise en main propre au destinataire." },
];

const testimonials = [
  { name: "Amegan Japhet.", role: "Cliente fidèle", text: "Service impeccable, livraison toujours à l'heure. Je recommande vivement !" },
  { name: "Kodjo B.", role: "Restaurateur", text: "Grâce à NésorKaba, mes plats arrivent chauds chez mes clients. Partenaire de confiance." },
  { name: "Sophie L.", role: "Entrepreneure", text: "Rapides, professionnels et abordables. Indispensables pour mon activité." },
];

const stats = [
  { value: 10000, suffix: "+", label: "Livraisons" },
  { value: 30, suffix: "min", label: "Délai moyen" },
  { value: 4.9, suffix: "★", label: "Satisfaction" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
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

function useCounter(target: number, duration = 1800, active = false) {
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

// ─── TikTok SVG Icon ──────────────────────────────────────────────────────────
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.54V6.78a4.85 4.85 0 0 1-1.06-.09z"/>
    </svg>
  );
}

// ─── Animated Counter Card ─────────────────────────────────────────────────────
function StatCard({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(value, 1800, active);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-display font-bold">
        {suffix === "★" ? `${count}${suffix}` : suffix === "min" ? `${count}${suffix}` : `${Math.round(count as number).toLocaleString()}${suffix}`}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

// ─── Scroll Reveal Wrapper ─────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Floating WhatsApp Button ── */}
      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_32px_-4px_#25D366aa] hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* ── Nav ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-background/90 border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 font-display font-bold text-lg">
            <img src={logo} alt="NésorKaba Delivery" className="w-10 h-10 rounded-full object-cover" />
            <span className="hidden sm:inline">NésorKaba</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Services", "Avantages", "Fonctionnement", "Localisation", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-yellow transition-colors">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:scale-105 transition">
              Commander <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-secondary transition" aria-label="Menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80 border-b border-border" : "max-h-0"} bg-background/95 backdrop-blur-md`}>
          <nav className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            {["Services", "Avantages", "Fonctionnement", "Localisation", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="hover:text-yellow transition-colors py-1">{item}</a>
            ))}
            <a href={SOCIAL_LINKS.whatsapp} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background font-medium w-fit">
              Commander <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute -top-20 -right-32 w-[600px] h-[600px] rounded-full bg-yellow/20 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-yellow/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium mb-6 animate-fade-up" style={{ animationDelay: "0.05s" }}>
              <span className="w-2 h-2 rounded-full bg-yellow animate-ping" />
              NésorKaba Delivery — 7j/7, 24h/24
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Commandez aujourd'hui,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">recevez</span>
                <span className="absolute inset-x-0 bottom-1 h-4 bg-yellow -z-0" />
              </span>{" "}
              sans attendre
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg animate-fade-up" style={{ animationDelay: "0.3s" }}>
              NésorKaba, votre service de livraison à Lomé — Baguida.
              Repas, colis, courses ou documents acheminés rapidement, 7j/7.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-yellow text-yellow-foreground font-semibold shadow-[0_10px_40px_-10px_var(--yellow)] hover:scale-105 hover:shadow-[0_15px_50px_-10px_var(--yellow)] transition"
              >
                Commander maintenant <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-foreground font-semibold hover:bg-foreground hover:text-background transition">
                Nous contacter
              </a>
            </div>

            {/* Stats with animated counters */}
            <div ref={statsRef} className="flex items-center gap-6 mt-10 pt-10 border-t border-border animate-fade-up" style={{ animationDelay: "0.6s" }}>
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  <StatCard {...s} active={statsVisible} />
                  {i < stats.length - 1 && <div className="w-px h-10 bg-border" />}
                </div>
              ))}
            </div>

            {/* Social links under hero */}
            <div className="flex items-center gap-3 mt-6 animate-fade-up" style={{ animationDelay: "0.7s" }}>
              <span className="text-xs text-muted-foreground">Suivez-nous :</span>
              {[
                { href: SOCIAL_LINKS.facebook, icon: Facebook, label: "Facebook" },
                { href: SOCIAL_LINKS.tiktok, icon: TikTokIcon, label: "TikTok" },
                { href: SOCIAL_LINKS.instagram, icon: Instagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground transition group">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <div className="absolute inset-0 bg-yellow rounded-[2rem] rotate-3" />
            <img
              src={heroImage}
              alt="Livreur NésorKaba sur une moto jaune avec colis"
              width={1536}
              height={1024}
              loading="eager"
              className="relative rounded-[2rem] object-contain w-full h-auto max-h-[600px] bg-background shadow-[0_20px_50px_-20px_oklch(0.13_0_0/0.25)]"
              style={{ animation: "floatSlow 6s ease-in-out infinite" }}
            />
            <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-2xl p-4 shadow-xl flex items-center gap-3"
              style={{ animation: "floatSlow 6s ease-in-out infinite", animationDelay: "1s" }}>
              <img src={logo} alt="" className="w-12 h-12 rounded-full" />
              <div>
                <div className="text-xs text-muted-foreground">NésorKaba Delivery</div>
                <div className="font-bold text-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> En route…
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Nos services</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">on se charge de vos livraisons et de vos courses.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group bg-background rounded-2xl p-8 border border-border hover:border-yellow hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-yellow/20 flex items-center justify-center mb-5 group-hover:bg-yellow group-hover:scale-110 transition-all duration-300">
                    <s.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Avantages ── */}
      <section id="avantages" className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="text-sm font-semibold text-yellow uppercase tracking-wider">Pourquoi NésorKaba</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
                Une expérience de livraison <span className="text-yellow">sans compromis</span>.
              </h2>
              <p className="text-background/70 text-lg">
                Nous combinons technologie, équipe expérimentée et service client irréprochable
                pour transformer chaque livraison en une expérience premium.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {advantages.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.1}>
                  <div className="bg-background/5 backdrop-blur border border-background/10 rounded-2xl p-6 hover:bg-yellow hover:text-yellow-foreground transition-all duration-300 group cursor-default h-full">
                    <a.icon className="w-8 h-8 mb-4 text-yellow group-hover:text-yellow-foreground group-hover:scale-110 transition-all duration-300" />
                    <h3 className="font-display text-lg font-bold mb-1">{a.title}</h3>
                    <p className="text-sm opacity-70">{a.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fonctionnement ── */}
      <section id="fonctionnement" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Comment ça marche</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">4 étapes simples</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="relative group">
                  <div className="bg-background border border-border rounded-2xl p-8 hover:shadow-xl hover:border-yellow hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-yellow group-hover:text-yellow-foreground transition-colors duration-300">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <span className="font-display text-5xl font-bold text-yellow">0{i + 1}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 w-6 h-6 text-yellow z-10" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Témoignages</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Ils nous font confiance</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="bg-background rounded-2xl p-8 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow text-yellow" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-yellow flex items-center justify-center font-display font-bold text-yellow-foreground">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Localisation ── */}
      <section id="localisation" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Où nous trouver</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Notre localisation</h2>
            <p className="text-muted-foreground mt-4">Basés à Baguida, Lomé — nous livrons dans toute la ville et ses environs.</p>
          </Reveal>
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-border shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d1.316760!3d6.174995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMjkuOSJOIDHCsDE5JzAwLjMiRQ!5e0!3m2!1sfr!2stg!4v1"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation NésorKaba Delivery — PAPY SPOT, Baguida, Lomé"
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-yellow" />
                </div>
                <div>
                  <div className="font-bold">PAPY SPOT</div>
                  <div className="text-sm text-muted-foreground">Baguida, Lomé — Togo</div>
                  <div className="text-xs text-muted-foreground mt-0.5">6.174995, 1.316760</div>
                </div>
              </div>
              <a
                href={SOCIAL_LINKS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:scale-105 transition shrink-0"
              >
                <MapPin className="w-4 h-4" /> Ouvrir dans Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="relative bg-yellow rounded-[2rem] p-12 md:p-16 overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-yellow-foreground/10" />
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-yellow-foreground/5" />
              <div className="relative max-w-2xl">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-yellow-foreground mb-4">
                  Prêt à expédier votre prochaine livraison ?
                </h2>
                <p className="text-yellow-foreground/80 text-lg mb-8">
                  Contactez NésorKaba dès maintenant pour une prise en charge immédiate.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:+22870074420" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-semibold hover:scale-105 transition">
                    <Phone className="w-4 h-4" /> +228 70 07 44 20
                  </a>
                  <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover:scale-105 transition">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-foreground text-background pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-background/10">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 font-display font-bold text-xl mb-4">
                <img src={logo} alt="NésorKaba Delivery" className="w-12 h-12 rounded-full object-cover" />
                NésorKaba
              </div>
              <p className="text-yellow font-semibold mb-3 italic">« {TAGLINE} »</p>
              <p className="text-background/60 text-sm">
                Société de livraison basée à Baguida (Lomé, Togo).
                Fondée en mars 2026 par M. Yevuyibor Kodjo Michael.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3 mt-5">
                {[
                  { href: SOCIAL_LINKS.facebook, icon: Facebook, label: "Facebook" },
                  { href: SOCIAL_LINKS.tiktok, icon: TikTokIcon, label: "TikTok" },
                  { href: SOCIAL_LINKS.instagram, icon: Instagram, label: "Instagram" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-background/70">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-yellow shrink-0" /><a href="tel:+22870074420" className="hover:text-yellow transition">+228 70 07 44 20</a></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-yellow shrink-0" /><a href="tel:+22896362747" className="hover:text-yellow transition">+228 96 36 27 47</a></li>
                <li className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-yellow shrink-0" /><a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-yellow transition">WhatsApp 24/7</a></li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-yellow shrink-0" /><a href="mailto:contact@nesorkaba.tg" className="hover:text-yellow transition">contact@nesorkaba.tg</a></li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-yellow shrink-0 mt-0.5" />
                  <a href={SOCIAL_LINKS.maps} target="_blank" rel="noopener noreferrer" className="hover:text-yellow transition">PAPY SPOT — Baguida, Lomé, Togo</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-background/70">
                {services.map((s) => (
                  <li key={s.title} className="hover:text-yellow transition cursor-default">{s.title}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Horaires</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>Lundi — Dimanche</li>
                <li className="text-yellow font-semibold">24h/24 — 7j/7</li>
              </ul>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-yellow text-yellow-foreground font-semibold text-sm hover:scale-105 transition"
              >
                <MessageCircle className="w-4 h-4" /> Chatter
              </a>

              {/* Suivez-nous footer */}
              <div className="mt-6">
                <h4 className="font-display font-bold mb-3 text-sm">Suivez-nous</h4>
                <div className="flex gap-2">
                  {[
                    { href: SOCIAL_LINKS.facebook, icon: Facebook, label: "Facebook" },
                    { href: SOCIAL_LINKS.tiktok, icon: TikTokIcon, label: "TikTok" },
                    { href: SOCIAL_LINKS.instagram, icon: Instagram, label: "Instagram" },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground transition-all duration-300 hover:scale-110 text-xs font-bold"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
            <p>© 2026 NésorKaba Delivery — Fondée par Yevuyibor Kodjo Michael. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-yellow transition">Mentions légales</a>
              <a href="#" className="hover:text-yellow transition">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Global animations ── */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.7s ease both;
        }
      `}</style>
    </div>
  );
}