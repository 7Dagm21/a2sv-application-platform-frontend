const API_BASE = "https://a2sv-application-platform-backend-team6.onrender.com";

// Get current user profile
export const getProfile = async (token: string) => {
  const res = await fetch(`${API_BASE}/profile/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

// Update user profile
export const updateProfile = async (
  token: string,
  fullName: string,
  email: string
) => {
  const res = await fetch(`${API_BASE}/profile/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ full_name: fullName, email }),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};

// Change password
export const changePassword = async (
  token: string,
  oldPassword: string,
  newPassword: string
) => {
  const res = await fetch(`${API_BASE}/profile/me/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
  });
  if (!res.ok) throw new Error("Failed to change password");
  return res.json();
};
