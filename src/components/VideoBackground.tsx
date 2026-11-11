"use client";

import { AnimatePresence, motion } from "framer-motion";

const MOOD_TO_VIDEO: Record<string, string> = {
  calm: "/videos/video-1.mp4",
  hype: "/videos/video-2.mp4",
  action: "/videos/video-3.mp4",
  mystery: "/videos/video-4.mp4",
  sad: "/videos/video-5.mp4",
};

const DEFAULT_VIDEO = "/videos/video-6.mp4";

export function getVideoForMood(mood?: string | null): string {
  if (!mood) return DEFAULT_VIDEO;
  return MOOD_TO_VIDEO[mood] || DEFAULT_VIDEO;
}

type Props = {
  videoMood?: string | null;
  posterUrl?: string | null;
};

export default function VideoBackground({ videoMood, posterUrl }: Props) {
  const src = getVideoForMood(videoMood);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {posterUrl ? (
        <div
          className="absolute inset-0 scale-110 bg-center bg-cover"
          style={{
            backgroundImage: `url(${posterUrl})`,
            filter: "blur(40px)",
            opacity: 0.3,
          }}
        />
      ) : null}

      <AnimatePresence mode="wait">
        <motion.video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/60" />
      <div className="grain-overlay" />
    </div>
  );
}
