"use client";

import { AnimatePresence, motion } from "framer-motion";

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
                className="font-sans text-sm tracking-[0.35em] text-white/70 transition hover:text-white md:text-base"
              >
                {item}
              </motion.button>
            ))}
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}
