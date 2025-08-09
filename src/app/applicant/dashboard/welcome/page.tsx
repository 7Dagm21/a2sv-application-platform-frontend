"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "@/src/app/store/slices/profileSlice";
import {
  fetchCycles,
  selectActiveCycle,
} from "@/src/app/store/slices/cycleSlice";
import {
  fetchApplication,
  selectCurrentApplication,
} from "@/src/app/store/slices/applicationSlice";
import { RootState, AppDispatch } from "@/src/app/store";
import HeaderWelcome from "@/src/app/components/Header/HeaderWelcome";
import { Header } from "@/src/app/components/Header/HeaderDashboard";
import Footer from "@/src/app/components/Footer/minFooter";
export default function WelcomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.data);
  const cycles = useSelector((state: RootState) => state.cycle.cycles);
  const activeCycle = useSelector(selectActiveCycle);
  const applications = useSelector(selectCurrentApplication);
  const loading = useSelector(
    (state: RootState) =>
      state.cycle.loading || state.application.loading || state.profile.loading
  );

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchCycles());
    // Get applicationId from localStorage or another source
    const applicationId =
      typeof window !== "undefined"
        ? localStorage.getItem("applicationId")
        : null;
    if (applicationId) {
      dispatch(fetchApplication(applicationId));
    }
  }, [dispatch]);

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
              className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded shadow hover:bg-indigo-50 transition"
              disabled={!activeCycle}
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
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
          <span className="text-indigo-600 font-semibold">Loading...</span>
        </div>
      )}
      <Footer />
    </main>
  );
}
