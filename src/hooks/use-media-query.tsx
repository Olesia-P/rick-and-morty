import { useState, useEffect } from "react";

export default function useMediaQuery(maxWidth: number) {
  const [state, setState] = useState({
    windowWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    isDesiredWidth: false,
  });

  useEffect(() => {
    const currentWindowWidth = window?.innerWidth;
    const isDesiredWidth = currentWindowWidth < maxWidth;
    setState({ windowWidth: currentWindowWidth, isDesiredWidth });
  }, [maxWidth]);

  useEffect(() => {
    const resizeHandler = () => {
      const currentWindowWidth = window?.innerWidth;
      const isDesiredWidth = currentWindowWidth < maxWidth;
      setState({ windowWidth: currentWindowWidth, isDesiredWidth });
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [state.windowWidth]);

  return state.isDesiredWidth;
}
