import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";
import Navbar from "@/components/Navbar";
import CatalogSection, { CatalogModal, catalogItems, type CatalogItem } from "@/components/CatalogSection";
import BlogSection, { ArticleModal, type Article } from "@/components/BlogSection";
import ContactsSection from "@/components/ContactsSection";

const HERO_IMG = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/a6e923ee-b5b5-4f63-98be-5e054280b501.jpg";
const GALLERY_IMG1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/ca601452-70eb-402e-af48-8e4c57c758fa.jpg";
const GALLERY_IMG2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/55e66285-1780-4050-84eb-841d674e9f70.jpg";

const navItems = [
  { label: "Главная", section: "hero" },
  { label: "Каталог", section: "catalog" },
  { label: "Услуги", section: "services" },
  { label: "Проекты", section: "projects" },
  { label: "Блог", section: "blog" },
  { label: "Контакты", section: "contacts" },
];

const services = [
  { icon: "Palette", title: "Дизайн-проект", desc: "Полная разработка концепции от эскиза до 3D-визуализации с авторским надзором бесплатно.", price: "Бесплатно", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/8d680a66-ab03-43d6-8edf-63893c1a1165.jpeg" },
  { icon: "MessageSquare", title: "Консультация", desc: "Индивидуальная встреча с ведущим дизайнером студии для подбора мебели и материалов.", price: "Бесплатно", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/8332e325-027c-4018-8482-f42b79005668.jpeg" },
  { icon: "Truck", title: "Доставка", desc: "Бережная упаковка и доставка белой перчаткой в любую точку России. Доставка по городу Бузулук бесплатно. По Оренбургской области и другим регионам РФ рассчитывается.", price: "Бузулук — бесплатно", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/8332e325-027c-4018-8482-f42b79005668.jpeg" },
  { icon: "Wrench", title: "Сборка и монтаж", desc: "Профессиональный монтаж вашей мебели командой опытных специалистов студии.", price: "Бесплатно", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/8332e325-027c-4018-8482-f42b79005668.jpeg" },
  { icon: "CreditCard", title: "Рассрочка", desc: "Ремонт несёт с собой большие траты. Это часто приводит к тому, что переезд затягивается. Зная это, мы добавили возможность покупки в рассрочку на 3 месяца без процентов и переплат.", price: "0% на 3 месяца", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/9b5dc2fb-3371-4c40-8493-e58359bc17e2.jpg" },
];

const projects = [
  { title: "Стол «Элегия»", location: "", area: "", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/254050d2-95ca-4817-af94-f574cb8b9383.jpg", style: "Современная", desc: "" },
  { title: "Стол «Мелодия лофта»", location: "", area: "", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/6842dff2-3ab3-4b93-b3d8-f3baf607a639.png", style: "Лофт", desc: "" },
];

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<{ item: CatalogItem; photoIndex: number; showVideo: boolean } | null>(null);
  const [articleModal, setArticleModal] = useState<Article | null>(null);

  const openModal = useCallback((item: CatalogItem, photoIndex = 0) => {
    setModal({ item, photoIndex, showVideo: false });
    const url = new URL(window.location.href);
    url.searchParams.set("item", String(item.id));
    window.history.replaceState(null, "", url.toString());
  }, []);

  const closeModal = () => {
    setModal(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("item");
    window.history.replaceState(null, "", url.toString());
  };

  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("item");
    if (itemId) {
      const found = catalogItems.find((c) => String(c.id) === itemId);
      if (found) openModal(found, 0);
    }
  }, [openModal]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveNav(e.target.id); }); },
      { threshold: 0.4 }
    );
    navItems.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark)", color: "var(--cream)" }}>

      <Navbar
        activeNav={activeNav}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,12,8,0.93) 40%, rgba(15,12,8,0.35) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,8,0.75) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-16">
          <div className="max-w-2xl">
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--gold)", animation: "fadeInUp 0.8s 0.2s both" }}>
              Авторская мебель · Бузулук · С 2000 года
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light leading-[0.9] mb-8" style={{ animation: "fadeInUp 0.8s 0.4s both" }}>
              Мебель,<br />
              <em className="italic">с которой</em><br />
              мечты сбываются
            </h1>
            <p className="font-body text-sm leading-relaxed mb-10 max-w-md" style={{ color: "rgba(240,232,213,0.7)", animation: "fadeInUp 0.8s 0.6s both" }}>
              Каждое изделие — результат диалога между заказчиком и мастером. Мы создаём мебель, которая живёт в интерьере как произведение искусства.
            </p>
            <div className="flex gap-4 flex-wrap" style={{ animation: "fadeInUp 0.8s 0.8s both" }}>
              <button
                onClick={() => scrollTo("catalog")}
                className="font-body text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
                style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}
                onMouseEnter={e => (e.target as HTMLButtonElement).style.backgroundColor = "var(--gold-light)"}
                onMouseLeave={e => (e.target as HTMLButtonElement).style.backgroundColor = "var(--gold)"}
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("projects")}
                className="font-body text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
                style={{ border: "1px solid rgba(240,232,213,0.3)", color: "var(--cream)", backgroundColor: "transparent" }}
                onMouseEnter={e => { const b = e.target as HTMLButtonElement; b.style.borderColor = "var(--gold)"; b.style.color = "var(--gold)"; }}
                onMouseLeave={e => { const b = e.target as HTMLButtonElement; b.style.borderColor = "rgba(240,232,213,0.3)"; b.style.color = "var(--cream)"; }}
              >
                Наши проекты
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ animation: "fadeInUp 0.8s 1.0s both" }}>
          <div className="max-w-7xl mx-auto px-6 pb-10 flex gap-12">
            {[["25+", "лет опыта"], ["340+", "проектов"], ["98%", "довольных клиентов"]].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-3xl font-light" style={{ color: "var(--gold)" }}>{num}</p>
                <p className="font-body text-xs tracking-[0.1em] uppercase" style={{ color: "rgba(240,232,213,0.5)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" className="py-24" style={{ backgroundColor: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-body text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>Из чего мы делаем</p>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-4">Мебель из лучших материалов</h2>
              <div className="gold-line w-24 mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <AnimatedSection>
              <div className="p-10 h-full" style={{ border: "1px solid rgba(201,168,76,0.2)", backgroundColor: "var(--dark-card)" }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <Icon name="Trees" size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-display text-3xl font-light mb-4" style={{ color: "var(--gold)" }}>Натуральные породы дерева</h3>
                <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(240,232,213,0.65)" }}>
                  Используем массив дуба, ясеня, карагача, берёзы, липы. Каждая доска тщательно отбирается вручную — только однородная текстура, без сучков и дефектов.
                </p>
                <ul className="flex flex-col gap-3">
                  {["Дуб — прочность и благородство текстуры", "Ясень — лёгкость и выразительный рисунок", "Карагач — тёплый тон, элитный сегмент", "Берёза — доступность и природный аромат", "Липа — эстетичность и отсутствие аллергенных смол"].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: "rgba(240,232,213,0.75)" }}>
                      <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="p-10 h-full" style={{ border: "1px solid rgba(201,168,76,0.2)", backgroundColor: "var(--dark-card)" }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <Icon name="Layers" size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-display text-3xl font-light mb-4" style={{ color: "var(--gold)" }}>МДФ</h3>
                <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(240,232,213,0.65)" }}>
                  МДФ — современный плитный материал высокой плотности. Отлично подходит для фасадов, декоративных элементов и корпусной мебели. Идеальная поверхность под покраску и шпон.
                </p>
                <ul className="flex flex-col gap-3">
                  {["Однородная структура без деформаций", "Гладкая поверхность — идеально под покраску", "Устойчивость к влаге (влагостойкий МДФ)", "Доступная цена при высоком качестве"].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: "rgba(240,232,213,0.75)" }}>
                      <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="p-10 h-full" style={{ border: "1px solid rgba(201,168,76,0.2)", backgroundColor: "var(--dark-card)" }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <Icon name="PanelTop" size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-display text-3xl font-light mb-4" style={{ color: "var(--gold)" }}>ЛДСП премиум-класса Ламарти</h3>
                <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(240,232,213,0.65)" }}>
                  Ламинированная древесностружечная плита премиум-класса с трёхслойной структурой и плотностью, приближенной к МДФ.
                </p>
                <ul className="flex flex-col gap-3">
                  {["Экологичность — ламинированная плита премиум-класса", "Качество — трёхслойные, плотность близка к МДФ", "Эстетичность — различные варианты структур и тиснений"].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: "rgba(240,232,213,0.75)" }}>
                      <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <CatalogSection onOpenModal={openModal} />

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ backgroundColor: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="font-body text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>Что мы предлагаем</p>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-6">Наши услуги</h2>
              <div className="gold-line w-20 mx-auto" />
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <AnimatedSection key={s.title}>
                <div className="luxury-card p-8 h-full group cursor-pointer" style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.1)" }}>
                  {s.image ? (
                    <div className="mb-6 flex items-center justify-center h-16">
                      <img src={s.image} alt={s.title} className="max-h-16 max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="mb-6 w-12 h-12 flex items-center justify-center" style={{ border: "1px solid var(--gold-dark)" }}>
                      <Icon name={s.icon} fallback="Star" size={20} style={{ color: "var(--gold)" }} />
                    </div>
                  )}
                  <h3 className="font-display text-2xl font-light mb-3">{s.title}</h3>
                  <p className="font-body text-xs leading-relaxed mb-6" style={{ color: "rgba(240,232,213,0.55)" }}>{s.desc}</p>
                  <p className="font-body text-sm font-medium" style={{ color: "var(--gold)" }}>{s.price}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24" style={{ backgroundColor: "var(--dark-mid)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="font-body text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>Портфолио</p>
                <h2 className="font-display text-5xl md:text-6xl font-light">Реализованные<br /><em className="italic">проекты</em></h2>
              </div>
              <p className="font-body text-xs leading-relaxed max-w-xs" style={{ color: "rgba(240,232,213,0.5)" }}>
                Каждый объект — диалог между архитектурой пространства и характером владельца.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <AnimatedSection key={p.title}>
                <div className="luxury-card group cursor-pointer overflow-hidden relative" style={{ height: "480px" }}>
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,8,0.95) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="font-body text-xs tracking-[0.15em] uppercase px-3 py-1 mb-4 inline-block" style={{ border: "1px solid rgba(201,168,76,0.5)", color: "var(--gold)" }}>{p.style}</span>
                    <h3 className="font-display text-2xl font-light mb-1">{p.title}</h3>
                    <p className="font-body text-xs mb-2" style={{ color: "rgba(240,232,213,0.5)" }}>{p.location}{p.area ? ` · ${p.area}` : ""}</p>
                    {p.desc && <p className="font-body text-xs leading-relaxed" style={{ color: "rgba(240,232,213,0.7)" }}>{p.desc}</p>}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <BlogSection onOpenArticle={setArticleModal} />

      <ContactsSection />

      <CatalogModal modal={modal} setModal={setModal} closeModal={closeModal} />
      <ArticleModal article={articleModal} onClose={() => setArticleModal(null)} />
    </div>
  );
}