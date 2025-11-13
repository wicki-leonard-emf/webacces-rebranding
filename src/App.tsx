// @ts-nocheck
import AnimatedHeader from "./components/AnimatedHeader";
import { PricingSection } from "./components/PricingSection";
import Loader from "./components/Loader";
import useAppReady from "./hooks/useAppReady";
// Preload header images to ensure animations mount with assets ready
import imgArriere from "./assets/logo-arriere.png";
import imgImage from "./assets/rania.png";
import imgImage1 from "./assets/lionel.png";
import imgImage2 from "./assets/dario.png";

export default function App() {
  // Loader "tout court": show a simple splash for a fixed duration (no asset gating)
  const ready = useAppReady([], 1200);

  return (
    <div className="min-h-screen bg-background relative">
      {!ready && <Loader />}
      {ready && (
        <>
          <AnimatedHeader />
          <PricingSection />
        </>
      )}
    </div>
  );
}