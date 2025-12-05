import { cookies } from "next/headers";
import LandingPageClient from "@/components/LandingPageClient";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const isLoggedIn = !!token;

  return <LandingPageClient isLoggedIn={isLoggedIn} />;
}
