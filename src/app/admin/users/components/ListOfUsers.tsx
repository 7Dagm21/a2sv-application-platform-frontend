"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
};


const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ListOfUsersProps {
  roleFilter: string;
}

const ListOfUsers: React.FC<ListOfUsersProps> = ({ roleFilter }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams?.get("page") || "1", 10);
  const initialLimit = parseInt(searchParams?.get("limit") || "10", 10);

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = session?.accessToken;
        if (!token) {
          throw new Error("No access token found in session.");
        }

        let url = `${API_URL}/admin/users?page=${page}&limit=${limit}`;
        if (roleFilter && roleFilter !== "All Roles") {
          url += `&role=${encodeURIComponent(roleFilter.toLowerCase())}`;
        }

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();

        if (data && Array.isArray(data.items)) {
          setUsers(data.items);
          setTotal(data.total_count || 0);
        } else {
          setUsers([]);
          setTotal(0);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching users");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [status, session, page, limit, roleFilter]);

  if (status === "loading") {
    return <div>Loadin...</div>;
  }

  if (status !== "authenticated") {
    return <div>You must be logged in to view this page.</div>;
  }

  if (session?.user?.role !== "admin") {
    return <div>You are not authorized to view this content.</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
        <table className="min-w-[600px] w-full text-xs sm:text-sm text-left border-separate border-spacing-0">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              
              <th className="px-6 py-3 border-b border-gray-200">Name</th>
             <th className="px-6 py-3 border-b border-gray-200">Role</th>
              <th className="px-6 py-3 border-b border-gray-200">Status</th>
              <th className="px-6 py-3 text-right border-b border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
  {users.map((user) => (
    <tr
      key={user.id}
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => router.push(`/admin/users/view/${user.id}`)}
    >
      <td className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Image
            src={"/default-avatar.png"}
            alt={user.full_name}
            width={32}
            height={32}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{user.full_name}</div>
            <div className="text-gray-500 text-xs">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 border-b border-gray-100">{user.role}</td>
      <td className="px-6 py-4 border-b border-gray-100">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.is_active
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {user.is_active ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4 border-b border-gray-100 text-right space-x-2">
        <button
          className="text-blue-600 hover:underline text-xs"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/users/update/${user.id}`);
          }}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:underline text-xs"
          onClick={async (e) => {
            e.stopPropagation();
            const confirmed = confirm(`Are you sure you want to delete ${user.full_name}?`);
            if (!confirmed) return;

            try {
              const token = session?.accessToken;
              const res = await fetch(`${API_URL}/admin/users/${user.id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ full_name: user.full_name }),
              });

              const data = await res.json();
              if (!res.ok || !data.success)
                throw new Error(data.message || "Failed to delete user");

              // Remove deleted user from list
              setUsers((prev) => prev.filter((u) => u.id !== user.id));
              setTotal((prev) => prev - 1);
            } catch (err) {
              alert("Error deleting user");
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      <div className="mt-10 border-gray-200">
        <Pagination
          page={page}
          pageSize={limit}
          total={total}
          onPageChange={(newPage) => {
            setPage(newPage);
            router.push(`/admin/users?page=${newPage}&limit=${limit}`);
          }}
        />
      </div>
    </>
  );
};

export default ListOfUsers;
