const HERO_IMG = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/a6e923ee-b5b5-4f63-98be-5e054280b501.jpg";
const GALLERY_IMG1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/ca601452-70eb-402e-af48-8e4c57c758fa.jpg";
const GALLERY_IMG2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/files/55e66285-1780-4050-84eb-841d674e9f70.jpg";
const LETНИЙ_POLDEN_1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/436bd90b-75c4-4c32-85fa-e9e408648c0d.jpg";
const LETНИЙ_POLDEN_2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/d59057b3-32bf-4d8b-ac20-23ad1886a10f.jpg";
const LISTOPAD_1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/444a5ae2-28fc-422d-823a-100854a7e6b9.jpg";
const LISTOPAD_2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/316772d9-0d51-458a-a831-d5fa38fbafc8.jpg";

export const HERO_IMAGE = HERO_IMG;

export const navItems = [
  { label: "Главная", section: "hero" },
  { label: "Каталог", section: "catalog" },
  { label: "Услуги", section: "services" },
  { label: "Проекты", section: "projects" },
  { label: "Блог", section: "blog" },
  { label: "Контакты", section: "contacts" },
];

export type CatalogItem = {
  id: number;
  name: string;
  category: string;
  material: string;
  price: string;
  images: string[];
  video?: string;
  tag: string | null;
  desc?: string;
};

export const catalogItems: CatalogItem[] = [
  { id: 11, name: "Стол «Лунная соната»", category: "stoly", material: "Карагач, МДФ · Коллекция 2026", price: "40 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/134f3a3e-8c60-4cb4-aa9f-a8b03d5f1407.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/f58ba5a4-916a-4e47-83b1-6ec263b1cbc3.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/52222ba4-da1a-464c-8751-b98574194b21.jpg"], video: "https://vk.com/video_ext.php?oid=-230847857&id=456239049&hd=2", tag: "Новинка", desc: "Дизайнерский круглый стол «Лунная соната» из коллекции 2026 года. Любите необычное? Тогда этот стол для вас! Подстолье — игра сочетания цветов и материалов: светлая сторона — угловая трапеция карагач; тёмная — трапеция с геометрическими узорами, МДФ. Круглый стол — потому что дома нет главных и второстепенных. Идеален для 4 человек. «Лунная соната» — воплощение теплоты и домашнего уюта, ведь так приятно собираться вокруг стола! Отправляем по РФ любыми транспортными компаниями. Проконсультируем и подберём стол, который идеально впишется в интерьер!" },
  { id: 1, name: "Стол «Листопад»", category: "stoly", material: "Порода дерева на ваш выбор · Коллекция «Осенняя рапсодия»", price: "от 20 000 ₽", images: [LISTOPAD_1, LISTOPAD_2], tag: "Хит", desc: "Стол «Листопад» из коллекции «Осенняя рапсодия». Элегантный, словно парящий в воздухе треугольный столик на трёх ножках манит попить за ним чашечку чая или заняться творчеством. Размер — 160×100 см, высота 76 см. Премиальное качество. Гарантия до 10 лет. Отправляем по РФ любыми транспортными компаниями. Изготовим на заказ по вашим размерам из породы дерева, выбранной вами." },
  { id: 9, name: "Столик «Начало осени»", category: "stoly", material: "Дуб, берёза (порода дерева на ваш выбор) · Коллекция «Осенняя рапсодия»", price: "от 13 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/fa79cbdf-f6d3-40f6-9265-5af41b7acdd2.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/234ef46b-3ccf-49b9-995a-073929588b83.jpg"], tag: "Премиум", desc: "Столик «Начало осени» из коллекции «Осенняя рапсодия». Маленький круглый столик многовариативен: и как журнальный, и как детский. Премиальное качество. Дуб, берёза — порода дерева на ваш выбор. Отправляем по РФ любыми транспортными компаниями. Изготовим на заказ по вашим размерам." },
  { id: 10, name: "Столик «На заре»", category: "stoly", material: "Порода дерева на ваш выбор · Коллекция «Мелодии лета»", price: "от 24 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/cf11c47f-d10b-41cc-bc96-2c7b4ee653c1.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/6ca13ba2-38a2-4301-a8e9-19466c26926f.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/3cb57985-9d16-4b01-bcd7-df20b34832e3.jpg"], tag: "Премиум", desc: "Столик «На заре» из коллекции «Мелодии лета». Очаровательный круглый кофейный столик — чем не повод побаловать себя чашечкой ароматного напитка на заре… Круглый столик как для двух человек, так и для четырёх. Здесь никто не сидит «с краю». Премиальное качество. Изготовим на заказ по вашим размерам из породы дерева, выбранной вами. Доставим по РФ любыми транспортными компаниями." },
  { id: 2, name: "Кофейный столик «Летний полдень»", category: "stoly", material: "Дуб (порода на ваш выбор) · Коллекция «Мелодии лета»", price: "от 11 000 ₽", images: [LETНИЙ_POLDEN_1, LETНИЙ_POLDEN_2], tag: "Премиум", desc: "Лаконичный дизайн, который впишется в любой интерьер. Дарит ощущение лёгкости бытия — удобно для двух человек." },
  { id: 3, name: "Кухни", category: "korpusnaya", material: "Натуральное дерево, любой стиль", price: "Цена по запросу", images: [GALLERY_IMG1], tag: "Премиум" },
  { id: 4, name: "Шкафы", category: "korpusnaya", material: "Натуральное дерево, премиум качество", price: "Цена по запросу", images: [HERO_IMG], tag: null },
  { id: 5, name: "Детская мебель", category: "detskaya", material: "Экологичное дерево, безопасные материалы", price: "от 9 000 ₽", images: [GALLERY_IMG2], tag: "Эко" },
  { id: 6, name: "Мебель для ванной", category: "korpusnaya", material: "Влагостойкие материалы, любой стиль", price: "Цена по запросу", images: [GALLERY_IMG1], tag: null },
  { id: 7, name: "Мебель для офисов", category: "office", material: "Натуральное дерево, любой стиль", price: "Цена по запросу", images: [HERO_IMG], tag: null },
  { id: 8, name: "Мебель для ресторанов", category: "office", material: "Авторский дизайн, любой стиль", price: "Цена по запросу", images: [GALLERY_IMG1], tag: "Эксклюзив" },
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
