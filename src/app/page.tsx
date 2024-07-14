import AiBodyCardHeader from "@/components/AiBodyCardHeader";
import GfConfigForm from "@/components/GfConfigForm";
import AiBody from "@/components/gfv2/AiBody";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <AiBodyCardHeader />
      {/* <GfConfigForm /> */}
      <AiBody />
    </main>
  );
}
