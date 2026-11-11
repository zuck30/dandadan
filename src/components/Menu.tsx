"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const ITEM_ICONS: Record<string, string> = {
  SOULMATE: "https://cdn-icons-png.flaticon.com/128/57/57192.png",
  SHIFT: "https://cdn-icons-png.flaticon.com/128/58/58143.png",
  MIRROR: "https://cdn-icons-png.flaticon.com/128/35/35418.png",
  TEARS: "https://cdn-icons-png.flaticon.com/128/35/35678.png",
  HYPE: "https://cdn-icons-png.flaticon.com/128/57/57298.png",
  PEACE: "https://cdn-icons-png.flaticon.com/128/57/57305.png",
};

const ITEMS = ["SOULMATE", "SHIFT", "MIRROR", "TEARS", "HYPE", "PEACE"];

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (item: string) => void;
};

export default function Menu({ open, onClose, onSelect }: Props) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-30 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            className="fixed right-8 top-24 z-40 flex flex-col items-end gap-4 text-right md:right-12 md:top-28"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {ITEMS.map((item, i) => (
              <motion.button
                key={item}
                type="button"
                onClick={() => {
                  onSelect(item);
                  onClose();
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                className="flex items-center gap-3 font-sans text-sm tracking-[0.35em] text-white/70 transition hover:text-white md:text-base"
              >
                <Image
                  src={ITEM_ICONS[item]}
                  alt={item}
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] invert opacity-80"
                />
                {item}
              </motion.button>
            ))}
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}