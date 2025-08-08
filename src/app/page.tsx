"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./components/Header";
import HeroSection from "./components/HeroSection";
import { JourneySection } from "./components/JourneySection";
import { CompanyLogos } from "./components/CompanyLogos";
import { BuiltByEngineers } from "./components/BuiltByEngineers";
import { AlumniTestimonials } from "./components/AlmuniTestimonals";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";

export default function LandingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const accessToken =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (accessToken) {
      const role =
        localStorage.getItem("role") ||
        sessionStorage.getItem("role");

      if (role === "applicant") {
        router.replace("/applicant/dashboard");
      } else if (role === "reviewer") {
        router.replace("/reviewer/dashboard");
      } else if (role === "manager") {
        router.replace("/manager/dashboard");
      } else if (role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/default/dashboard");
      }
    } else {
      setChecking(false);
    }
  }, [router]);

  
  if (checking) {
    return null;
  }

  return (
    <>
      <Header />
      <HeroSection />
      <CompanyLogos />
      <JourneySection />
      <BuiltByEngineers />
      <AlumniTestimonials />
      <CallToAction />
      <Footer />
    </>
  );
}