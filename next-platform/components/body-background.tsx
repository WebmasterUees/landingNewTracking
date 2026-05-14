"use client";

import { useEffect } from "react";

type BodyBackgroundProps = {
  className: string;
  imageUrl?: string | null;
};

export function BodyBackground({ className, imageUrl }: BodyBackgroundProps) {
  useEffect(() => {
    const prevImage = document.body.style.backgroundImage;
    const prevSize = document.body.style.backgroundSize;
    const prevPosition = document.body.style.backgroundPosition;
    const prevRepeat = document.body.style.backgroundRepeat;

    document.body.classList.add(className);

    if (imageUrl) {
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    }

    return () => {
      document.body.classList.remove(className);
      document.body.style.backgroundImage = prevImage;
      document.body.style.backgroundSize = prevSize;
      document.body.style.backgroundPosition = prevPosition;
      document.body.style.backgroundRepeat = prevRepeat;
    };
  }, [className, imageUrl]);

  return null;
}
