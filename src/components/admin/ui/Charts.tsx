"use client";

import { cn } from "@/lib/utils";
import type { ChartPoint } from "@/lib/admin/types";

type ChartProps = {
  data: ChartPoint[];
  height?: number;
  className?: string;
  color?: string;
  formatValue?: (v: number) => string;
};

function normalize(data: ChartPoint[]) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return data.map((d) => ({ ...d, pct: d.value / max }));
}

export function AreaChart({
  data,
  height = 200,
  className,
  color = "#d4a574",
  formatValue = (v) => v.toLocaleString(),
}: ChartProps) {
  const normalized = normalize(data);
  const width = 100;
  const pad = 2;

  const points = normalized.map((d, i) => {
    const x = pad + (i / Math.max(normalized.length - 1, 1)) * (width - pad * 2);
    const y = height - pad - d.pct * (height - pad * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? 0} ${height - pad} L ${points[0]?.x ?? 0} ${height - pad} Z`;

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-[200px] w-full"
        role="img"
        aria-label="Area chart"
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((pct) => (
          <line
            key={pct}
            x1={pad}
            y1={height - pad - pct * (height - pad * 2)}
            x2={width - pad}
            y2={height - pad - pct * (height - pad * 2)}
            className="admin-chart-grid"
            strokeWidth="0.3"
          />
        ))}
        <path d={areaPath} fill="url(#areaGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r="1.2" fill={color} />
        ))}
      </svg>
      <div className="mt-3 flex justify-between gap-1">
        {data.map((d) => (
          <span key={d.label} className="admin-text-subtle text-[10px]">
            {d.label}
          </span>
        ))}
      </div>
      <p className="sr-only">
        {data.map((d) => `${d.label}: ${formatValue(d.value)}`).join(", ")}
      </p>
    </div>
  );
}

export function BarChart({
  data,
  height = 180,
  className,
  color = "#082b4b",
}: ChartProps) {
  const normalized = normalize(data);

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="h-[180px] w-full"
        role="img"
        aria-label="Bar chart"
      >
        {normalized.map((d, i) => {
          const barH = d.pct * (height - 20);
          const x = i * (100 / data.length) + 100 / (data.length * 2) / 2;
          const y = height - 10 - barH;
          const barWidth = 100 / (data.length * 2);
          return (
            <rect
              key={d.label}
              x={x}
              y={y}
              width={barWidth}
              height={barH}
              rx="1"
              fill={color}
              opacity={0.7 + d.pct * 0.3}
            />
          );
        })}
      </svg>
      <div className="mt-3 flex justify-between gap-1">
        {data.map((d) => (
          <span key={d.label} className="admin-text-subtle text-[10px]">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HorizontalBarChart({
  data,
  className,
  color = "#0e5a67",
  formatValue = (v) => v.toLocaleString(),
}: ChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("space-y-3", className)}>
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between gap-2 text-xs">
            <span className="admin-text truncate font-medium">{d.label}</span>
            <span className="admin-text-muted shrink-0 tabular-nums">
              {formatValue(d.value)}
            </span>
          </div>
          <div className="admin-progress-track h-2 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartCard({
  title,
  subtitle,
  children,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("admin-card-md rounded-2xl p-6", className)}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="admin-text text-sm font-semibold">{title}</h3>
          {subtitle && (
            <p className="admin-text-subtle mt-0.5 text-xs">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
