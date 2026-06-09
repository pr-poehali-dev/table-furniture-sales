import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

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

export default function ContactsSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", material: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <>
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
                  <div className="text-center py-10">
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
                        <label className="font-body text-xs tracking-[0.1em] uppercase block mb-2" style={{ color: "rgba(240,232,213,0.5)" }}>Интересующий материал</label>
                        <select
                          value={formData.material}
                          onChange={(e) => setFormData((p) => ({ ...p, material: e.target.value }))}
                          className="w-full font-body text-sm px-4 py-3 outline-none transition-colors duration-200"
                          style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", color: formData.material ? "var(--cream)" : "rgba(240,232,213,0.35)" }}
                        >
                          <option value="" disabled style={{ backgroundColor: "var(--dark-card)", color: "rgba(240,232,213,0.5)" }}>Выберите материал...</option>
                          <option value="Натуральные породы дерева" style={{ backgroundColor: "var(--dark-card)", color: "var(--cream)" }}>Натуральные породы дерева</option>
                          <option value="МДФ" style={{ backgroundColor: "var(--dark-card)", color: "var(--cream)" }}>МДФ</option>
                          <option value="ЛДСП премиум-класса Ламарти" style={{ backgroundColor: "var(--dark-card)", color: "var(--cream)" }}>ЛДСП премиум-класса Ламарти</option>
                          <option value="Не знаю, нужна помощь" style={{ backgroundColor: "var(--dark-card)", color: "var(--cream)" }}>Не знаю, нужна помощь</option>
                        </select>
                      </div>
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
            <a href="https://vk.com/ekodrevbuzuluk" target="_blank" rel="noopener noreferrer"
              className="font-body text-xs tracking-[0.1em] uppercase transition-colors duration-200"
              style={{ color: "rgba(240,232,213,0.4)" }}
              onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "var(--gold)"}
              onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "rgba(240,232,213,0.4)"}
            >ВКонтакте</a>
            <a href="https://ru.pinterest.com/decabrina_sveta/?actingBusinessId=1094726759330777519" target="_blank" rel="noopener noreferrer"
              className="font-body text-xs tracking-[0.1em] uppercase transition-colors duration-200"
              style={{ color: "rgba(240,232,213,0.4)" }}
              onMouseEnter={e => (e.target as HTMLAnchorElement).style.color = "var(--gold)"}
              onMouseLeave={e => (e.target as HTMLAnchorElement).style.color = "rgba(240,232,213,0.4)"}
            >Pinterest</a>
          </div>
        </div>
      </footer>
    </>
  );
}