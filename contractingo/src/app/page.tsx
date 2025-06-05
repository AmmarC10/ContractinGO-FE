import { Header } from "./components/layout";
import { HeroSearch } from "./components/search/HeroSearch";
import { JobSeekerCTA } from "./components/search/JobSeekerCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <HeroSearch />
      <JobSeekerCTA />
    </main>
  );
}
