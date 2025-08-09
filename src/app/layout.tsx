import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientProviders from "@/src/app/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "A2SV Application",
  description:
    "A fully responsive and mobile-first solution for the A2SV Application Platform MVP",
  icons: {
    icon: "/a2sv-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
