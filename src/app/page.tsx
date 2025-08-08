"use client";

import React from "react";
import { Header } from "./components/Header";
import HeroSection from "./components/HeroSection";
import { JourneySection } from "./components/JourneySection";
import { CompanyLogos } from "./components/CompanyLogos";
import { BuiltByEngineers } from "./components/BuiltByEngineers";
import { AlumniTestimonials } from "./components/AlmuniTestimonals";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";

export default function LandingPage() {
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