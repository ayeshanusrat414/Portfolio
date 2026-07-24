"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * A thin wrapper around next/image that falls back to a tasteful gradient
 * placeholder when the source is empty or fails to load. This keeps the site
 * looking finished before you drop your real images into /public.
 */
export function SmartImage({
  src,
  alt,
  label,
  className,
  ...props
}: Omit<ImageProps, "src"> & { src?: string; label?: string }) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-accent/15 via-subtle to-accent/5 ${className ?? ""}`}
        role="img"
        aria-label={alt}
      >
        <span className="px-4 text-center text-sm font-medium text-muted">
          {label ?? alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
