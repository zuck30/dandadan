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
          width={160}
          height={54}
          priority
          className="h-14 w-auto md:h-16"
        />
      </div>
      <button
        type="button"
        onClick={onMenuToggle}
        className="transition hover:opacity-80"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? (
          <Image
            src="https://cdn-icons-png.flaticon.com/128/7546/7546863.png"
            alt="Close"
            width={28}
            height={28}
            className="h-7 w-7 invert"
          />
        ) : (
          <Image
            src="https://cdn-icons-png.flaticon.com/128/63/63000.png"
            alt="Menu"
            width={28}
            height={28}
            className="h-7 w-7 invert"
          />
        )}
      </button>
    </header>
  );
}