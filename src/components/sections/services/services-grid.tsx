"use client";

import { useRef, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import ServiceCard from "./service-card";
import { ServiceListItem } from "@/modules/services/types/service.types";

export default function ServicesGrid({ services }: { services: ServiceListItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 },
    },
  };

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative group/spotlight grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "-100%",
        } as React.CSSProperties
      }
    >
      {/* Spotlight gradient that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100 hidden sm:block z-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(10, 152, 212, 0.08), transparent 40%)`,
        }}
      />
      
      {services.map((serviceItem) => (
        <motion.div key={serviceItem.id} variants={itemVariants} className="relative z-10">
          <ServiceCard service={serviceItem} />
        </motion.div>
      ))}
    </motion.div>
  );
}
