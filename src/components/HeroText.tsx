"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  text: string;
  isLoading?: boolean;
};

export default function HeroText({ text, isLoading }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentKey = isLoading ? "__loading__" : text;

  // Start at the top whenever a new recommendation arrives.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [contentKey]);

  return (
    <div
      ref={scrollRef}
      className="hero-scroll absolute inset-0 z-10 overflow-y-auto overscroll-contain px-6 pt-28 pb-32 md:pt-40 md:pb-36"
    >
      <div className="flex min-h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={contentKey}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl text-center font-serif text-3xl leading-snug text-white/90 drop-shadow-2xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {isLoading ? "Listening to your soul..." : text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
