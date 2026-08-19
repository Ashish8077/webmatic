"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

export function AnimatedCounter({
  value,
  duration = 2.5,
}: {
  value: string | number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract the numeric part of the value
  const numValue =
    typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    if (numValue % 1 !== 0) {
      return current.toFixed(1);
    }
    return Math.floor(current).toString();
  });

  useEffect(() => {
    if (isInView) {
      spring.set(numValue);
    }
  }, [isInView, numValue, spring]);

  // If it's not a valid number, fallback to standard render
  if (isNaN(numValue)) {
    return <span>{value}</span>;
  }

  return <motion.span ref={ref}>{display}</motion.span>;
}
