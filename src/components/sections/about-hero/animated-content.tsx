"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

export function AnimatedBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8 shadow-sm"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedLightBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm mb-8 shadow-sm"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeading({
  heading,
  highlight,
}: {
  heading: string;
  highlight?: string | null;
}) {
  const trimmedHeading = highlight ? heading.trimEnd() : heading;
  const letters = trimmedHeading.split("");
  const highlightLetters = highlight ? highlight.split("") : [];

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.1 },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, display: "none" },
    visible: {
      opacity: 1,
      display: "inline",
      transition: { type: "tween", duration: 0.01 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {letters.map((char, index) => (
        <motion.span variants={child} key={index} className="inline-block whitespace-pre">
          {char}
        </motion.span>
      ))}
      {highlight && (
        <>
          {" "}
          <span className="inline-block relative whitespace-nowrap">
          {highlightLetters.map((char, index) => (
            <motion.span
              variants={child}
              key={`hi-${index}`}
              className="relative z-10 text-orange-500 inline-block whitespace-pre"
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1 + (letters.length + highlightLetters.length) * 0.02,
              ease: "easeOut",
            }}
            className="absolute bottom-1.5 sm:bottom-2 left-0 w-full h-3 sm:h-4 bg-orange-500/10 -z-10 rounded-sm origin-left"
          />
          </span>
        </>
      )}
    </motion.div>
  );
}

export function AnimatedDescription({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
