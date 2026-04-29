import { createFileRoute } from "@tanstack/react-router";
import {
  Package, UtensilsCrossed, Zap, FileText, ShoppingBag,
  Clock, Shield, Wallet, Calendar,
  ClipboardList, Bike, Truck, MapPin,
  Phone, Mail, MessageCircle, ArrowRight, Star,
  Facebook,
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
  { name: "Aïcha M.", role: "Cliente fidèle", text: "Service impeccable, livraison toujours à l'heure. Je recommande vivement !" },
  { name: "Kodjo B.", role: "Restaurateur", text: "Grâce à NésorKaba, mes plats arrivent chauds chez mes clients. Partenaire de confiance." },
  { name: "Sophie L.", role: "Entrepreneure", text: "Rapides, professionnels et abordables. Indispensables pour mon activité." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 font-display font-bold text-lg">
            <img src={logo} alt="NésorKaba Delivery" className="w-10 h-10 rounded-full object-cover" />
            <span className="hidden sm:inline">NésorKaba</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="hover:text-yellow transition">Services</a>
            <a href="#avantages" className="hover:text-yellow transition">Avantages</a>
            <a href="#fonctionnement" className="hover:text-yellow transition">Fonctionnement</a>
            <a href="#contact" className="hover:text-yellow transition">Contact</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:scale-105 transition">
            Commander <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-yellow/30 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium mb-6 animate-fade-up" style={{ animationDelay: "0.05s" }}>
              <span className="w-2 h-2 rounded-full bg-yellow animate-pulse" />
              NésorKaba Delivery — 7j/7, 24h/24
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Commandez aujourd'hui, <span className="relative inline-block">
                <span className="relative z-10">recevez</span>
                <span className="absolute inset-x-0 bottom-1 h-4 bg-yellow -z-0" />
              </span> sans attendre
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg animate-fade-up" style={{ animationDelay: "0.3s" }}>
              NésorKaba, votre service de livraison à Lomé — Baguida.
              Repas, colis, courses ou documents acheminés rapidement, 7j/7.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
              <a href="https://wa.me/22870074420" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-yellow text-yellow-foreground font-semibold shadow-[0_10px_40px_-10px_var(--yellow)] hover:scale-105 hover:shadow-[0_15px_50px_-10px_var(--yellow)] transition">
                Commander maintenant <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-foreground font-semibold hover:bg-foreground hover:text-background transition">
                Nous contacter
              </a>
            </div>
            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-border animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <div><div className="text-3xl font-display font-bold">10K+</div><div className="text-xs text-muted-foreground">Livraisons</div></div>
              <div className="w-px h-10 bg-border" />
              <div><div className="text-3xl font-display font-bold">30min</div><div className="text-xs text-muted-foreground">Délai moyen</div></div>
              <div className="w-px h-10 bg-border" />
              <div><div className="text-3xl font-display font-bold">4.9★</div><div className="text-xs text-muted-foreground">Satisfaction</div></div>
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
              className="relative rounded-[2rem] object-contain w-full h-auto max-h-[600px] bg-background shadow-[0_20px_50px_-20px_oklch(0.13_0_0/0.25)] animate-float-slow"
            />
            <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-2xl p-4 shadow-xl animate-float-slow flex items-center gap-3">
              <img src={logo} alt="" className="w-12 h-12 rounded-full" />
              <div>
                <div className="text-xs text-muted-foreground">NésorKaba Delivery</div>
                <div className="font-bold text-sm">En route…</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Nos services</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Tout ce que vous devez livrer, on le fait.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className="group bg-background rounded-2xl p-8 border border-border hover:border-yellow hover:-translate-y-1 transition-all duration-300" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-14 h-14 rounded-xl bg-yellow/20 flex items-center justify-center mb-5 group-hover:bg-yellow transition">
                  <s.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-yellow uppercase tracking-wider">Pourquoi NésorKaba</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
                Une expérience de livraison <span className="text-yellow">sans compromis</span>.
              </h2>
              <p className="text-background/70 text-lg">
                Nous combinons technologie, équipe expérimentée et service client irréprochable
                pour transformer chaque livraison en une expérience premium.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {advantages.map((a) => (
                <div key={a.title} className="bg-background/5 backdrop-blur border border-background/10 rounded-2xl p-6 hover:bg-yellow hover:text-yellow-foreground transition group">
                  <a.icon className="w-8 h-8 mb-4 text-yellow group-hover:text-yellow-foreground" />
                  <h3 className="font-display text-lg font-bold mb-1">{a.title}</h3>
                  <p className="text-sm opacity-70">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section id="fonctionnement" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Comment ça marche</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">4 étapes simples</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="bg-background border border-border rounded-2xl p-8 hover:shadow-xl hover:border-yellow transition h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center">
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
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Témoignages</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Ils nous font confiance</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-background rounded-2xl p-8 border border-border hover:shadow-lg transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-yellow rounded-[2rem] p-12 md:p-16 overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-yellow-foreground/10" />
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
                <a href="https://wa.me/22870074420" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-background text-foreground font-semibold hover:scale-105 transition">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <div className="flex gap-3 mt-4">
                <a href="https://facebook.com/NesorKabaDelivery" aria-label="Facebook" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://tiktok.com/@nesorkaba_delivery.tg" aria-label="TikTok" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-yellow hover:text-yellow-foreground transition text-xs font-bold">
                  TT
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-background/70">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-yellow shrink-0" /><span>+228 70 07 44 20</span></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-yellow shrink-0" /><span>+228 96 36 27 47</span></li>
                <li className="flex items-center gap-3"><MessageCircle className="w-4 h-4 text-yellow shrink-0" /><span>WhatsApp 24/7</span></li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-yellow shrink-0" /><span>contact@nesorkaba.tg</span></li>
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-yellow shrink-0 mt-0.5" /><span>Baguida, Lomé — Togo</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>Livraison de repas</li>
                <li>Livraison de colis</li>
                <li>Livraison express</li>
                <li>Livraison de documents</li>
                <li>Livraison de courses</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-4">Horaires</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>Lundi — Dimanche</li>
                <li className="text-yellow font-semibold">24h/24 — 7j/7</li>
              </ul>
              <a href="https://wa.me/22870074420" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-yellow text-yellow-foreground font-semibold text-sm hover:scale-105 transition">
                <MessageCircle className="w-4 h-4" /> Chatter
              </a>
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
    </div>
  );
}
