import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/a6e923ee-b5b5-4f63-98be-5e054280b501.jpg";
const GALLERY_IMG1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/ca601452-70eb-402e-af48-8e4c57c758fa.jpg";
const GALLERY_IMG2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/55e66285-1780-4050-84eb-841d674e9f70.jpg";
const LETНИЙ_POLDEN_1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/436bd90b-75c4-4c32-85fa-e9e408648c0d.jpg";
const LETНИЙ_POLDEN_2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/d59057b3-32bf-4d8b-ac20-23ad1886a10f.jpg";
const LISTOPAD_1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/444a5ae2-28fc-422d-823a-100854a7e6b9.jpg";
const LISTOPAD_2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/316772d9-0d51-458a-a831-d5fa38fbafc8.jpg";

const navItems = [
  { label: "Главная", section: "hero" },
  { label: "Каталог", section: "catalog" },
  { label: "Услуги", section: "services" },
  { label: "Проекты", section: "projects" },
  { label: "Блог", section: "blog" },
  { label: "Контакты", section: "contacts" },
];

const catalogItems = [
  { id: 14, name: "Журнальный столик «Лофт»", category: "stoly", material: "Массив дуба, металлокаркас", price: "17 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/b1dd8949-6cdb-44ca-baf2-b6744ff01342.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/0f47247f-0bc7-4f8d-8400-4ef40150ed70.png"], tag: "Лофт", desc: "Журнальный квадратный столик в стиле лофт — это не просто мебель, а настоящий акцент вашего интерьера. Объединяет в себе: индустриальную эстетику — сочетание металла и дерева создаёт ощущение пространства и свободы; функциональность — идеален для хранения журналов, чашки кофе или декора; универсальность — легко вписывается как в современные, так и в классические интерьеры. Особенности: опора — металлокаркас; столешница из массива дуба с естественной фактурой; квадратная форма — удобно для любой планировки. Журнальный столик в стиле лофт — это не только практично, но и модно. Он станет центром притяжения в вашей гостиной и подчеркнёт ваш вкус. Отправляем по РФ любыми транспортными компаниями." },
  { id: 13, name: "Стол «Семейный очаг»", category: "stoly", material: "Шпон дуба 5 мм, керамогранит · Премиум", price: "120 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/79bcac5e-9c66-4295-b5ef-65b87d2d47cc.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/002063c4-7cbb-462a-a5de-0579fd5cb528.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/c40ce84a-a24a-4bf7-99a9-32471a95d222.jpg"], tag: "Эксклюзив", desc: "Дизайнерский круглый стол «Семейный очаг» — размышление дизайнера о вечности: круглое основание — это часы, из которых неумолимо бежит время — закруглённые ножки. Круглая столешница с отделкой из шпона дуба 5 мм и керамогранита в центре — символ постоянства бытия (дуб) и едва уловимого обновления (керамогранит). Премиальное качество от производителя. Гарантия до 10 лет. Идеально подойдёт для семейных трапез, когда за одним столом собирается несколько поколений. Уютная кухня; элегантная гостиная; зелень беседки, озарённая солнечными лучами — стол «Семейный очаг» будет органично смотреться везде. Круглый стол — потому что дома нет главных и второстепенных. Доставим по РФ любыми транспортными компаниями. Проконсультируем и подберём стол, который идеально впишется в интерьер." },
  { id: 12, name: "Стол «Мелодия любви»", category: "stoly", material: "Премиальное качество от производителя", price: "40 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/df6c9799-de85-4c37-b041-c17b08382a24.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/0841888b-7b17-4e40-b16d-db3fa65087c1.jpg"], tag: "Премиум", desc: "Изысканный круглый стол «Мелодия любви» — воплощение гармонии и элегантности. Дизайнерская работа: конусное подстолье. Идеален для компании из 4 человек. Круглый стол — это место, где никто не сидит «с краю». «Мелодия любви» — пример эстетики и безупречного вкуса, диалога между традициями и инновациями. Премиальное качество от производителя. Доставим по РФ любыми транспортными компаниями." },
  { id: 11, name: "Стол «Лунная соната»", category: "stoly", material: "Карагач, МДФ · Коллекция 2026", price: "40 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/134f3a3e-8c60-4cb4-aa9f-a8b03d5f1407.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/f58ba5a4-916a-4e47-83b1-6ec263b1cbc3.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/52222ba4-da1a-464c-8751-b98574194b21.jpg"], video: "https://vk.com/video_ext.php?oid=-230847857&id=456239049&hd=2", tag: "Новинка", desc: "Дизайнерский круглый стол «Лунная соната» из коллекции 2026 года. Любите необычное? Тогда этот стол для вас! Подстолье — игра сочетания цветов и материалов: светлая сторона — угловая трапеция карагач; тёмная — трапеция с геометрическими узорами, МДФ. Круглый стол — потому что дома нет главных и второстепенных. Идеален для 4 человек. «Лунная соната» — воплощение теплоты и домашнего уюта, ведь так приятно собираться вокруг стола! Отправляем по РФ любыми транспортными компаниями. Проконсультируем и подберём стол, который идеально впишется в интерьер!" },
  { id: 1, name: "Стол «Листопад»", category: "stoly", material: "Порода дерева на ваш выбор · Коллекция «Осенняя рапсодия»", price: "от 20 000 ₽", images: [LISTOPAD_1, LISTOPAD_2], tag: "Хит", desc: "Стол «Листопад» из коллекции «Осенняя рапсодия». Элегантный, словно парящий в воздухе треугольный столик на трёх ножках манит попить за ним чашечку чая или заняться творчеством. Размер — 160×100 см, высота 76 см. Премиальное качество. Гарантия до 10 лет. Отправляем по РФ любыми транспортными компаниями. Изготовим на заказ по вашим размерам из породы дерева, выбранной вами." },
  { id: 9, name: "Столик «Начало осени»", category: "stoly", material: "Дуб, берёза (порода дерева на ваш выбор) · Коллекция «Осенняя рапсодия»", price: "от 13 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/fa79cbdf-f6d3-40f6-9265-5af41b7acdd2.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/234ef46b-3ccf-49b9-995a-073929588b83.jpg"], tag: "Премиум", desc: "Столик «Начало осени» из коллекции «Осенняя рапсодия». Маленький круглый столик многовариативен: и как журнальный, и как детский. Премиальное качество. Дуб, берёза — порода дерева на ваш выбор. Отправляем по РФ любыми транспортными компаниями. Изготовим на заказ по вашим размерам." },
  { id: 10, name: "Столик «На заре»", category: "stoly", material: "Порода дерева на ваш выбор · Коллекция «Мелодии лета»", price: "от 24 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/cf11c47f-d10b-41cc-bc96-2c7b4ee653c1.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/6ca13ba2-38a2-4301-a8e9-19466c26926f.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/3cb57985-9d16-4b01-bcd7-df20b34832e3.jpg"], tag: "Премиум", desc: "Столик «На заре» из коллекции «Мелодии лета». Очаровательный круглый кофейный столик — чем не повод побаловать себя чашечкой ароматного напитка на заре… Круглый столик как для двух человек, так и для четырёх. Здесь никто не сидит «с краю». Премиальное качество. Изготовим на заказ по вашим размерам из породы дерева, выбранной вами. Доставим по РФ любыми транспортными компаниями." },
  { id: 2, name: "Кофейный столик «Летний полдень»", category: "stoly", material: "Дуб (порода на ваш выбор) · Коллекция «Мелодии лета»", price: "от 11 000 ₽", images: [LETНИЙ_POLDEN_1, LETНИЙ_POLDEN_2], tag: "Премиум", desc: "Лаконичный дизайн, который впишется в любой интерьер. Дарит ощущение лёгкости бытия — удобно для двух человек." },
  { id: 3, name: "Кухня «Комо»", category: "korpusnaya", material: "Нео-классика · Производство на заказ", price: "Цена по запросу", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/cf9fb0af-2994-41ad-866a-90bd89baf9e4.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/a161f7c9-48da-4d28-b032-ef02bf6ccabf.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/3dc46a34-3d5a-4c5b-82dc-728c25527eb1.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/90f63e7f-6b28-49ab-a2e4-6cfcf6c66d37.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/dfcd3665-49ab-42e1-8295-32ad98ca38e1.jpg"], tag: "Премиум", desc: "Дизайнерская кухня в нео-классическом стиле «Комо» на заказ по вашим размерам. Указана стоимость выставочного экспоната. Кухня «Комо» вобрала в себя ряд модных тенденций современного мебелестроения. Дверцы открываются легко и бесшумно. Реечные фасады открываются по системе «пуш-ап». Шкаф для посуды с зеркальной стенкой — это изюминка, которая увеличивает пространство и подчёркивает красоту посуды. Его можно легко переставить. Представлено несколько видов фасадов: реечные, с декором, со стеклянной вставкой, открытые полки — воплощение мастерства мастеров мебельной фабрики «ЭкоДрев». Элегантность дизайна, безупречное сочетание эстетики и функциональности, формы и содержания — это всё кухня «Комо»." },
  { id: 4, name: "Шкафы", category: "korpusnaya", material: "Натуральное дерево, премиум качество", price: "Цена по запросу", images: [HERO_IMG], tag: null },
  { id: 5, name: "Комплект «Сказка» (столик и стульчик)", category: "detskaya", material: "Берёза, акриловая итальянская эмаль", price: "от 9 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/55f84ddf-051b-4040-943e-eaaca9969a69.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/72c5bd43-900c-4a64-b151-f26fa452dddc.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/4653faf1-ecb6-4ab1-9594-edf3a8928238.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/b2ac2d13-4477-4205-acfc-a456a19529d8.jpg"], tag: "Эко", desc: "Комплект детской мебели «Сказка» (столик и стульчик) выполнены в классическом стиле из берёзы по всем канонам столярного мастерства. Высота столика — 50 см, высота стульчика — 30 см. Окрашены акриловой итальянской эмалью. Сиденье стульчика мягкое, обшитое специальной мебельной тканью. Вашему ребёнку будет очень удобно и комфортно! Важный плюс — отсутствие острых углов у стола. Можем покрасить в любой цвет и сделать любого размера! Гарантия до 10 лет. Доставка по РФ любыми транспортными компаниями." },
  { id: 6, name: "Мебель для ванной", category: "korpusnaya", material: "Влагостойкие материалы, любой стиль", price: "Цена по запросу", images: [GALLERY_IMG1], tag: null },
  { id: 7, name: "Мебель для офисов", category: "office", material: "Натуральное дерево, любой стиль", price: "Цена по запросу", images: [HERO_IMG], tag: null },
  { id: 8, name: "Мебель для ресторанов", category: "office", material: "Авторский дизайн, любой стиль", price: "Цена по запросу", images: [GALLERY_IMG1], tag: "Эксклюзив" },
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
  const [modal, setModal] = useState<{ item: typeof catalogItems[0]; photoIndex: number; showVideo: boolean } | null>(null);

  const openModal = (item: typeof catalogItems[0], photoIndex = 0) => setModal({ item, photoIndex, showVideo: false });
  const closeModal = () => setModal(null);
  const modalPrev = () => setModal((m) => m ? { ...m, showVideo: false, photoIndex: (m.photoIndex - 1 + m.item.images.length) % m.item.images.length } : null);
  const modalNext = () => setModal((m) => m ? { ...m, showVideo: false, photoIndex: (m.photoIndex + 1) % m.item.images.length } : null);

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
              Авторская мебель · Бузулук · С 2000 года
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light leading-[0.9] mb-8" style={{ animation: "fadeInUp 0.8s 0.4s both" }}>
              Мебель,<br /><em className="italic" style={{ color: "var(--gold)" }}>созданная</em><br />для вечности
            </h1>
            <div className="gold-line w-24 mb-8" style={{ animation: "fadeInUp 0.8s 0.55s both" }} />
            <p className="font-body text-sm leading-relaxed mb-10 max-w-md" style={{ color: "rgba(240,232,213,0.68)", animation: "fadeInUp 0.8s 0.65s both" }}>
              Авторские коллекции из натуральных пород дерева. Каждое изделие — это история, рассказанная мастером.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <AnimatedSection>
              <div className="p-10 h-full" style={{ border: "1px solid rgba(201,168,76,0.2)", backgroundColor: "var(--dark-card)" }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <Icon name="Trees" size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-display text-3xl font-light mb-4" style={{ color: "var(--gold)" }}>Натуральные породы дерева</h3>
                <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(240,232,213,0.65)" }}>
                  Используем массив дуба, ясеня, ореха, сосны и других ценных пород. Каждая доска тщательно отбирается вручную — только однородная текстура, без сучков и дефектов.
                </p>
                <ul className="flex flex-col gap-3">
                  {["Дуб — прочность и благородная текстура", "Ясень — лёгкость и выразительный рисунок", "Орех — тёплый тон, элитный сегмент", "Сосна — доступность и природный аромат"].map((item) => (
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
                {[["all", "Все"], ["stoly", "Столы"], ["korpusnaya", "Корпусная"], ["detskaya", "Детская"], ["office", "Офис и ресторан"]].map(([val, label]) => (
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
                <div className="luxury-card group cursor-pointer overflow-hidden" style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.1)" }} onClick={() => openModal(item, 0)}>
                  <div className="relative overflow-hidden" style={{ height: "260px" }}>
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 absolute inset-0" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,8,0.8) 0%, transparent 60%)" }} />
                    {item.tag && (
                      <span className="absolute top-4 left-4 font-body text-xs tracking-[0.15em] uppercase px-3 py-1" style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}>
                        {item.tag}
                      </span>
                    )}
                    {item.images.length > 1 && (
                      <div className="absolute bottom-3 right-4 flex items-center gap-1">
                        {item.images.map((_, i) => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i === 0 ? "var(--gold)" : "rgba(240,232,213,0.4)" }} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-light mb-1">{item.name}</h3>
                    <p className="font-body text-xs tracking-wide mb-3" style={{ color: "rgba(240,232,213,0.5)" }}>{item.material}</p>
                    {item.desc && <p className="font-body text-xs leading-relaxed mb-4" style={{ color: "rgba(240,232,213,0.65)" }}>{item.desc}</p>}
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm" style={{ color: "var(--gold)" }}>{item.price}</span>
                      <span className="font-body text-xs tracking-[0.1em] uppercase flex items-center gap-1.5" style={{ color: "rgba(240,232,213,0.5)" }}>
                        {item.images.length > 1 ? `${item.images.length} фото` : "Подробнее"} <Icon name="ArrowRight" size={13} />
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
                    { icon: "MapPin", label: "Адрес", val: "г. Бузулук, ул. Суворова, 64, ТЦ «Сигнал»" },
                    { icon: "Phone", label: "Телефон", val: "8-922-807-00-17, 8-922-547-05-21" },
                    { icon: "Mail", label: "Email", val: "decabrina_sveta@mail.ru" },
                    { icon: "Clock", label: "Часы работы", val: "Вт–Пт: 10:00–18:00 · Сб: 10:00–16:00 · Вс, Пн — выходной" },
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

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(15,12,8,0.92)" }} onClick={closeModal}>
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center transition-colors" style={{ border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}>
              <Icon name="X" size={18} />
            </button>

            <div className="relative" style={{ height: "420px" }}>
              {modal.showVideo && modal.item.video ? (
                <iframe src={modal.item.video} className="w-full h-full" allow="autoplay; encrypted-media; fullscreen" allowFullScreen frameBorder="0" />
              ) : (
                <img src={modal.item.images[modal.photoIndex]} alt={modal.item.name} className="w-full h-full object-cover" />
              )}
              {!modal.showVideo && modal.item.images.length > 1 && (
                <>
                  <button onClick={modalPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-colors" style={{ backgroundColor: "rgba(15,12,8,0.7)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}>
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  <button onClick={modalNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-colors" style={{ backgroundColor: "rgba(15,12,8,0.7)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}>
                    <Icon name="ChevronRight" size={20} />
                  </button>
                </>
              )}
            </div>

            {(modal.item.images.length > 1 || modal.item.video) && (
              <div className="flex gap-2 px-6 pt-4 overflow-x-auto">
                {modal.item.images.map((src, i) => (
                  <button key={i} onClick={() => setModal((m) => m ? { ...m, photoIndex: i, showVideo: false } : null)}
                    className="flex-shrink-0 w-16 h-16 overflow-hidden transition-all"
                    style={{ border: !modal.showVideo && i === modal.photoIndex ? "2px solid var(--gold)" : "2px solid transparent", opacity: !modal.showVideo && i === modal.photoIndex ? 1 : 0.5 }}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {modal.item.video && (
                  <button onClick={() => setModal((m) => m ? { ...m, showVideo: true } : null)}
                    className="flex-shrink-0 w-16 h-16 flex items-center justify-center transition-all"
                    style={{ border: modal.showVideo ? "2px solid var(--gold)" : "2px solid transparent", backgroundColor: "rgba(15,12,8,0.6)", opacity: modal.showVideo ? 1 : 0.6 }}>
                    <Icon name="Play" size={22} style={{ color: "var(--gold)" }} />
                  </button>
                )}
              </div>
            )}

            <div className="p-6">
              {modal.item.tag && (
                <span className="inline-block font-body text-xs tracking-[0.15em] uppercase px-3 py-1 mb-4" style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}>{modal.item.tag}</span>
              )}
              <h2 className="font-display text-3xl font-light mb-2">{modal.item.name}</h2>
              <p className="font-body text-xs tracking-wide mb-4" style={{ color: "rgba(240,232,213,0.5)" }}>{modal.item.material}</p>
              {modal.item.desc && <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "rgba(240,232,213,0.7)" }}>{modal.item.desc}</p>}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                <span className="font-display text-2xl font-light" style={{ color: "var(--gold)" }}>{modal.item.price}</span>
                <button onClick={() => { closeModal(); document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="font-body text-xs tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300"
                  style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}>
                  Заказать консультацию
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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