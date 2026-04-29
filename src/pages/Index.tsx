import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

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

const catalogItems = [
  { id: 1, name: "Стол «Монако»", category: "stoly", material: "Массив дуба, латунь", price: "от 185 000 ₽", image: HERO_IMG, tag: "Новинка" },
  { id: 2, name: "Шкаф «Версаль»", category: "korpusnaya", material: "Орех, золотая фурнитура", price: "от 320 000 ₽", image: GALLERY_IMG1, tag: "Хит" },
  { id: 3, name: "Стол «Флоренция»", category: "stoly", material: "Мрамор, нержавеющая сталь", price: "от 240 000 ₽", image: GALLERY_IMG2, tag: null },
  { id: 4, name: "Гардероб «Империал»", category: "korpusnaya", material: "Венге, латунные ручки", price: "от 450 000 ₽", image: HERO_IMG, tag: "Премиум" },
  { id: 5, name: "Обеденный стол «Рим»", category: "stoly", material: "Каменный шпон, массив", price: "от 195 000 ₽", image: GALLERY_IMG1, tag: null },
  { id: 6, name: "Комод «Барселона»", category: "korpusnaya", material: "Ясень, бронзовая фурнитура", price: "от 280 000 ₽", image: GALLERY_IMG2, tag: "Эксклюзив" },
];

const services = [
  { icon: "Palette", title: "Дизайн-проект", desc: "Полная разработка концепции интерьера от эскиза до 3D-визуализации с авторским надзором.", price: "от 3 000 ₽/м²" },
  { icon: "MessageSquare", title: "Консультация", desc: "Индивидуальная встреча с ведущим дизайнером студии для подбора мебели и материалов.", price: "Бесплатно" },
  { icon: "Truck", title: "Доставка", desc: "Бережная упаковка и доставка белой перчаткой в любую точку России.", price: "Рассчитывается" },
  { icon: "Wrench", title: "Сборка и монтаж", desc: "Профессиональный монтаж вашей мебели командой опытных специалистов студии.", price: "от 5 000 ₽" },
];

const projects = [
  { title: "Резиденция «Тверская»", location: "Москва", area: "420 м²", image: GALLERY_IMG1, style: "Классика" },
  { title: "Апартаменты «Невский»", location: "Санкт-Петербург", area: "210 м²", image: GALLERY_IMG2, style: "Ар-деко" },
  { title: "Вилла «Азур»", location: "Сочи", area: "680 м²", image: HERO_IMG, style: "Современная классика" },
];

const articles = [
  { date: "18 апреля 2026", category: "Тренды", title: "Золото возвращается: тенденции роскошного интерьера 2026", excerpt: "Золотые акценты, тёмное дерево и мрамор — главные материалы сезона." },
  { date: "05 апреля 2026", category: "Материалы", title: "Массив против шпона: что выбрать для вашего дома", excerpt: "Разбираем отличия, преимущества и долговечность натуральных пород дерева." },
  { date: "22 марта 2026", category: "Дизайн", title: "Ар-деко в современном интерьере: геометрия роскоши", excerpt: "Как вплести эстетику 1920-х в актуальное пространство без китча." },
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
  const [catalogFilter, setCatalogFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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

  const filtered = catalogFilter === "all" ? catalogItems : catalogItems.filter((i) => i.category === catalogFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark)", color: "var(--cream)" }}>

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "rgba(15,12,8,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="font-display text-2xl tracking-[0.15em]" style={{ color: "var(--gold)" }}>ЭкоДрев</div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollTo(item.section)}
                className="font-body text-xs tracking-[0.12em] uppercase transition-colors duration-200"
                style={{ color: activeNav === item.section ? "var(--gold)" : "rgba(240,232,213,0.6)" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block font-body text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300"
            style={{ border: "1px solid var(--gold)", color: "var(--gold)", backgroundColor: "transparent" }}
            onMouseEnter={e => { const b = e.target as HTMLButtonElement; b.style.backgroundColor = "var(--gold)"; b.style.color = "var(--dark)"; }}
            onMouseLeave={e => { const b = e.target as HTMLButtonElement; b.style.backgroundColor = "transparent"; b.style.color = "var(--gold)"; }}
          >
            Консультация
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--gold)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ backgroundColor: "var(--dark-mid)" }}>
            {navItems.map((item) => (
              <button key={item.section} onClick={() => scrollTo(item.section)}
                className="text-left font-body text-sm tracking-[0.1em] uppercase py-2"
                style={{ color: activeNav === item.section ? "var(--gold)" : "rgba(240,232,213,0.7)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

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
              Авторская мебель · Бузулук · С 2008 года
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light leading-[0.9] mb-8" style={{ animation: "fadeInUp 0.8s 0.4s both" }}>
              Мебель,<br /><em className="italic" style={{ color: "var(--gold)" }}>созданная</em><br />для вечности
            </h1>
            <div className="gold-line w-24 mb-8" style={{ animation: "fadeInUp 0.8s 0.55s both" }} />
            <p className="font-body text-sm leading-relaxed mb-10 max-w-md" style={{ color: "rgba(240,232,213,0.68)", animation: "fadeInUp 0.8s 0.65s both" }}>
              Авторские коллекции из редких пород дерева, мрамора и металла. Каждое изделие — это история, рассказанная мастером.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" style={{ animation: "fadeInUp 0.8s 0.8s both" }}>
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
            {[["18+", "лет опыта"], ["340+", "проектов"], ["98%", "довольных клиентов"]].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-3xl font-light" style={{ color: "var(--gold)" }}>{num}</p>
                <p className="font-body text-xs tracking-[0.1em] uppercase" style={{ color: "rgba(240,232,213,0.5)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24" style={{ backgroundColor: "var(--dark-mid)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <p className="font-body text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>Ассортимент</p>
                <h2 className="font-display text-5xl md:text-6xl font-light">Каталог мебели</h2>
              </div>
              <div className="flex gap-3 flex-wrap">
                {[["all", "Все"], ["stoly", "Столы"], ["korpusnaya", "Корпусная"]].map(([val, label]) => (
                  <button key={val} onClick={() => setCatalogFilter(val)}
                    className="font-body text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-200"
                    style={{
                      border: "1px solid",
                      borderColor: catalogFilter === val ? "var(--gold)" : "rgba(201,168,76,0.3)",
                      color: catalogFilter === val ? "var(--dark)" : "var(--gold)",
                      backgroundColor: catalogFilter === val ? "var(--gold)" : "transparent",
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <AnimatedSection key={item.id}>
                <div className="luxury-card group cursor-pointer overflow-hidden" style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.1)" }}>
                  <div className="relative overflow-hidden" style={{ height: "260px" }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,8,0.8) 0%, transparent 60%)" }} />
                    {item.tag && (
                      <span className="absolute top-4 left-4 font-body text-xs tracking-[0.15em] uppercase px-3 py-1" style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-light mb-1">{item.name}</h3>
                    <p className="font-body text-xs tracking-wide mb-4" style={{ color: "rgba(240,232,213,0.5)" }}>{item.material}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm" style={{ color: "var(--gold)" }}>{item.price}</span>
                      <span className="font-body text-xs tracking-[0.1em] uppercase flex items-center gap-1.5" style={{ color: "rgba(240,232,213,0.5)" }}>
                        Подробнее <Icon name="ArrowRight" size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

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
                  <div className="mb-6 w-12 h-12 flex items-center justify-center" style={{ border: "1px solid var(--gold-dark)" }}>
                    <Icon name={s.icon} fallback="Star" size={20} style={{ color: "var(--gold)" }} />
                  </div>
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
                    <p className="font-body text-xs" style={{ color: "rgba(240,232,213,0.5)" }}>{p.location} · {p.area}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24" style={{ backgroundColor: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="font-body text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>Знания</p>
                <h2 className="font-display text-5xl md:text-6xl font-light">Журнал ЭкоДрев</h2>
              </div>
              <button className="font-body text-xs tracking-[0.15em] uppercase flex items-center gap-2 self-start md:self-end" style={{ color: "var(--gold)" }}>
                Все статьи <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((a) => (
              <AnimatedSection key={a.title}>
                <article className="luxury-card p-8 cursor-pointer h-full group" style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.1)" }}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-body text-xs tracking-[0.1em] uppercase px-2 py-1" style={{ backgroundColor: "rgba(201,168,76,0.1)", color: "var(--gold)" }}>{a.category}</span>
                    <span className="font-body text-xs" style={{ color: "rgba(240,232,213,0.35)" }}>{a.date}</span>
                  </div>
                  <h3 className="font-display text-2xl font-light mb-4 transition-colors duration-200" style={{ lineHeight: "1.2" }}>{a.title}</h3>
                  <p className="font-body text-xs leading-relaxed mb-6" style={{ color: "rgba(240,232,213,0.5)" }}>{a.excerpt}</p>
                  <div className="flex items-center gap-2" style={{ color: "var(--gold)" }}>
                    <span className="font-body text-xs tracking-[0.1em] uppercase">Читать</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ backgroundColor: "var(--dark-mid)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <p className="font-body text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>Свяжитесь с нами</p>
                <h2 className="font-display text-5xl md:text-6xl font-light mb-6">Начните<br /><em className="italic">ваш проект</em></h2>
                <div className="gold-line w-20 mb-8" />
                <div className="space-y-6">
                  {[
                    { icon: "MapPin", label: "Адрес", val: "Москва, Тверская ул., 12" },
                    { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                    { icon: "Mail", label: "Email", val: "hello@maison-furniture.ru" },
                    { icon: "Clock", label: "Часы работы", val: "Пн–Сб: 10:00–20:00" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
                        <Icon name={c.icon} fallback="Info" size={16} style={{ color: "var(--gold)" }} />
                      </div>
                      <div>
                        <p className="font-body text-xs tracking-[0.1em] uppercase mb-0.5" style={{ color: "rgba(240,232,213,0.4)" }}>{c.label}</p>
                        <p className="font-body text-sm" style={{ color: "var(--cream)" }}>{c.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="p-10" style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.15)" }}>
                {formSent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{ border: "1px solid var(--gold)" }}>
                      <Icon name="Check" size={28} style={{ color: "var(--gold)" }} />
                    </div>
                    <h3 className="font-display text-3xl font-light mb-3">Заявка отправлена</h3>
                    <p className="font-body text-sm" style={{ color: "rgba(240,232,213,0.5)" }}>Мы свяжемся с вами в течение 24 часов</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-3xl font-light mb-8">Получить консультацию</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {[
                        { key: "name", label: "Ваше имя", type: "text", placeholder: "Иван Петров" },
                        { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="font-body text-xs tracking-[0.1em] uppercase block mb-2" style={{ color: "rgba(240,232,213,0.5)" }}>{field.label}</label>
                          <input
                            type={field.type} placeholder={field.placeholder} required
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                            className="w-full font-body text-sm px-4 py-3 outline-none transition-colors duration-200"
                            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--cream)" }}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="font-body text-xs tracking-[0.1em] uppercase block mb-2" style={{ color: "rgba(240,232,213,0.5)" }}>Сообщение</label>
                        <textarea
                          rows={4} placeholder="Расскажите о вашем проекте..."
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                          className="w-full font-body text-sm px-4 py-3 outline-none resize-none transition-colors duration-200"
                          style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--cream)" }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full font-body text-xs tracking-[0.2em] uppercase py-4 transition-all duration-300"
                        style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}
                        onMouseEnter={e => (e.target as HTMLButtonElement).style.backgroundColor = "var(--gold-light)"}
                        onMouseLeave={e => (e.target as HTMLButtonElement).style.backgroundColor = "var(--gold)"}
                      >
                        Отправить заявку
                      </button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10" style={{ backgroundColor: "var(--dark)", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-xl tracking-[0.15em]" style={{ color: "var(--gold)" }}>ЭкоДрев</div>
          <p className="font-body text-xs" style={{ color: "rgba(240,232,213,0.3)" }}>© 2026 ЭкоДрев, Бузулук. Все права защищены.</p>
          <div className="flex items-center gap-6">
            {["ВКонтакте", "Telegram", "Pinterest"].map((s) => (
              <button key={s} className="font-body text-xs tracking-[0.1em] uppercase transition-colors duration-200"
                style={{ color: "rgba(240,232,213,0.4)" }}
                onMouseEnter={e => (e.target as HTMLButtonElement).style.color = "var(--gold)"}
                onMouseLeave={e => (e.target as HTMLButtonElement).style.color = "rgba(240,232,213,0.4)"}
              >{s}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}