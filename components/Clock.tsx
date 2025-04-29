"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClockWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Card className="w-full h-full rounded-2xl bg-muted text-white shadow-md p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold tracking-widest">
          {formatTime(currentTime)}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center text-sm mt-2 opacity-75">
        {formatDate(currentTime)}
      </CardContent>
    </Card>
  );
};

export default ClockWidget;
