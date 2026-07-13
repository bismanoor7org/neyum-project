import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2 text-sm text-white/95 shadow-sm transition-all duration-200",
          "placeholder:text-white/30",
          "hover:border-white/18 hover:bg-black/50",
          "focus-visible:outline-none focus-visible:border-gold/50 focus-visible:ring-[3px] focus-visible:ring-gold/15",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-coral/70 ring-[3px] ring-coral/15 animate-[auth-shake_0.42s_ease]",
          className,
        )}
        ref={ref}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
