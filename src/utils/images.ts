import type { OnLoadingComplete } from "next/dist/shared/lib/get-img-props";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type EventHandler,
  type ReactEventHandler,
} from "react";

export const preloadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });

export const useImagePreload = (
  coverUrls: string[],
  onAllLoaded?: () => void
) => {
  const loadingStates = useRef<[string, boolean][]>(
    coverUrls.map((url) => [url, false])
  );
  const [loadingProgress, setLoadingProgress] = useState(0);

  const udpateLoadingProgress = useCallback(() => {
    if (!loadingStates.current.length) {
      setLoadingProgress(1);
      return;
    }
    setLoadingProgress(
      loadingStates.current.filter(([, loaded]) => loaded).length /
        loadingStates.current.length
    );
  }, []);

  const updateLoadingState = useCallback((loadedUrl: string) => {
    const newLoadingStates = loadingStates.current.map(
      ([url, loaded]): [string, boolean] => {
        return [
          url,
          loaded || url === loadedUrl || decodeURI(loadedUrl).includes(url),
        ];
      }
    );
    loadingStates.current = newLoadingStates;
    udpateLoadingProgress();
  }, []);

  const onLoad = useCallback<ReactEventHandler<HTMLImageElement>>((event) => {
    let mediaURl = event.currentTarget.src;
    const url = new URL(event.currentTarget.src);
    if (url.pathname.includes("/_next/image") || url.searchParams.has("url")) {
      const nestedUrl = url.searchParams.get("url");
      if (nestedUrl) {
        mediaURl = decodeURI(nestedUrl);
      }
    }
    updateLoadingState(mediaURl);
  }, []);

  const allLoaded = useMemo(() => loadingProgress === 1, [loadingProgress]);
  useEffect(() => {
    if (!onAllLoaded) return;
    if (!allLoaded) return;

    onAllLoaded();
  }, [allLoaded]);

  return {
    onLoad,
    allLoaded,
    loadingProgress,
  };
};
