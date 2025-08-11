"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCycles } from "../../../lib/redux/slices/cycleSlice";
import { AppDispatch, RootState } from "../../../lib/redux/store";
import Header from "../../components/cycle-components/Header";
import Footer from "../../components/cycle-components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "../../components/cycle-components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, ChevronRight, PlusCircle, Loader2 } from "lucide-react";

export default function CycleDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { cycles, loading, error, total, page, limit } = useSelector(
    (state: RootState) => state.cycles
  );
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role?.toLowerCase() !== "admin") {
      router.push("/admin/login");
      return;
    }

    const loadData = async () => {
      try {
        await dispatch(fetchCycles({ page: 1, limit: 8 }));
      } catch (err) {
        console.error("Failed to load cycles:", err);
      } finally {
        setInitialLoad(false);
      }
    };

    loadData();
  }, [dispatch, router, session, status]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchCycles({ page: newPage, limit }));
  };

  if (status === "loading" || initialLoad) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-600" />
            <p className="mt-2 text-gray-600">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Error Loading Data
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              onClick={() => dispatch(fetchCycles({ page: 1, limit: 8 }))}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Retry
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Application Cycles
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all active and upcoming application cycles
              </p>
            </div>
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href="/admin/create-cycle" className="flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Cycle
              </Link>
            </Button>
          </div>

          {loading && (
            <div className="flex justify-center my-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {cycles.length > 0
              ? cycles.map((cycle) => {
                  const startDate = new Date(cycle.start_date);
                  const endDate = new Date(cycle.end_date);
                  const isActive =
                    cycle.is_active &&
                    new Date() >= startDate &&
                    new Date() <= endDate;

                  return (
                    <Card
                      key={cycle.id}
                      className="relative border border-gray-200 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col"
                    >
                      <div
                        className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                          isActive ? "bg-green-500" : "bg-blue-500"
                        }`}
                      />

                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                            {cycle.name}
                          </h3>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {cycle.country}
                          </Badge>
                        </div>

                        {cycle.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                            {cycle.description}
                          </p>
                        )}

                        <div className="space-y-2 mt-auto">
                          <div className="flex justify-between items-center mt-3">
                            <Badge variant={isActive ? "default" : "secondary"}>
                              {isActive ? "Active" : "Inactive"}
                            </Badge>
                            <Button variant="ghost" size="sm" asChild>
                              <Link
                                href={`/admin/cycles/${cycle.id}`}
                                className="text-purple-600"
                              >
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              : !loading && (
                  <div className="col-span-full text-center py-12">
                    <div className="text-gray-500 mb-4">
                      No application cycles found
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="border-purple-600 text-purple-600"
                    >
                      <Link href="/admin/cycles/create">
                        Create Your First Cycle
                      </Link>
                    </Button>
                  </div>
                )}
          </div>

          {cycles.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 border-t pt-6">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(page * limit, total)}
                </span>{" "}
                of <span className="font-medium">{total}</span> cycles
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1 || loading}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from(
                  { length: Math.min(5, Math.ceil(total / limit)) },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className="h-8 w-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= Math.ceil(total / limit) || loading}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
