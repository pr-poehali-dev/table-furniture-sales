const HERO_IMG = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/a6e923ee-b5b5-4f63-98be-5e054280b501.jpg";
const GALLERY_IMG1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/ca601452-70eb-402e-af48-8e4c57c758fa.jpg";
const GALLERY_IMG2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/55e66285-1780-4050-84eb-841d674e9f70.jpg";
const LETНИЙ_POLDEN_1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/436bd90b-75c4-4c32-85fa-e9e408648c0d.jpg";
const LETНИЙ_POLDEN_2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/d59057b3-32bf-4d8b-ac20-23ad1886a10f.jpg";
const LISTOPAD_1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/444a5ae2-28fc-422d-823a-100854a7e6b9.jpg";
const LISTOPAD_2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/316772d9-0d51-458a-a831-d5fa38fbafc8.jpg";

export const IMAGES = { HERO_IMG, GALLERY_IMG1, GALLERY_IMG2 };

export const navItems = [
  { label: "Главная", section: "hero" },
  { label: "Каталог", section: "catalog" },
  { label: "Услуги", section: "services" },
  { label: "Проекты", section: "projects" },
  { label: "Блог", section: "blog" },
  { label: "Контакты", section: "contacts" },
];

export const catalogItems = [
  { id: 1, name: "Стол «Листопад»", category: "stoly", material: "Порода дерева на ваш выбор · Коллекция «Осенняя рапсодия»", price: "от 20 000 ₽", image: LISTOPAD_1, image2: LISTOPAD_2, tag: "Хит", desc: "Элегантный треугольный стол на трёх ножках. 160×100 см, высота 76 см. Гарантия до 10 лет. Изготовим по вашим размерам. Доставка по всей России." },
  { id: 2, name: "Кофейный столик «Летний полдень»", category: "stoly", material: "Дуб (порода на ваш выбор) · Коллекция «Мелодии лета»", price: "от 11 000 ₽", image: LETНИЙ_POLDEN_1, image2: LETНИЙ_POLDEN_2, tag: "Премиум", desc: "Лаконичный дизайн, который впишется в любой интерьер. Дарит ощущение лёгкости бытия — удобно для двух человек." },
  { id: 3, name: "Кухни", category: "korpusnaya", material: "Натуральное дерево, любой стиль", price: "Цена по запросу", image: GALLERY_IMG1, tag: "Премиум" },
  { id: 4, name: "Шкафы", category: "korpusnaya", material: "Натуральное дерево, премиум качество", price: "Цена по запросу", image: HERO_IMG, tag: null },
  { id: 5, name: "Детская мебель", category: "detskaya", material: "Экологичное дерево, безопасные материалы", price: "от 9 000 ₽", image: GALLERY_IMG2, tag: "Эко" },
  { id: 6, name: "Мебель для ванной", category: "korpusnaya", material: "Влагостойкие материалы, любой стиль", price: "Цена по запросу", image: GALLERY_IMG1, tag: null },
  { id: 7, name: "Мебель для офисов", category: "office", material: "Натуральное дерево, любой стиль", price: "Цена по запросу", image: HERO_IMG, tag: null },
  { id: 8, name: "Мебель для ресторанов", category: "office", material: "Авторский дизайн, любой стиль", price: "Цена по запросу", image: GALLERY_IMG1, tag: "Эксклюзив" },
];

export const services = [
  { icon: "Palette", title: "Дизайн-проект", desc: "Полная разработка концепции интерьера от эскиза до 3D-визуализации с авторским надзором.", price: "от 3 000 ₽/м²" },
  { icon: "MessageSquare", title: "Консультация", desc: "Индивидуальная встреча с ведущим дизайнером студии для подбора мебели и материалов.", price: "Бесплатно" },
  { icon: "Truck", title: "Доставка", desc: "Бережная упаковка и доставка белой перчаткой в любую точку России.", price: "Рассчитывается" },
  { icon: "Wrench", title: "Сборка и монтаж", desc: "Профессиональный монтаж вашей мебели командой опытных специалистов студии.", price: "от 5 000 ₽" },
];

export const projects = [
  { title: "Резиденция «Тверская»", location: "Москва", area: "420 м²", image: GALLERY_IMG1, style: "Классика" },
  { title: "Апартаменты «Невский»", location: "Санкт-Петербург", area: "210 м²", image: GALLERY_IMG2, style: "Ар-деко" },
  { title: "Вилла «Азур»", location: "Сочи", area: "680 м²", image: HERO_IMG, style: "Современная классика" },
];

export const articles = [
  { date: "18 апреля 2026", category: "Тренды", title: "Золото возвращается: тенденции роскошного интерьера 2026", excerpt: "Золотые акценты, тёмное дерево и мрамор — главные материалы сезона." },
  { date: "05 апреля 2026", category: "Материалы", title: "Массив против шпона: что выбрать для вашего дома", excerpt: "Разбираем отличия, преимущества и долговечность натуральных пород дерева." },
  { date: "22 марта 2026", category: "Дизайн", title: "Ар-деко в современном интерьере: геометрия роскоши", excerpt: "Как вплести эстетику 1920-х в актуальное пространство без китча." },
];
