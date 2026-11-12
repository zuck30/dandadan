import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { vibe, mood } = await req.json();
    if (!vibe && !mood) {
      return new Response(JSON.stringify({ error: "Missing vibe or mood" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("DEEPSEEK_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "DEEPSEEK_API_KEY not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const userPrompt = `Vibe: ${vibe || "unspecified"}. Mood: ${mood || "unspecified"}.`;

    const dsRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(30_000),
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              'You are a cinematic anime oracle. The user will give you their current vibe and a selected mood. Recommend exactly ONE anime. Write a dramatic, deeply philosophical, 2-3 sentence explanation in English of why they MUST watch this anime. Return ONLY a valid JSON object with this exact structure: {"anime_name": "Title", "cinematic_text": "Your text", "video_mood": "action" | "sad" | "calm" | "mystery" | "hype"}. Do not include markdown formatting or backticks.',
          },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.9,
      }),
    });

    if (!dsRes.ok) {
      const errText = await dsRes.text();
      return new Response(
        JSON.stringify({ error: "DeepSeek request failed", details: errText }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const dsData = await dsRes.json();
    let content = dsData?.choices?.[0]?.message?.content ?? "";
    content = content.trim();
    // Strip accidental markdown fences
    content = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");

    let parsed: { anime_name?: string; cinematic_text?: string; video_mood?: string };
    try {
      parsed = JSON.parse(content);
    } catch {
      return new Response(
        JSON.stringify({ error: "Failed to parse DeepSeek response", raw: content }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const animeName = parsed.anime_name || "Unknown";
    const cinematicText = parsed.cinematic_text || "";
    const allowedMoods = ["action", "sad", "calm", "mystery", "hype"];
    const videoMood = allowedMoods.includes(parsed.video_mood || "")
      ? (parsed.video_mood as string)
      : "calm";

    let posterUrl = "";
    try {
      const jikanRes = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeName)}&limit=1`,
        { signal: AbortSignal.timeout(6_000) },
      );
      if (jikanRes.ok) {
        const jikanData = await jikanRes.json();
        posterUrl =
          jikanData?.data?.[0]?.images?.webp?.large_image_url ||
          jikanData?.data?.[0]?.images?.jpg?.large_image_url ||
          "";
      }
    } catch {
      // poster is optional; continue
    }

    return new Response(
      JSON.stringify({
        cinematic_text: cinematicText,
        anime_name: animeName,
        poster_url: posterUrl,
        video_mood: videoMood,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
