import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { assets } from "./site";

const TARGET_VOLUME = 0.15;
const FADE_MS = 1800;

type MusicContextValue = {
  available: boolean;
  playing: boolean;
  /** Starts playback if not already playing. Call synchronously from a user
      gesture (e.g. a click handler) — browsers refuse autoplay otherwise. */
  play: () => void;
  toggle: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

/**
 * Owns the single background-audio element so the wax stamp (which starts
 * the music on open) and the mute/unmute button (which toggles it after)
 * both control the same playback instead of each spinning up their own.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number>();
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (assets.backgroundMusic.length === 0) return;
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    const sources = [...assets.backgroundMusic];
    let index = 0;
    const tryNext = () => {
      if (index >= sources.length) {
        setAvailable(false);
        return;
      }
      audio.src = sources[index++];
      audio.load();
    };
    const onReady = () => setAvailable(true);
    const onError = () => tryNext();
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("error", onError);
    audioRef.current = audio;
    tryNext();

    const onVisibility = () => {
      if (document.hidden && !audio.paused) {
        audio.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(fadeRef.current);
      audioRef.current = null;
    };
  }, []);

  const fadeTo = (
    audio: HTMLAudioElement,
    target: number,
    then?: () => void,
  ) => {
    window.clearInterval(fadeRef.current);
    const steps = 30;
    const delta = (target - audio.volume) / steps;
    let i = 0;
    fadeRef.current = window.setInterval(() => {
      i += 1;
      audio.volume = Math.min(1, Math.max(0, audio.volume + delta));
      if (i >= steps) {
        window.clearInterval(fadeRef.current);
        audio.volume = target;
        then?.();
      }
    }, FADE_MS / steps);
  };

  const play = () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(audio, TARGET_VOLUME);
      })
      .catch(() => setPlaying(false));
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      play();
    } else {
      setPlaying(false);
      fadeTo(audio, 0, () => audio.pause());
    }
  };

  return (
    <MusicContext.Provider value={{ available, playing, play, toggle }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
