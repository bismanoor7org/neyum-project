"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  BookOpen,
  FileText,
  Globe2,
  HelpCircle,
  Home,
  ImageIcon,
  Map,
  MessageSquareQuote,
  Menu,
  Search,
  Shield,
  ShieldCheck,
  Car,
  Tag,
  BedDouble,
  Mail,
  ShoppingBag,
  Newspaper,
  FolderTree,
  Tags,
  Settings,
  Users,
  LayoutTemplate,
  Sparkles,
  GitPullRequest,
  KeyRound,
} from "lucide-react";
import { ALL_CMS_MODULES, CMS_MODULES, CMS_OPS_MODULES } from "@/lib/cms/modules";
import { CmsGlobalSearch } from "@/components/cms/CmsGlobalSearch";
import { cn } from "@/lib/utils";

const MODULE_ICONS = {
  homepage: Home,
  pages: LayoutTemplate,
  posts: Newspaper,
  destinations: Map,
  tours: BookOpen,
  accommodations: BedDouble,
  guides: FileText,
  visa: Globe2,
  deals: Tag,
  categories: FolderTree,
  tags: Tags,
  seo: Search,
  media: ImageIcon,
  navigation: Menu,
  workflow: GitPullRequest,
  ai: Sparkles,
  settings: Settings,
  users: Users,
  roles: Shield,
  sessions: KeyRound,
  activity: Activity,
  analytics: BarChart3,
  leads: Mail,
  bookings: ShoppingBag,
  faqs: HelpCircle,
  testimonials: MessageSquareQuote,
  transport: Car,
  "supplier-approval": ShieldCheck,
} as const;

function NavSection({
  title,
  modules,
  pathname,
}: {
  title: string;
  modules: typeof ALL_CMS_MODULES;
  pathname: string;
}) {
  return (
    <div className="mt-4">
      <p className="admin-text-subtle mb-1 px-2.5 text-[9px] font-bold uppercase tracking-[0.2em]">{title}</p>
      <div className="space-y-0.5">
        {modules.map((module) => {
          const Icon = MODULE_ICONS[module.id as keyof typeof MODULE_ICONS] ?? Globe2;
          const active = pathname === module.href || pathname.startsWith(`${module.href}/`);
          return (
            <Link
              key={module.id}
              href={module.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-medium transition-colors",
                active
                  ? "bg-gold/12 text-gold"
                  : "admin-text-subtle hover:bg-black/5 hover:text-[var(--admin-text)]",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span className="truncate">{module.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CmsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-card w-full shrink-0 rounded-xl p-3 lg:w-60">
      <div className="mb-3 px-2">
        <p className="admin-text-subtle text-[10px] font-bold uppercase tracking-[0.28em]">Content CMS</p>
        <Link href="/admin/cms" className="admin-text mt-1 block font-serif text-lg hover:text-gold">
          My Fiji Tour
        </Link>
      </div>
      <NavSection title="Content" modules={CMS_MODULES} pathname={pathname} />
      <NavSection title="Operations" modules={CMS_OPS_MODULES} pathname={pathname} />
      <NavSection
        title="More"
        modules={ALL_CMS_MODULES.filter(
          (m) =>
            !CMS_MODULES.some((c) => c.id === m.id) &&
            !CMS_OPS_MODULES.some((o) => o.id === m.id),
        )}
        pathname={pathname}
      />
    </aside>
  );
}

export function CmsLayoutGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <CmsSidebar />
      <div className="min-w-0 flex-1">
        <CmsGlobalSearch />
        {children}
      </div>
    </div>
  );
}
