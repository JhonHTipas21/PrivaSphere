import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrivaSphere - Decentralized Identity System",
  description: "Sistema de identidad digital descentralizada con credenciales verificables, Zero-Knowledge Proofs y estándares W3C DID",
  keywords: ["DID", "Blockchain", "Identity", "Polygon", "Web3", "Decentralized", "PrivaSphere"],
  authors: [{ name: "Tu Nombre" }],
  openGraph: {
    title: "PrivaSphere - Decentralized Identity",
    description: "Control total sobre tu identidad digital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
