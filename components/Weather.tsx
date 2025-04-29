// components/WeatherWidget.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchWeatherByCoords } from "@/lib/weatherService";
import { Card, CardContent } from "@/components/ui/card";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeather(data);
          } catch (err) {
            console.error("Failed to fetch weather", err);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, []);

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardContent className="flex flex-col items-center gap-4 p-4">
        <h2 className="text-lg font-bold">🌦️ Weather</h2>
        {weather ? (
          <div className="text-center space-y-1">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Weather icon"
              className="mx-auto"
            />
            <p className="text-xl font-semibold">{weather.city}</p>
            <p>{weather.temp}°C</p>
            <p>{weather.wind} m/s wind</p>
            <p className="capitalize">{weather.description}</p>
          </div>
        ) : (
          <p>Detecting location...</p>
        )}
      </CardContent>
    </Card>
  );
}
