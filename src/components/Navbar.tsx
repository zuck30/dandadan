"use client";

type Props = {
  onMenuToggle: () => void;
  menuOpen: boolean;
};

export default function Navbar({ onMenuToggle, menuOpen }: Props) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex items-start justify-between px-8 py-6 text-white md:px-12 md:py-8">
      <div className="select-none font-sans text-xs tracking-[0.35em] text-white/90 md:text-sm">
        DANDADAN
      </div>
      <button
        type="button"
        onClick={onMenuToggle}
        className="font-sans text-xs tracking-[0.35em] text-white/80 transition hover:text-white md:text-sm"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "CLOSE" : "MENU"}
      </button>
    </header>
  );
}
