"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { WorldTour } from "@/lib/content/world/types";

export function TourCard({ tour, index = 0 }: { tour: WorldTour; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link
        href={`/explore/${tour.countrySlug}`}
        className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"
      >
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold">
            {tour.duration} · from {tour.priceFrom}
          </p>
          <h3 className="mt-1 font-serif text-lg text-white">{tour.title}</h3>
          <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] capitalize text-white/70">
            {tour.style}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function InspirationGallery() {
  const images = [
    "1506905925346-21bda4d32df4",
    "1514282401047-d79a71a590e8",
    "1493976040374-85c8e445f1af",
    "1613395877348-35f3ccf5ec36",
    "1502602898657-3e0015ccb509",
    "1485738422979-d7ca8d4ef1dd",
    "1516026672322-bc52d61a55d5",
    "1540959733332-eab4deabeeaf",
  ];

  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {images.map((id, i) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className="mb-4 break-inside-avoid overflow-hidden rounded-xl"
        >
          <Image
            src={`https://images.unsplash.com/photo-${id}?w=600&q=80`}
            alt="Travel inspiration"
            width={600}
            height={i % 2 === 0 ? 800 : 500}
            className="w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );
}
