import { useState, useEffect, useRef, useCallback } from "react";

const materialData = [
  {
    icon: "Trees",
    image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/9f1fcc6a-ea57-4baf-a085-1fab4a3b2b43.jpg",
    title: "Натуральные породы дерева",
    short: "Используем массив дуба, ясеня, карагача, берёзы, липы. Каждая доска тщательно отбирается вручную — только однородная текстура, без сучков и дефектов.",
    items: ["Дуб — прочность и благородство текстуры", "Ясень — лёгкость и выразительный рисунок", "Карагач — тёплый тон, элитный сегмент", "Берёза — доступность и природный аромат", "Липа — эстетичность и отсутствие аллергенных смол"],
    details: "Натуральное дерево — это живой материал с уникальной текстурой, который становится красивее с годами. Мы работаем только с сертифицированной древесиной из контролируемых источников. Каждая заготовка проходит камерную сушку до 8–12% влажности — это гарантирует, что мебель не поведёт и не треснет со временем. Массив дуба выдерживает нагрузки в 10–15 лет интенсивной эксплуатации без потери формы. Карагач и ясень — материалы элитного сегмента, редкие в производстве и высоко ценимые за выразительный рисунок. Берёза и липа — экономичные альтернативы с отличными физическими свойствами для детской и спальной мебели.",
  },
  {
    icon: "Layers",
    image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/57d87536-299c-4c03-b5dd-0ea8a8c8a8bd.jpg",
    title: "МДФ",
    short: "МДФ — современный плитный материал высокой плотности. Отлично подходит для фасадов, декоративных элементов и корпусной мебели. Идеальная поверхность под покраску и шпон.",
    items: ["Однородная структура без деформаций", "Гладкая поверхность — идеально под покраску", "Устойчивость к влаге (влагостойкий МДФ)", "Доступная цена при высоком качестве"],
    details: "МДФ (Medium Density Fiberboard) — это прессованная древесноволокнистая плита плотностью 700–800 кг/м³. Благодаря однородной структуре материал отлично фрезеруется, позволяя создавать сложные фигурные фасады, радиусные углы и декоративные рельефы. Поверхность МДФ не имеет пор, поэтому краска ложится идеально гладко — без шлифовки между слоями. Мы используем влагостойкий МДФ для кухонных фасадов и мебели в ванных комнатах. Экологический класс эмиссии E1 — безопасен для жилых помещений и детских комнат. Толщина плит: 16, 18, 19, 22 мм — под любую задачу.",
  },
  {
    icon: "PanelTop",
    image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/1b2e7585-f4db-416d-bc1b-6aeff90248a4.jpg",
    title: "ЛДСП премиум-класса Ламарти",
    short: "Ламинированная древесностружечная плита премиум-класса с трёхслойной структурой и плотностью, приближенной к МДФ.",
    items: ["Экологичность — ламинированная плита премиум-класса", "Качество — трёхслойные, плотность близка к МДФ", "Эстетичность — различные варианты структур и тиснений"],
    details: "Ламарти — это ЛДСП европейского производства, которое принципиально отличается от дешёвых аналогов. Трёхслойная структура: мелкодисперсный наполнитель в центре и плотные слои снаружи — обеспечивает плотность 680–720 кг/м³, что сопоставимо с МДФ. Ламинирующее покрытие толщиной 0,4–0,6 мм наносится под давлением — оно не отслаивается и устойчиво к царапинам. Палитра: более 200 декоров, включая имитации дерева, камня, ткани и однотонные матовые цвета. Класс эмиссии E1 (формальдегид < 8 мг/100 г). Идеально для корпусной мебели, гардеробных систем и мебели для офиса.",
  },
  {
    icon: "AlignVerticalJustifyCenter",
    image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/bd37fee4-9053-4b7d-b58b-63653d1b47e4.jpg",
    title: "Ламель",
    short: "Ламели — это спил определённой породы дерева толщиной, как правило, 5 мм, из которых изготавливается столешница.",
    items: ["Устойчива к изменениям температуры и влажности", "Ширина 100–170 мм — выраженная, насыщенная, богатая текстура", "Доступная цена по сравнению с массивом"],
    details: "Ламель — это тонкий спил определённой породы дерева толщиной, как правило, 5 мм, из которых собирается столешница. Благодаря своей структуре ламель устойчива к изменениям температуры и влажности — столешница не поведёт и не растрескается со временем. Ширина ламелей составляет 100–170 мм, что даёт более выраженную, насыщенную и богатую текстуру дерева по сравнению с узкими планками. При этом ламель — доступная по цене альтернатива массиву дерева, сохраняющая природную красоту и прочность натуральной древесины.",
  },
];

function MaterialCards() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {materialData.map((mat, idx) => (
        <div key={mat.title} className="flex flex-col" style={{ border: "1px solid rgba(201,168,76,0.2)", backgroundColor: "var(--dark-card)" }}>
          <div className="w-full h-48 overflow-hidden">
            <img src={mat.image} alt={mat.title} className="w-full h-full object-cover" style={{ filter: "brightness(0.85)" }} />
          </div>
          <div className="p-10 flex flex-col flex-1">
          <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <Icon name={mat.icon} size={22} style={{ color: "var(--gold)" }} />
          </div>
          <h3 className="font-display text-3xl font-light mb-4" style={{ color: "var(--gold)" }}>{mat.title}</h3>
          <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(240,232,213,0.65)" }}>{mat.short}</p>
          <ul className="flex flex-col gap-3 mb-6">
            {mat.items.map((item) => (
              <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: "rgba(240,232,213,0.75)" }}>
                <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>—</span>
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="mt-auto flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200"
            style={{ color: "var(--gold)" }}
          >
            {openIdx === idx ? "Скрыть" : "Подробнее"}
            <Icon name={openIdx === idx ? "ChevronUp" : "ChevronDown"} size={14} style={{ color: "var(--gold)" }} />
          </button>
          {openIdx === idx && (
            <div className="mt-5 pt-5 font-body text-sm leading-relaxed" style={{ borderTop: "1px solid rgba(201,168,76,0.2)", color: "rgba(240,232,213,0.75)" }}>
              {mat.details}
            </div>
          )}
          </div>
        </div>
      ))}
    </div>
  );
}
import Icon from "@/components/ui/icon";
import Navbar from "@/components/Navbar";
import CatalogSection, { CatalogModal, catalogItems, type CatalogItem } from "@/components/CatalogSection";
import BlogSection, { ArticleModal, type Article } from "@/components/BlogSection";
import ContactsSection from "@/components/ContactsSection";

const HERO_IMG = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/d6272c82-5119-42fb-97d9-f62ea911f7ce.jpg";
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
  { title: "Журнальный столик «Юнона»", location: "", area: "", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/b4b74c5c-91cd-447b-95ae-6b7e667c13d6.jpg", style: "Классика", desc: "" },
  { title: "Стол «Архитектоника»", location: "", area: "", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/ae6cb983-971e-47cb-ac97-2c89c148819a.jpg", style: "Лофт", desc: "" },
  { title: "Стол классический «Серафима»", location: "", area: "", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/78394aa7-6416-4b2b-9e04-63c5f85e87eb.jpg", style: "Классика", desc: "" },
  { title: "Современный стол", location: "", area: "", image: "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/1288067e-b2b9-42fc-952c-06db2036f221.jpg", style: "Современная", desc: "" },
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
  const [projectPhoto, setProjectPhoto] = useState<{ image: string; title: string } | null>(null);

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
              Столы,<br />
              <em className="italic">создающие</em><br />
              уют
            </h1>
            <p className="font-body text-sm leading-relaxed mb-10 max-w-md" style={{ color: "rgba(240,232,213,0.7)", animation: "fadeInUp 0.8s 0.6s both" }}>
              Каждый стол — результат диалога между заказчиком и мастером. Создаём столы, которые добавляют в интерьер нотки комфорта и эксклюзива.
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

          <MaterialCards />

          <AnimatedSection>
            <div className="mt-16 text-center">
              <p className="font-body text-sm mb-6" style={{ color: "rgba(240,232,213,0.6)" }}>
                Не знаете, какой материал подойдёт для вашего проекта? Мы поможем выбрать.
              </p>
              <button
                onClick={() => scrollTo("contacts")}
                className="font-body text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
                style={{ border: "1px solid var(--gold)", color: "var(--dark)", backgroundColor: "var(--gold)" }}
                onMouseEnter={e => { const b = e.target as HTMLButtonElement; b.style.backgroundColor = "transparent"; b.style.color = "var(--gold)"; }}
                onMouseLeave={e => { const b = e.target as HTMLButtonElement; b.style.backgroundColor = "var(--gold)"; b.style.color = "var(--dark)"; }}
              >
                Получить консультацию по материалам
              </button>
            </div>
          </AnimatedSection>
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
                <div className="luxury-card group cursor-pointer overflow-hidden relative" style={{ height: "480px" }} onClick={() => setProjectPhoto({ image: p.image, title: p.title })}>
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

      {projectPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.92)" }} onClick={() => setProjectPhoto(null)}>
          <button className="absolute top-6 right-6 text-white opacity-70 hover:opacity-100 transition-opacity" onClick={() => setProjectPhoto(null)}>
            <Icon name="X" size={32} />
          </button>
          <img src={projectPhoto.image} alt={projectPhoto.title} className="max-w-full max-h-[90vh] object-contain rounded" onClick={e => e.stopPropagation()} />
          <p className="absolute bottom-6 left-0 right-0 text-center font-display text-lg font-light" style={{ color: "var(--gold)" }}>{projectPhoto.title}</p>
        </div>
      )}

      <BlogSection onOpenArticle={setArticleModal} />

      <ContactsSection />

      <CatalogModal modal={modal} setModal={setModal} closeModal={closeModal} />
      <ArticleModal article={articleModal} onClose={() => setArticleModal(null)} />
    </div>
  );
}