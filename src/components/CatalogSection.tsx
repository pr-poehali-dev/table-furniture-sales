import { useState, useCallback, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LETНИЙ_POLDEN_1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/436bd90b-75c4-4c32-85fa-e9e408648c0d.jpg";
const LETНИЙ_POLDEN_2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/d59057b3-32bf-4d8b-ac20-23ad1886a10f.jpg";
const LISTOPAD_1 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/444a5ae2-28fc-422d-823a-100854a7e6b9.jpg";
const LISTOPAD_2 = "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/316772d9-0d51-458a-a831-d5fa38fbafc8.jpg";

const catalogItems = [
  { id: 13, name: "Стол «Семейный очаг»", category: "stoly", material: "Шпон дуба 5 мм, керамогранит · Коллекция 2026", price: "120 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/79bcac5e-9c66-4295-b5ef-65b87d2d47cc.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/002063c4-7cbb-462a-a5de-0579fd5cb528.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/c40ce84a-a24a-4bf7-99a9-32471a95d222.jpg"], tag: "Эксклюзив", desc: "Дизайнерский круглый стол «Семейный очаг» — размышление дизайнера о вечности: круглое основание — это часы, из которых неумолимо бежит время — закруглённые ножки. Круглая столешница с отделкой из шпона дуба 5 мм и керамогранита в центре — символ постоянства бытия (дуб) и едва уловимого обновления (керамогранит). Премиальное качество от производителя. Гарантия до 10 лет. Идеально подойдёт для семейных трапез, когда за одним столом собирается несколько поколений. Уютная кухня; элегантная гостиная; зелень беседки, озарённая солнечными лучами — стол «Семейный очаг» будет органично смотреться везде. Круглый стол — потому что дома нет главных и второстепенных. Доставим по РФ любыми транспортными компаниями. Проконсультируем и подберём стол, который идеально впишется в интерьер." },
  { id: 12, name: "Стол «Мелодия любви»", category: "stoly", material: "Коллекция 2026", price: "40 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/df6c9799-de85-4c37-b041-c17b08382a24.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/0841888b-7b17-4e40-b16d-db3fa65087c1.jpg"], tag: "Премиум", desc: "Изысканный круглый стол «Мелодия любви» — воплощение гармонии и элегантности. Дизайнерская работа: конусное подстолье. Идеален для компании из 4 человек. Круглый стол — это место, где никто не сидит «с краю». «Мелодия любви» — пример эстетики и безупречного вкуса, диалога между традициями и инновациями. Премиальное качество от производителя. Доставим по РФ любыми транспортными компаниями." },
  { id: 11, name: "Стол «Лунная соната»", category: "stoly", material: "Карагач, МДФ · Коллекция 2026", price: "40 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/134f3a3e-8c60-4cb4-aa9f-a8b03d5f1407.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/f58ba5a4-916a-4e47-83b1-6ec263b1cbc3.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/52222ba4-da1a-464c-8751-b98574194b21.jpg"], video: "https://vk.com/video_ext.php?oid=-230847857&id=456239049&hd=2", tag: "Новинка", desc: "Дизайнерский круглый стол «Лунная соната» из коллекции 2026 года. Любите необычное? Тогда этот стол для вас! Подстолье — игра сочетания цветов и материалов: светлая сторона — угловая трапеция карагач; тёмная — трапеция с геометрическими узорами, МДФ. Круглый стол — потому что дома нет главных и второстепенных. Идеален для 4 человек. «Лунная соната» — воплощение теплоты и домашнего уюта, ведь так приятно собираться вокруг стола! Отправляем по РФ любыми транспортными компаниями. Проконсультируем и подберём стол, который идеально впишется в интерьер!" },
  { id: 21, name: "Стол «В осеннем бору»", category: "stoly", material: "Дуб, МДФ (порода дерева на Ваш выбор) · Коллекция «Осенняя рапсодия»", price: "50 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/9f2988d4-7251-4bbb-b017-cde5cb226dc6.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/0192a4d5-b1b4-4913-b340-f8c29af414c4.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/6254ae98-b13b-462b-b262-ee40639beb2b.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/f5cbabf3-bbaf-489e-abac-4590cb6f4cb8.jpg"], tag: "Премиум", desc: "Стол «В осеннем бору» из коллекции «Осенняя рапсодия». Основательный стол для семейных трапез или офисных совещаний. Сдержанное, декоративное подстолье, игра сочетания цветов. Премиальное качество от производителя. Гарантия до 10 лет. Доставим по РФ любыми транспортными компаниями. Проконсультируем и подберём стол, который идеально впишется в интерьер — звоните/пишите: 8-922-81-99-288, 8-922-807-00-17, 8-932-548-53-63." },
  { id: 20, name: "Стол «Осенний вечер»", category: "stoly", material: "Массив дерева, металл · Коллекция «Осенняя рапсодия» · Стиль лофт", price: "25 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/a15c7dff-7d1b-444f-a817-efca9966110b.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/51b23fec-2492-40ad-bfdd-811dcdb4bca8.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/59aca48d-9170-44d6-949d-fb4140c914e3.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/6c44f19b-2f2b-4bab-a59f-d5fd1bc4ff29.jpg"], tag: "Лофт", desc: "Стол «Осенний вечер» из коллекции «Осенняя рапсодия». Стол в чистом стиле лофт — универсальный, подходит для компании из 4–6 человек. Тёплая столешница из массива дерева в сочетании с лаконичным чёрным металлическим каркасом создают атмосферу уютного городского вечера. Премиальное качество от производителя. Гарантия до 10 лет. Отправляем по РФ любыми транспортными компаниями. Проконсультируем и подберём стол, который идеально впишется в Ваш интерьер, звоните/пишите: 8-922-81-99-288, 8-932-548-53-63, 8-922-807-00-17." },
  { id: 1, name: "Стол «Листопад»", category: "stoly", material: "Порода дерева на ваш выбор · Коллекция «Осенняя рапсодия»", price: "от 20 000 ₽", images: [LISTOPAD_1, LISTOPAD_2], tag: "Хит", desc: "Стол «Листопад» из коллекции «Осенняя рапсодия». Элегантный, словно парящий в воздухе треугольный столик на трёх ножках манит попить за ним чашечку чая или заняться творчеством. Размер — 160×100 см, высота 76 см. Премиальное качество. Гарантия до 10 лет. Отправляем по РФ любыми транспортными компаниями. Изготовим на заказ по вашим размерам из породы дерева, выбранной вами." },
  { id: 9, name: "Столик «Начало осени»", category: "stoly", material: "Дуб, берёза (порода дерева на ваш выбор) · Коллекция «Осенняя рапсодия»", price: "от 13 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/fa79cbdf-f6d3-40f6-9265-5af41b7acdd2.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/234ef46b-3ccf-49b9-995a-073929588b83.jpg"], tag: "Премиум", desc: "Столик «Начало осени» из коллекции «Осенняя рапсодия». Маленький круглый столик многовариативен: и как журнальный, и как детский. Премиальное качество. Дуб, берёза — порода дерева на ваш выбор. Отправляем по РФ любыми транспортными компаниями. Изготовим на заказ по вашим размерам." },
  { id: 10, name: "Столик «На заре»", category: "stoly", material: "Порода дерева на ваш выбор · Коллекция «Мелодии лета»", price: "от 24 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/cf11c47f-d10b-41cc-bc96-2c7b4ee653c1.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/6ca13ba2-38a2-4301-a8e9-19466c26926f.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/3cb57985-9d16-4b01-bcd7-df20b34832e3.jpg"], tag: "Премиум", desc: "Столик «На заре» из коллекции «Мелодии лета». Очаровательный круглый кофейный столик — чем не повод побаловать себя чашечкой ароматного напитка на заре… Круглый столик как для двух человек, так и для четырёх. Здесь никто не сидит «с краю». Премиальное качество. Изготовим на заказ по вашим размерам из породы дерева, выбранной вами. Доставим по РФ любыми транспортными компаниями." },
  { id: 2, name: "Кофейный столик «Летний полдень»", category: "stoly", material: "Дуб (порода на ваш выбор) · Коллекция «Мелодии лета»", price: "от 11 000 ₽", images: [LETНИЙ_POLDEN_1, LETНИЙ_POLDEN_2], tag: "Премиум", desc: "Лаконичный дизайн, который впишется в любой интерьер. Дарит ощущение лёгкости бытия — удобно для двух человек." },
  { id: 23, name: "Столик «Середина лета»", category: "stoly", material: "Дуб, МДФ · Коллекция «Мелодии лета»", price: "от 25 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/adf49031-e0b8-4426-8507-3c40723555f3.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/58d8928a-0376-4722-aab4-337e176bdb3c.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/672e9484-06b0-436b-8363-55f6facfd10e.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/1d25acfb-4aef-40c7-b712-1ae384463719.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/1fd37ac0-712c-4b0c-8da2-d15e17e184c6.jpg"], tag: "Премиум", desc: "Столик «Середина лета» из коллекции «Мелодии лета». Прямоугольный стол с реечной опорой излучает надёжность и теплоту. Он как будто вобрал в себя всё тепло солнечного света. Идеален для компании из 4–6 человек. Кухня, веранда, мансарда, беседка, офис — столик везде станет гармоничной частью обстановки. Премиальное качество от производителя. Гарантия до 10 лет. Отправляем по РФ любыми транспортными компаниями. Проконсультируем и подберём столик, который идеально впишется в Ваш интерьер, звоните/пишите: 8-922-81-99-288, 8-922-807-00-17, 8-932-548-53-63." },
  { id: 22, name: "Стол «Летняя дымка»", category: "stoly", material: "Дуб, МДФ, металл · Коллекция «Мелодии лета»", price: "от 22 800 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/5dd75758-1e55-4611-a573-e8ab73b079fd.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/06cd0d5e-d80f-480e-8a94-c31e929ca2ec.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/e4e49a99-2c8b-4e34-87b7-f9e2b01ababb.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/ffa6f2bb-b5d8-4e3a-8d98-3a00bdb72339.jpg"], tag: "Премиум", desc: "Стол «Летняя дымка» из коллекции «Мелодии лета». Изящный стол на металлическом подстолье с деревянной столешницей, идеален для 4–6 человек. Воздушный дизайн с элегантными металлическими ножками создаёт ощущение лёгкости, как утренняя летняя дымка. Подходит для кухни, столовой, кафе или загородного дома. Доставим по РФ. Проконсультируем: 8-922-81-99-288, 8-922-807-00-17, 8-932-548-53-63." },
  { id: 14, name: "Шкаф «Лесной страж»", category: "korpusnaya", material: "ЛДСП Ламарти · Коллекция «Зелёный лес»", price: "от 35 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/0ae2e6b0-2be7-4374-b5bb-1bfa05e28e5e.jpg"], tag: "Новинка", desc: "Шкаф-купе «Лесной страж» в лесной зелёной гамме из коллекции «Зелёный лес». Строгий, надёжный, просторный. ЛДСП Ламарти премиум-класса. Доставим и установим по РФ. Звоните: 8-922-81-99-288." },
  { id: 15, name: "Детская «Ягодка»", category: "detskaya", material: "ЛДСП Ламарти · Коллекция «Сказочный лес»", price: "от 48 000 ₽", images: ["https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/90017db9-b8e7-4c40-bd14-3e68ef21fc63.jpg", "https://cdn.poehali.dev/projects/3a8fea8d-927a-442f-af67-1e18e9992c4a/bucket/b80a2ce7-4e33-4c1e-8a75-afb1e3cd0f7b.jpg"], tag: "Новинка", desc: "Детская комната «Ягодка» — уютный и функциональный уголок для вашего ребёнка. Кровать, шкаф и рабочий стол из экологичного ЛДСП Ламарти в нежных тонах." },
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

export type CatalogItem = typeof catalogItems[0];

interface CatalogSectionProps {
  onOpenModal: (item: CatalogItem, photoIndex?: number) => void;
}

export { catalogItems };

export default function CatalogSection({ onOpenModal }: CatalogSectionProps) {
  const [catalogFilter, setCatalogFilter] = useState("all");
  const filtered = catalogFilter === "all" ? catalogItems : catalogItems.filter((i) => i.category === catalogFilter);

  return (
    <section id="catalog" className="py-24" style={{ backgroundColor: "var(--dark-mid)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="font-body text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--gold)" }}>Ассортимент</p>
              <h2 className="font-display text-5xl md:text-6xl font-light">Каталог мебели</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              {[["all", "Все"], ["stoly", "Столы"], ["korpusnaya", "Корпусная"], ["detskaya", "Детская"], ["office", "Офис и библиотека"]].map(([val, label]) => (
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
              <div className="luxury-card group cursor-pointer overflow-hidden" style={{ backgroundColor: "var(--dark-card)", border: "1px solid rgba(201,168,76,0.1)" }} onClick={() => onOpenModal(item, 0)}>
                <div className="relative overflow-hidden" style={{ height: "260px" }}>
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 absolute inset-0" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,12,8,0.8) 0%, transparent 60%)" }} />
                  {item.tag && (
                    <span className="absolute top-4 left-4 font-body text-xs tracking-[0.15em] uppercase px-3 py-1" style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}>{item.tag}</span>
                  )}
                  {item.images.length > 1 && (
                    <span className="absolute top-4 right-4 font-body text-xs px-2 py-1 flex items-center gap-1" style={{ backgroundColor: "rgba(15,12,8,0.7)", color: "rgba(240,232,213,0.7)" }}>
                      <Icon name="Images" size={11} /> {item.images.length}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-light mb-1">{item.name}</h3>
                  <p className="font-body text-xs tracking-wide mb-3" style={{ color: "rgba(240,232,213,0.4)" }}>{item.material}</p>
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
  );
}

interface CatalogModalProps {
  modal: { item: CatalogItem; photoIndex: number; showVideo: boolean } | null;
  setModal: React.Dispatch<React.SetStateAction<{ item: CatalogItem; photoIndex: number; showVideo: boolean } | null>>;
  closeModal: () => void;
}

export function CatalogModal({ modal, setModal, closeModal }: CatalogModalProps) {
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = useCallback(() => {
    const url = new URL(window.location.href);
    if (modal) url.searchParams.set("item", String(modal.item.id));
    if (navigator.share) {
      navigator.share({ title: modal?.item.name, url: url.toString() });
    } else {
      navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  }, [modal]);

  const modalPrev = () => setModal((m) => m ? { ...m, showVideo: false, photoIndex: (m.photoIndex - 1 + m.item.images.length) % m.item.images.length } : null);
  const modalNext = () => setModal((m) => m ? { ...m, showVideo: false, photoIndex: (m.photoIndex + 1) % m.item.images.length } : null);

  if (!modal) return null;

  return (
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
          <div className="flex flex-wrap gap-2 mb-4">
            <a href="tel:+79228199288" className="flex items-center gap-2 font-body text-xs tracking-wide px-4 py-2 transition-all duration-300"
              style={{ border: "1px solid rgba(201,168,76,0.35)", color: "var(--gold)" }}>
              <Icon name="Phone" size={13} />
              8-922-819-92-88
            </a>
            <a href="tel:+79228070017" className="flex items-center gap-2 font-body text-xs tracking-wide px-4 py-2 transition-all duration-300"
              style={{ border: "1px solid rgba(201,168,76,0.35)", color: "var(--gold)" }}>
              <Icon name="Phone" size={13} />
              8-922-807-00-17
            </a>
            <a href="tel:+79325485363" className="flex items-center gap-2 font-body text-xs tracking-wide px-4 py-2 transition-all duration-300"
              style={{ border: "1px solid rgba(201,168,76,0.35)", color: "var(--gold)" }}>
              <Icon name="Phone" size={13} />
              8-932-548-53-63
            </a>
          </div>
          <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
            <span className="font-display text-2xl font-light" style={{ color: "var(--gold)" }}>{modal.item.price}</span>
            <div className="flex items-center gap-3">
              <button onClick={handleShare} title="Поделиться ссылкой"
                className="w-10 h-10 flex items-center justify-center transition-all duration-300 relative"
                style={{ border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold)" }}>
                <Icon name="Share2" size={16} />
                {shareCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-body text-xs px-2 py-1 whitespace-nowrap" style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}>
                    Скопировано!
                  </span>
                )}
              </button>
              <button
                onClick={() => { closeModal(); setTimeout(() => { const el = document.getElementById("contacts"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); }}
                className="font-body text-xs tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300"
                style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}
                onMouseEnter={e => (e.target as HTMLButtonElement).style.backgroundColor = "var(--gold-light)"}
                onMouseLeave={e => (e.target as HTMLButtonElement).style.backgroundColor = "var(--gold)"}
              >
                Заказать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
