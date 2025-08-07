// components/ProfileHeader.tsx
"use client";

import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  userName: string;
  logoUrl?: string;
}

export default function HeaderProfile({
  userName,
  logoUrl,
}: ProfileHeaderProps) {
  const router = useRouter();

  const handleDashboardClick = () => router.push("/dashboard");
  const handleProfileClick = () => router.push("/profile");
  const handleLogoutClick = () => {
    // Add logout logic
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex justify-items-start">
          {logoUrl && <img src={logoUrl} alt="Logo" className="h-8 w-auto" />}
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={handleDashboardClick} className="...">
            Dashboard
          </button>
          <button onClick={handleProfileClick} className="...">
            Profile
          </button>
          <span className="...">{userName}</span>
          <button onClick={handleLogoutClick} className="...">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
