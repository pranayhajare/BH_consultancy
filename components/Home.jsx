import Hero from './Hero';
import About from './About';
import Businesses from './Businesses';
import Services from './Services';
import CoreValues from './CoreValues';
import CoE from './CoE';
import Team from './Team';
import VisionMission from './VisionMission';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Team />
      <VisionMission />
      <Businesses />
      <CoreValues />
      <Services />
      <CoE />
    </main>
  );
}
