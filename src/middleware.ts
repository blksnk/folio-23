import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

const paris: [string, string] = ["48.864716", "2.349014"];
const apiKey = "f115ead50198e684178b9d2eeef664fd";

const fetchWeather = async ([lat, lon]: [string, string]) => {
  // return "unknown" // save on api calls during dev
  try {
    const req = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=minutely,hourly,daily,alerts`;
    const res = await fetch(req);
    const data = await res.json();
    if (data?.current?.weather[0])
      return data?.current?.weather[0].main as string;
    return "unknown";
  } catch (e) {
    console.warn(e);
    return "unknown";
  }
};

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const geo = geolocation(request);

  const hasRequestGeo = geo?.latitude && geo?.longitude && geo?.city;
  const weather = await fetchWeather(
    hasRequestGeo ? ([geo.latitude, geo.longitude] as [string, string]) : paris
  );
  const city = geo?.city ?? "Paris";
  requestHeaders.set("x-request-city", city);
  requestHeaders.set("x-request-weather", weather);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/",
};
