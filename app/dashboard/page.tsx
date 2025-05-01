"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/useUser";

import ClockCard from "@/components/Clock";
import WeatherCard from "@/components/Weather";
import TasksCard from "@/components/todoList";
import SpotifyWidget from "@/components/Spotify";
import UserProfile from "@/components/UserProfile";

export default function DashboardPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold">Dashboard</div>
        <div className="flex items-center gap-2">
          <UserProfile />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ClockCard />
        <WeatherCard />
        <TasksCard />
        <SpotifyWidget />
      </div>
    </div>
  );
}
