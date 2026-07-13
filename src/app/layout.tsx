import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { LocaleMetaSync } from "@/components/seo/LocaleMetaSync";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { AnalyticsScripts } from "@/components/seo/AnalyticsScripts";
import { ConciergeFab } from "@/components/layout/ConciergeFab";
import { localeBootstrapScript } from "@/lib/i18n/locale-storage";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/config";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./critical.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Fiji luxury travel",
    "Fiji island vacations",
    "Fiji resorts",
    "Fiji travel guide",
    "things to do in Fiji",
    "best places to visit in Fiji",
  ],
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: "/hero-luxury.png", width: 1200, height: 630, alt: "Fiji luxury island vacation" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FijiLuxury",
    creator: "@FijiLuxury",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${THEME_STORAGE_KEY}");var dark=t==="dark";if(dark){d.classList.add("dark");d.style.colorScheme="dark"}else{d.classList.remove("dark");d.style.colorScheme="light"}}catch(e){}})();`;
  const localeScript = localeBootstrapScript();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full bg-background`}
      style={{ backgroundColor: "var(--background)" }}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-full flex flex-col bg-background font-sans text-foreground antialiased"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <ThemeProvider>
          <SiteJsonLd />
          <AnalyticsScripts />
          <LocaleProvider>
            <LocaleMetaSync />
            <AuthProvider>
              {children}
              <ConciergeFab />
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
