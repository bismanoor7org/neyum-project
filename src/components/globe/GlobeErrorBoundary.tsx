"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";

const FijiMapEngine = dynamic(
  () => import("@/components/map/FijiMapEngine").then((m) => m.FijiMapEngine),
  { ssr: false },
);

interface GlobeErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface GlobeErrorBoundaryState {
  hasError: boolean;
}

/** Prevents a texture/WebGL failure from breaking the whole page */
export class GlobeErrorBoundary extends Component<
  GlobeErrorBoundaryProps,
  GlobeErrorBoundaryState
> {
  constructor(props: GlobeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): GlobeErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

interface MapLibreFallbackProps {
  active: string;
  onSelect: (slug: string) => void;
  className?: string;
  compact?: boolean;
}

/** Reliable 2D globe fallback if Three.js fails */
export function MapLibreFallback({
  active,
  onSelect,
  className,
  compact,
}: MapLibreFallbackProps) {
  return (
    <FijiMapEngine
      active={active}
      onSelect={onSelect}
      className={className}
      defaultZoom={compact ? 6 : 2}
      minZoom={1}
      maxZoom={compact ? 12 : 14}
      flyToOnSelect
      showNavigation={!compact}
      skipInitialFly={compact}
    />
  );
}
