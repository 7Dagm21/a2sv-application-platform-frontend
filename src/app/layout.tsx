"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ApplicationFormProvider } from "../lib/ApplicationFormContext";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";

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
    icon: "/images/a2sv-favicon.png",
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
        <Provider store={store}>
          <ApplicationFormProvider>{children}</ApplicationFormProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
