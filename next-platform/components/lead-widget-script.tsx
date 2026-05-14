"use client";

import { useEffect, useRef } from "react";

type LeadWidgetScriptProps = {
  id: string;
  src: string;
  attributes?: Record<string, string | undefined>;
};

export function LeadWidgetScript({ id, src, attributes = {} }: LeadWidgetScriptProps) {
  const mountRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    mountNode.innerHTML = "";

    const script = document.createElement("script");
    script.id = id;
    script.src = src;

    Object.entries(attributes).forEach(([key, value]) => {
      if (typeof value !== "string") return;
      script.setAttribute(`data-${key}`, value);
    });

    mountNode.appendChild(script);

    return () => {
      mountNode.innerHTML = "";
    };
  }, [id, src, attributes]);

  return <span ref={mountRef} />;
}
