import TechPlayground from "@/components/TechPlayground";

export default function PlaygroundPage() {
  return (
    <main className="relative min-h-screen bg-dark-950 text-dark-200">
      <TechPlayground revealed={true} />
    </main>
  );
}
