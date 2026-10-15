import { useState } from "react";
import Icon from "@/components/ui/icon";

const PHONES = [
  { label: "8-922-81-99-288", tel: "+79228199288" },
  { label: "8-932-548-53-63", tel: "+79325485363" },
  { label: "8-922-807-00-17", tel: "+79228070017" },
];

const MAX_URL = "https://max.ru/id5603008200_biz";

const btnStyle = { border: "1px solid rgba(201,168,76,0.35)", color: "var(--gold)" };

const CardContactButtons = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-center gap-2 font-body text-xs tracking-wide px-3 py-2 transition-all duration-300" style={btnStyle}>
          <Icon name="Phone" size={13} /> Позвонить
        </button>
        <a href={MAX_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 font-body text-xs tracking-wide px-3 py-2 transition-all duration-300" style={btnStyle}>
          <Icon name="MessageCircle" size={13} /> Написать
        </a>
      </div>
      {open && (
        <div className="flex flex-col gap-2 mt-2">
          {PHONES.map((p) => (
            <a
              key={p.tel}
              href={`tel:${p.tel}`}
              className="flex items-center justify-center gap-2 font-body text-xs tracking-wide px-3 py-2"
              style={{ backgroundColor: "var(--gold)", color: "var(--dark)" }}
            >
              <Icon name="Phone" size={13} />
              {p.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardContactButtons;
