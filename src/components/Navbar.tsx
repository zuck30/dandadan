"use client";

import Image from "next/image";

type Props = {
  onMenuToggle: () => void;
  menuOpen: boolean;
};

export default function Navbar({ onMenuToggle, menuOpen }: Props) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex items-start justify-between px-8 py-6 text-white md:px-12 md:py-8">
      <div className="select-none">
        <Image
          src="/logo.png"
          alt="Dandadan"
          width={120}
          height={48}
          priority
          className="h-10 w-auto md:h-12"
        />
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
