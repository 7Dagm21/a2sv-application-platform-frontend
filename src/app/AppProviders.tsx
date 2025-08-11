"use client";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/src/app/store/index";
import ClientProviders from "@/src/app/ClientProviders";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <ClientProviders>{children}</ClientProviders>
      </ReduxProvider>
    </SessionProvider>
  );
}
