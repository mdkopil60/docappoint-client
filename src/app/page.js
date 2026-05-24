import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TopRatedDoctors from "@/components/TopRatedDoctors";

export default function Home() {
  return (
    <>
      <Hero />
      <TopRatedDoctors/>
      <Stats />
    </>
  );
}