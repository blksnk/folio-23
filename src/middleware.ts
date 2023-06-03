import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const paris: [string, string] = ["48.864716", "2.349014"]
const apiKey = "f115ead50198e684178b9d2eeef664fd"

const fetchWeather = async ([lat, lon]: [string, string]) => {
  return "unknown" // save on api calls during dev
  try {
    const req = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&exclude=minutely,hourly,daily,alerts`
    const res = await fetch(req)
    const data = await res.json()
    if(data?.current?.weather[0]) return data?.current?.weather[0].main as string;
    return 'unknown'
  }
  catch(e) {
    console.warn(e)
    return 'unknown'
  }
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const hasRequestGeo = request.geo?.latitude && request.geo?.longitude && request.geo?.city;
  const weather = await fetchWeather(hasRequestGeo ? [request.geo.latitude, request.geo.longitude] as [string, string] : paris)
  const city = request.geo?.city ?? "Paris";
  requestHeaders.set('x-request-city', city);
  requestHeaders.set('x-request-weather', weather);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
  return response
}

export const config = {
  matcher: '/new',
}