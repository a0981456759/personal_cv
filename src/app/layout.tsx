import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-tc",
});

export const metadata: Metadata = {
  title: "howard@cv ~ %",
  description: "Howard Wang | Full-Stack Engineer, Web3 & AI — Terminal CV",
  keywords: ["Full-Stack", "Web3", "AI", "DeFi", "Quantitative Trading", "Melbourne"],
  authors: [{ name: "Howard Wang" }],
  openGraph: {
    title: "howard@cv ~ % whoami",
    description: "Howard Wang — Full-Stack Engineer bridging AI, Web3, and quantitative trading",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${jetbrainsMono.variable} ${notoSansTC.variable}`}>
      <body>{children}</body>
    </html>
  );
}
