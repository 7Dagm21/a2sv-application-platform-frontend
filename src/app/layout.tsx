"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ApplicationFormProvider } from "../lib/ApplicationFormContext";
import { Provider } from "react-redux";
import { store } from "./store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      </body>
    </html>
  );
}
