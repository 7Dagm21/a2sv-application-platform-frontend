"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCycles,
  selectActiveCycle,
} from "@/src/app/store/slices/cycleSlice";
import { fetchProfile } from "@/src/app/store/slices/profileSlice";
import { AppDispatch, RootState } from "@/src/app/store";
import HeaderWelcome from "@/src/app/components/Header/HeaderWelcome";
import { Header } from "@/src/app/components/Header/HeaderDashboard";
import Footer from "@/src/app/components/Footer/minFooter";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();
  const router = useRouter();

  const profile = useSelector((state: RootState) => state.profile.data);
  const activeCycle = useSelector(selectActiveCycle);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);
  const cycleLoading = useSelector((state: RootState) => state.cycle.loading);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  // If authenticated but no token, sign out to prevent loop
  useEffect(() => {
    if (status === "authenticated" && !session?.accessToken) {
      signOut({ callbackUrl: "/auth/login" });
    }
  }, [status, session, router]);

  // Fetch profile if not loaded and authenticated
  useEffect(() => {
    if (
      status === "authenticated" &&
      !profile &&
      !loading &&
      session?.accessToken
    ) {
      dispatch(fetchProfile(session.accessToken));
    }
  }, [status, profile, loading, session, dispatch]);

  // Fetch cycles only if authenticated
  useEffect(() => {
    if (status === "authenticated" && !cycleLoading && !activeCycle) {
      dispatch(fetchCycles());
    }
  }, [status, dispatch, cycleLoading, activeCycle]);

  if (status === "loading" || loading || cycleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-indigo-600 font-semibold">Loading...</span>
      </div>
    );
  }

  // Show a friendly error and a logout button if token is invalid/expired
  if (
    error &&
    (error.toLowerCase().includes("invalid") ||
      error.toLowerCase().includes("expired"))
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <div>Error loading profile: {error}</div>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          Log out and try again
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading profile: {error}
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <Header />
      <HeaderWelcome username={profile?.full_name || "Applicant"} />
      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Left: Cycle Card */}
        <section className="flex-1 flex flex-col items-center md:items-start">
          <div className="w-full max-w-xl bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-white text-lg sm:text-xl font-semibold mb-2">
              {activeCycle ? activeCycle.name : "No Active Cycle"}
            </h2>
            <p className="text-indigo-100 mb-4">
              {activeCycle
                ? "It's time to submit your application and show us your potential."
                : "No application cycle is currently active."}
            </p>
            <button
              className={`font-semibold px-4 py-2 rounded shadow transition ${
                activeCycle
                  ? "bg-white text-indigo-700 hover:bg-indigo-50"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!activeCycle}
              onClick={() => {
                if (activeCycle) {
                  router.push("/applicant/applicationForms/step1");
                }
              }}
            >
              Start Application
            </button>
          </div>
        </section>

        {/* Right: Profile/Checklist/Resources */}
        <aside className="flex-1 flex flex-col gap-4">
          {/* Profile Completion */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800 text-sm">
                Complete Your Profile
              </span>
              <span className="text-xs text-indigo-600 font-bold">
                75% COMPLETE
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: "75%" }}
              />
            </div>
            <a
              href="/profile"
              className="text-xs text-indigo-600 hover:underline font-medium"
            >
              Go to profile &rarr;
            </a>
          </div>

          {/* Application Checklist */}
          <div className="bg-white rounded-lg shadow p-4">
            <span className="font-semibold text-gray-800 text-sm block mb-2">
              Application Checklist
            </span>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>✓ Create an Account</li>
              <li>✓ Fill Personal Information</li>
              <li>✓ Submit Coding Profiles</li>
              <li>✓ Write Essays</li>
              <li>✓ Upload Resume</li>
            </ul>
          </div>

          {/* Helpful Resources */}
          <div className="bg-white rounded-lg shadow p-4">
            <span className="font-semibold text-gray-800 text-sm block mb-2">
              Helpful Resources
            </span>
            <ul className="text-xs text-indigo-700 space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Tips for a Great Application
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  A2SV Problem Solving Guide
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <Footer />
    </main>
  );
}
