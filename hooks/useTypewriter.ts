"use client";

import { useEffect, useMemo, useState } from "react";

type UseTypewriterOptions = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
};

export function useTypewriter({
  words,
  typeSpeed = 52,
  deleteSpeed = 34,
  pauseDuration = 1800,
}: UseTypewriterOptions) {
  // `wordIndex` tracks which phrase is currently active in the rotation.
  const [wordIndex, setWordIndex] = useState(0);
  // `charIndex` tracks how many characters are visible for the active phrase.
  const [charIndex, setCharIndex] = useState(0);
  // `isDeleting` controls whether we are typing forward or erasing backward.
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = useMemo(() => words[wordIndex] ?? "", [words, wordIndex]);

  useEffect(() => {
    if (words.length === 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    // Hold the full phrase before erasing to create a natural reading pause.
    if (!isDeleting && charIndex === currentWord.length) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeoutId);
    }

    // Once the phrase is fully erased, advance to the next phrase and type again.
    if (isDeleting && charIndex === 0) {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 120);
      return () => clearTimeout(timeoutId);
    }

    // Slight random variance keeps typing cadence from feeling robotic.
    const baseDelay = isDeleting ? deleteSpeed : typeSpeed;
    const variance = Math.floor(Math.random() * 12) - 6;
    const delay = Math.max(24, baseDelay + variance);

    timeoutId = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [charIndex, currentWord.length, deleteSpeed, isDeleting, pauseDuration, typeSpeed, words.length]);

  return {
    text: currentWord.slice(0, charIndex),
    wordIndex,
    isDeleting,
  };
}
