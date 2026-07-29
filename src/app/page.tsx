import { Navigation } from "@/components/navigation";
import { KinemorLanding } from "@/components/kinemor-landing";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="site-main aura-kine-page">
      <Navigation />
      <KinemorLanding />
      <SiteFooter />
    </main>
  );
}
