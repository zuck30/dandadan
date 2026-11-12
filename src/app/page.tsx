"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import HeroText from "@/components/HeroText";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type RecommendResult = {
  cinematic_text: string;
  anime_name: string;
  poster_url: string;
  video_mood: string;
};

const INITIAL_TEXT =
  "Tell me your vibe, or tell me what you've watched. I will find the anime that matches your soul.";

export default function Home() {
  const [vibe, setVibe] = useState("");
  const [mood, setMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendResult | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const callRecommend = useCallback(
    async (nextVibe: string, nextMood: string) => {
      if (isLoading) return;
      if (!nextVibe.trim() && !nextMood) return;
      if (!isSupabaseConfigured) {
        setResult({
          cinematic_text:
            "The oracle is not connected yet. Add the Supabase environment variables in Vercel and redeploy.",
          anime_name: "",
          poster_url: "",
          video_mood: "mystery",
        });
        return;
      }
      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("recommend", {
          body: { vibe: nextVibe, mood: nextMood },
        });
        if (error) throw error;
        if (data) {
          setResult({
            cinematic_text: data.cinematic_text || INITIAL_TEXT,
            anime_name: data.anime_name || "",
            poster_url: data.poster_url || "",
            video_mood: data.video_mood || "calm",
          });
        }
      } catch (err) {
        console.error(err);
        setResult({
          cinematic_text:
            "The oracle is silent for a moment. Try again when the air is still.",
          anime_name: "",
          poster_url: "",
          video_mood: "mystery",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  const openInput = useCallback(() => {
    setInputOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !inputOpen) {
        e.preventDefault();
        openInput();
      }
      if (e.key === "Escape") {
        setMenuOpen(false);
        setInputOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inputOpen, openInput]);

  const handleMenuSelect = (item: string) => {
    setMood(item);
    callRecommend(vibe, item);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = vibe.trim();
    if (!trimmed) return;
    callRecommend(trimmed, mood);
    setInputOpen(false);
  };

  const displayText = result?.cinematic_text || INITIAL_TEXT;

  return (
    <main
      className="relative h-dvh w-full overflow-hidden bg-black text-white"
      onClick={() => {
        if (!menuOpen) openInput();
      }}
    >
      <VideoBackground
        videoMood={result?.video_mood}
        posterUrl={result?.poster_url}
      />

      <Navbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((v) => !v)} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} onSelect={handleMenuSelect} />

      <HeroText text={displayText} isLoading={isLoading} />

      {result?.anime_name ? (
        <div className="pointer-events-none fixed bottom-8 left-8 z-20 font-sans text-[10px] tracking-[0.35em] text-white/50 md:bottom-10 md:left-12">
          {result.anime_name.toUpperCase()}
        </div>
      ) : null}

      <a
        href="https://zuck30.github.io/zuck30/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-20 flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] text-white/50 transition hover:text-white/80 md:bottom-10 md:right-12"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/25/25471.png"
          alt="GitHub"
          className="h-4 w-4 invert opacity-70"
        />
        <span>SHADRACKOVSKY</span>
      </a>

      <form
        onSubmit={handleSubmit}
        className={`fixed bottom-10 left-1/2 z-40 w-[min(90vw,520px)] -translate-x-1/2 transition-all duration-500 ${
          inputOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="tell me your vibe..."
          className="w-full border-b border-white/30 bg-transparent px-2 py-3 text-center font-sans text-sm tracking-[0.15em] text-white placeholder:text-white/40 focus:border-white/70 focus:outline-none"
        />
      </form>
    </main>
  );
}
