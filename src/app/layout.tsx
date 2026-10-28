import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Top G Global | Transforming Ordinary People into Giants",
  description: "Top G Global — the journey of becoming.",
  robots: {index: false, follow: false},
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>
    {children}
    <Script src="/cinematic-sculpture.js" strategy="afterInteractive" />
    <Script src="/cinematic-atmosphere.js" strategy="afterInteractive" />
  </body></html>;
}
