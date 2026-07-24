import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Footer } from "@/components/Footer";
import { profile } from "@/lib/content";

// Body face: Inter (clean, neutral). Display face: Sora (geometric, a touch
// more character for headings) — a deliberate pairing, not the same family.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const { seo } = profile;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: `%s — ${profile.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: seo.siteUrl,
    title: seo.title,
    description: seo.description,
    siteName: profile.name,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    creator: seo.twitterHandle,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data for the person.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.roles.join(", "),
  url: seo.siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.social.github, profile.social.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
