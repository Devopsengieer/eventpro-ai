import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AuthProvider } from "@/app/lib/AuthContext";
// import { BookingProvider } from "@/app/lib/BookingContext";

export const metadata: Metadata = {
  title: {
    default: "EventPro AI — Discover Events That Move You",
    template: "%s | EventPro AI",
  },
  description:
    "The world's most intelligent event discovery platform. AI-powered matching surfaces concerts, conferences, festivals, and more — tailored to who you are.",
  keywords: [
    "events",
    "conferences",
    "festivals",
    "concerts",
    "tickets",
    "AI",
    "event discovery",
  ],
  openGraph: {
    title: "EventPro AI — Discover Events That Move You",
    description:
      "AI-powered event discovery. Find concerts, conferences, festivals, and more.",
    type: "website",
    locale: "en_US",
    siteName: "EventPro AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventPro AI",
    description: "AI-powered event discovery platform.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getCurrentUser } = await import("@/app/actions/auth");
  const user = await getCurrentUser();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar user={user} />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
