const BASE_URL = "https://a2sv-application-platform-backend-team6.onrender.com";

function getAccessToken(): string {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");
  if (!token) throw new Error("Not authenticated - please login");
  return token;
}

// ==== TYPES ====

export interface Cycle {
  id: number;
  name: string;
  description?: string;
  country: string;
  start_date: string;
  end_date: string;
  status?: string;
}

export interface PaginatedCycles {
  data: Cycle[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ==== API FUNCTIONS ====

export async function getCycles(page = 1, limit = 8): Promise<PaginatedCycles> {
  try {
    const token = getAccessToken();

    const res = await fetch(`${BASE_URL}/cycles?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = (await res.json().catch(() => ({}))) as {
        message?: string;
      };
      if (res.status === 401) {
        throw new Error("Authentication failed - please login again");
      } else if (res.status === 403) {
        throw new Error("Access denied - insufficient permissions");
      }
      throw new Error(
        errorData.message || `Error fetching cycles: ${res.statusText}`
      );
    }

    const json = (await res.json()) as {
      data?: { cycles?: Cycle[]; total_count?: number; page?: number };
    };

    const cycles = json.data?.cycles || [];
    const total = json.data?.total_count || cycles.length;
    const currentPage = json.data?.page || page;
    const totalPages = Math.ceil(total / limit);

    return {
      data: cycles,
      total,
      page: currentPage,
      totalPages,
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return {
      data: [],
      total: 0,
      page: 1,
      totalPages: 1,
    };
  }
}

export async function createCycle(
  data: Omit<Cycle, "id" | "status">
): Promise<ApiResponse<Cycle>> {
  try {
    const token = getAccessToken();

    const res = await fetch(`${BASE_URL}/admin/cycles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = (await res.json()) as {
      data?: Cycle;
      message?: string;
    };

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Authentication failed - please login again");
      } else if (res.status === 403) {
        throw new Error("Access denied - insufficient permissions");
      }
      throw new Error(
        responseData.message || `Create cycle failed: ${res.statusText}`
      );
    }

    return { success: true, data: responseData.data };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
}

export async function updateCycle(
  cycleId: number,
  data: Omit<Cycle, "id" | "status">
): Promise<ApiResponse<Cycle>> {
  try {
    const token = getAccessToken();

    const res = await fetch(`${BASE_URL}/admin/cycles/${cycleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = (await res.json()) as {
      data?: Cycle;
      message?: string;
    };

    if (!res.ok) {
      throw new Error(
        responseData.message || `Update cycle failed: ${res.statusText}`
      );
    }

    return { success: true, data: responseData.data };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
}

export async function deleteCycle(cycleId: number): Promise<ApiResponse<null>> {
  try {
    const token = getAccessToken();

    const res = await fetch(`${BASE_URL}/admin/cycles/${cycleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = (await res.json()) as { message?: string };

    if (!res.ok) {
      throw new Error(
        responseData.message || `Delete cycle failed: ${res.statusText}`
      );
    }

    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
}

export async function activateCycle(
  cycleId: number
): Promise<ApiResponse<Cycle>> {
  try {
    const token = getAccessToken();

    const res = await fetch(`${BASE_URL}/admin/cycles/${cycleId}/activate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = (await res.json()) as {
      data?: Cycle;
      message?: string;
    };

    if (!res.ok) {
      throw new Error(
        responseData.message || `Activate cycle failed: ${res.statusText}`
      );
    }

    return { success: true, data: responseData.data };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
}

export async function deactivateCycle(
  cycleId: number
): Promise<ApiResponse<Cycle>> {
  try {
    const token = getAccessToken();

    const res = await fetch(`${BASE_URL}/admin/cycles/${cycleId}/deactivate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = (await res.json()) as {
      data?: Cycle;
      message?: string;
    };

    if (!res.ok) {
      throw new Error(
        responseData.message || `Deactivate cycle failed: ${res.statusText}`
      );
    }

    return { success: true, data: responseData.data };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
}
