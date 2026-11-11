"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  text: string;
  isLoading?: boolean;
};

export default function HeroText({ text, isLoading }: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
      <AnimatePresence mode="wait">
        <motion.p
          key={isLoading ? "__loading__" : text}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl text-center font-serif italic text-4xl leading-tight text-white/90 drop-shadow-2xl md:text-5xl lg:text-6xl"
        >
          {isLoading ? "Listening to your soul..." : text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
