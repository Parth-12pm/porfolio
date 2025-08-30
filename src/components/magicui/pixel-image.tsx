"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // in ms
  maxAnimationDelay?: number; // in ms
  colorRevealDelay?: number; // in ms
  className?: string;
}

function getSequentialDelay(index: number, total: number, maxDelay: number) {
  return Math.floor((index / total) * maxDelay);
}

function formatClipPath(col: number, row: number, cols: number, rows: number) {
  const left = (col * (100 / cols)).toFixed(6);
  const right = ((col + 1) * (100 / cols)).toFixed(6);
  const top = (row * (100 / rows)).toFixed(6);
  const bottom = ((row + 1) * (100 / rows)).toFixed(6);

  return `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false;
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid];
  }, [customGrid, grid]);

  useEffect(() => {
    setIsVisible(true);
    const colorTimeout = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);
    return () => clearTimeout(colorTimeout);
  }, [colorRevealDelay]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      return {
        clipPath: formatClipPath(col, row, cols, rows),
        delay: getSequentialDelay(index, total, maxAnimationDelay),
      };
    });
  }, [rows, cols, maxAnimationDelay]);

  const hasCustomSize =
    className && /\b(w-|h-|max-w-|max-h-|min-w-|min-h-)\w+/.test(className);
  const defaultClasses = hasCustomSize
    ? "relative select-none overflow-hidden"
    : "relative h-72 w-72 select-none md:h-96 md:w-96 overflow-hidden";

  return (
    <div className={cn(defaultClasses, className)}>
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Pixel image piece ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className={cn(
              "z-1 object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};
