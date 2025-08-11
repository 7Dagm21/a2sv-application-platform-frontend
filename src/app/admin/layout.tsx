import type { Metadata } from "next";
import "../../app/globals.css";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoMono.variable}>
      <head>
        <style>{`
html {
  font-family: var(--font-mono);
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
