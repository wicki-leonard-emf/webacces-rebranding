// @ts-nocheck
import { useEffect, useState } from "react";

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // resolve on error to avoid blocking forever
    img.src = url;
  });
}

/**
 * Waits for fonts to be ready, a minimal delay, and preloads provided images
 * before reporting the app as ready. This helps ensure initial animations
 * mount without layout shifts or missing assets.
 */
export function useAppReady(imageUrls: string[] = [], minDelayMs = 250) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fontsReady: Promise<void> =
      typeof document !== "undefined" && (document as any).fonts?.ready
        ? (document as any).fonts.ready.then(() => {})
        : Promise.resolve();

    const rafTwice = new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const minDelay = new Promise<void>((resolve) => {
      const t = setTimeout(() => resolve(), minDelayMs);
      // no cleanup necessary; timeout completes quickly
    });

    const imagesReady = Promise.all(imageUrls.map(preloadImage)).then(() => {});

    Promise.all([fontsReady, imagesReady, rafTwice, minDelay]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(imageUrls), minDelayMs]);

  return ready;
}

export default useAppReady;
