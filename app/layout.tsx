import type { Metadata } from "next";
import { Geist, Geist_Mono, Anta } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anta = Anta({
  variable: "--font-anta",
  subsets: ["latin"],
  weight: "400"
});

const title = "Oguz Nurlu | Portfolio";
const description = "Portfolio of Oguz Nurlu, an Ankara-based software engineer working across full-stack and mobile development, AI agents and computer vision, and hardware-accelerated machine learning.";

export const metadata: Metadata = {
  metadataBase: new URL("https://oguznurlu.com"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Oguz Nurlu",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var isDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
