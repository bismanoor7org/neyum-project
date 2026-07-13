"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  src: string;
  poster?: string;
}

export function VideoModal({
  open,
  onClose,
  title,
  src,
  poster,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      videoRef.current?.play().catch(() => undefined);
      return;
    }
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "relative w-full max-w-5xl overflow-hidden rounded-2xl",
              "border border-white/10 bg-navy shadow-2xl",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-serif text-lg text-white sm:text-xl">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              className="aspect-video w-full bg-black object-cover"
            >
              Your browser does not support video playback.
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
