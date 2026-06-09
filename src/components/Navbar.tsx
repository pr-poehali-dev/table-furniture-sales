import Icon from "@/components/ui/icon";

const navItems = [
  { label: "Главная", section: "hero" },
  { label: "Материалы", section: "materials" },
  { label: "Каталог", section: "catalog" },
  { label: "Услуги", section: "services" },
  { label: "Проекты", section: "projects" },
  { label: "Блог", section: "blog" },
  { label: "Контакты", section: "contacts" },
];

interface NavbarProps {
  activeNav: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (section: string) => void;
}

export default function Navbar({ activeNav, menuOpen, setMenuOpen, scrollTo }: NavbarProps) {
  return (
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
  );
}