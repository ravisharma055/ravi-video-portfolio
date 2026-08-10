import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SelectedWork } from '@/components/SelectedWork';
import { EditingPhilosophy } from '@/components/EditingPhilosophy';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { About, WhyRavi } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-bone-50 selection:bg-accent selection:text-ink-950">
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <EditingPhilosophy />
        <Services />
        <Process />
        <About />
        <WhyRavi />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
