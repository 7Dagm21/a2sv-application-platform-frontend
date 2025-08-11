"use client";

import { ApplicationFormProvider } from "../lib/ApplicationFormContext";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import type { AppDispatch } from "./store";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { fetchProfile } from "./store/slices/profileSlice";
import { useSession } from "next-auth/react";
function ProfileFetcher({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      dispatch(fetchProfile(session.accessToken));
    }
  }, [dispatch, session, status]);

  return <>{children}</>;
}

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Toaster />
      <ProfileFetcher>
        <ApplicationFormProvider>{children}</ApplicationFormProvider>
      </ProfileFetcher>
    </Provider>
  );
}
