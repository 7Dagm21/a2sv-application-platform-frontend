import React from "react";


export default function CreateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-1 p-8">
        {children}
      </main>
     
    </div>
  );
}
