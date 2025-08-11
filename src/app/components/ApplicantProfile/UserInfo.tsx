"use client";

import { useState } from "react";

interface UserData {
  name: string;
  email: string;
  role: string;
}

interface UserInfoProps {
  user?: UserData;
}

export default function UserInfo({ user }: UserInfoProps) {
  const [userData, setUserData] = useState<UserData>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "Applicant",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempData, setTempData] = useState<UserData>({ ...userData });

  const handleEditClick = () => {
    setTempData({ ...userData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserData({ ...tempData });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save changes", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Personal Information
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-500">Full name</p>
            {isEditing ? (
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">{userData.name}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500">Email address</p>
            {isEditing ? (
              <input
                type="email"
                value={tempData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-800 font-medium">{userData.email}</p>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            {isEditing ? (
              <select
                value={tempData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Applicant">Applicant</option>
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
                <option value="Admin">Admin</option>
              </select>
            ) : (
              <p className="text-gray-800 font-medium">{userData.role}</p>
            )}
          </div>

          <div className="flex justify-end bg-[#FAF9FB] p-2 gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEditClick}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
