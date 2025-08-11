const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://a2sv-application-platform-backend-team6.onrender.com";

export async function fetchData<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: "no-store", // Ensure fresh data for the dashboard
    });

    if (!response.ok) {
      console.error(
        `API error for ${endpoint}: ${response.status} ${response.statusText}`
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    return null;
  }
}
