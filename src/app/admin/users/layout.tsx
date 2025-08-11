import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function CreateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar /> 
      <main className="flex-1 p-8">
        {children}
      </main>
     <Footer/>
    </div>
  );
}
