"use client";

import { Component, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface ToolErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ToolErrorBoundaryState {
  hasError: boolean;
}

export class ToolErrorBoundary extends Component<
  ToolErrorBoundaryProps,
  ToolErrorBoundaryState
> {
  constructor(props: ToolErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ToolErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="card-luxury flex items-start gap-4 p-6"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-coral" strokeWidth={1.5} />
            <div>
              <p className={cn(ds.headingCard, "text-lg")}>Something went wrong</p>
              <p className="mt-1 text-sm text-foreground/65">
                This section could not load. Refresh the page or try again shortly.
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
