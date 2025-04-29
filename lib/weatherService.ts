// lib/weatherService.ts
export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) throw new Error("Failed to fetch weather");

  const data = await response.json();
  return {
    city: data.name,
    temp: data.main.temp,
    wind: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};
