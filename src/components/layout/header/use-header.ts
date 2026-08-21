"use client";
import { useEffect, useState } from "react";

export default function useHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      // Always show when near the top
      if (currentY < 10) {
        setVisible(true);
        setScrolled(false);
        lastY = currentY;
        return;
      }

      setScrolled(true);

      // Scrolling down past 80px — hide
      if (currentY > lastY && currentY > 80) {
        setVisible(false);
        if (menuOpen) setMenuOpen(false); // close mobile menu when hiding
      } else {
        // Scrolling up — show
        setVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    menuOpen,
    setMenuOpen,
    scrolled,
    visible,
  };
}
