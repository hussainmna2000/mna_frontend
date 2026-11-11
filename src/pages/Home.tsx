import Hero from '../components/home/Hero';
import StatsSection from '../components/home/StatsSection';
import FeaturedProjects from '../components/home/FeaturedProjects';
import BentoGrid from '../components/home/BentoGrid';
import ConstructionTimeline from '../components/home/ConstructionTimeline';
import NearbyMapSection from '../components/home/NearbyMapSection';

interface HomeProps {
  darkMode: boolean;
}

export default function Home({ darkMode }: HomeProps) {
  return (
    <div className="space-y-0">
      <Hero darkMode={darkMode} />
      <StatsSection darkMode={darkMode} />
      <FeaturedProjects darkMode={darkMode} />
      <BentoGrid darkMode={darkMode} />
      <ConstructionTimeline darkMode={darkMode} />
      <NearbyMapSection darkMode={darkMode} />
    </div>
  );
}
