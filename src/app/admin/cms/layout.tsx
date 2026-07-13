"use client";

import { CmsLayoutGrid } from "@/components/cms/CmsShell";
import { CmsQueryProvider } from "@/components/cms/platform/CmsQueryProvider";
import { CmsCommandPalette } from "@/components/cms/platform/CmsCommandPalette";
import { CmsToastProvider } from "@/components/cms/platform/CmsToast";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <CmsQueryProvider>
      <CmsToastProvider>
        <CmsCommandPalette />
        <CmsLayoutGrid>{children}</CmsLayoutGrid>
      </CmsToastProvider>
    </CmsQueryProvider>
  );
}
