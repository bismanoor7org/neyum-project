"use client";

import { useState } from "react";
import type { ContentStatus } from "@prisma/client";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

export const STATUS_OPTIONS: { value: ContentStatus; label: string }[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "PENDING_REVIEW", label: "Pending review" },
  { value: "NEEDS_CHANGES", label: "Needs changes" },
  { value: "APPROVED", label: "Approved" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

export function CmsField({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className ? `block space-y-1.5 ${className}` : "block space-y-1.5"}>
      <span className="admin-text-subtle text-xs font-medium">{label}</span>
      {children}
      {hint && <span className="admin-text-subtle block text-[10px]">{hint}</span>}
    </label>
  );
}

export function CmsTextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="admin-input w-full" {...props} />;
}

export function CmsTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="admin-input min-h-24 w-full" {...props} />;
}

export function CmsSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      className="admin-input w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function CmsStatusField({
  value,
  onChange,
}: {
  value: ContentStatus;
  onChange: (v: ContentStatus) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CmsSelect
        value={value}
        onChange={(v) => onChange(v as ContentStatus)}
        options={STATUS_OPTIONS}
      />
      <StatusBadge status={value} />
    </div>
  );
}

export function CmsScheduleField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <CmsField label="Publish at" hint="Required when status is Scheduled. Server cron promotes content automatically.">
      <CmsTextInput
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </CmsField>
  );
}

export function CmsPublishBar({
  status,
  onStatusChange,
  publishAt,
  onPublishAtChange,
  onPublishNow,
  onSaveDraft,
  saving,
}: {
  status: ContentStatus;
  onStatusChange: (s: ContentStatus) => void;
  publishAt?: string;
  onPublishAtChange?: (v: string) => void;
  onPublishNow?: () => void;
  onSaveDraft?: () => void;
  saving?: boolean;
}) {
  return (
    <div className="admin-card flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold/20 bg-gold/5 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="admin-text-subtle text-xs font-semibold uppercase tracking-wide">Workflow</span>
        <CmsStatusField value={status} onChange={onStatusChange} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {status === "SCHEDULED" && onPublishAtChange && (
          <CmsTextInput
            type="datetime-local"
            value={publishAt ?? ""}
            onChange={(e) => onPublishAtChange(e.target.value)}
            className="text-xs"
          />
        )}
        {onSaveDraft && (
          <button
            type="button"
            disabled={saving}
            onClick={onSaveDraft}
            className="rounded-lg border border-foreground/15 px-3 py-1.5 text-xs font-medium"
          >
            Save draft
          </button>
        )}
        {onPublishNow && (
          <button
            type="button"
            disabled={saving}
            onClick={onPublishNow}
            className="rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white"
          >
            Publish now
          </button>
        )}
      </div>
    </div>
  );
}

export function CmsFormActions({
  saving,
  error,
  onDelete,
  previewHref,
  submitLabel = "Save",
}: {
  saving: boolean;
  error?: string | null;
  onDelete?: () => void;
  previewHref?: string;
  submitLabel?: string;
}) {
  return (
    <div className="space-y-3">
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-navy disabled:opacity-50"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {previewHref && (
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-foreground/15 px-4 py-2 text-sm font-medium"
          >
            Preview
          </a>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export function useCmsFormState() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return { saving, setSaving, error, setError };
}
