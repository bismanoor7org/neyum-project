"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { MediaPicker } from "@/components/cms/MediaPicker";
import { CmsField, CmsTextInput } from "@/components/cms/forms/CmsFormFields";

export function CmsImageField({
  label,
  value,
  onChange,
  hint,
  className,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  className?: string;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <CmsField label={label} hint={hint} className={className}>
      <div className="flex gap-2">
        <CmsTextInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or pick from library"
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-foreground/15 px-3 py-2 text-xs font-medium"
        >
          <ImageIcon className="h-3.5 w-3.5" />
          Browse
        </button>
      </div>
      {value ? (
        <div className="relative mt-2 h-24 w-40 overflow-hidden rounded-lg border border-black/10 bg-black/5">
          <Image src={value} alt="" fill className="object-cover" sizes="160px" />
        </div>
      ) : null}
      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={onChange}
      />
    </CmsField>
  );
}
