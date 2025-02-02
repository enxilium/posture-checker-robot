"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardAnalytics } from "./dashboard-analytics";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const userId = searchParams?.get("userId");
  const [userData, setUserData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchAnalytics();
    }
  }, [userId]);

  // After fetching userData, update the cache file on the server.
  useEffect(() => {
    if (userData && userId) {
      updateCache();
    }
  }, [userData, userId]);

  async function fetchUserData() {
    try {
      const res = await fetch(`/api/user-data?userId=${userId}`);
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function fetchAnalytics() {
    try {
      const res = await fetch(`/api/get-past-user-posture?userId=${userId}`);
      const data = await res.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  }

  async function updateCache() {
    try {
      await fetch(`/api/cache-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: userData?.name,
          email: userData?.email,
        }),
      });
    } catch (error) {
      console.error("Error updating cache file:", error);
    }
  }

  const displayName = userData?.name || "Loading...";
  const displayEmail = userData?.email || "Loading...";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 space-y-8">
        <header className="flex items-center justify-between p-6 rounded-lg bg-white shadow">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">
                {displayName.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{displayName}</h2>
              <p className="text-gray-600">{displayEmail}</p>
            </div>
          </div>
        </header>

        <section>
          <h3 className="text-xl font-semibold mb-4">Your Analytics</h3>
          <DashboardAnalytics analyticsData={analyticsData} />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Additional Dashboard Content</h3>
          <p>
            This section can include more details about your posture records,
            trends over time, or any other relevant information fetched from your database.
          </p>
        </section>
      </div>
    </main>
  );
}