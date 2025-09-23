import Navbar from "@/components/layout/Navbar";
export default function HomePage() {
  return (
    <>
      <Navbar /> {/* Add the Navbar here */}
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold tracking-tight">NexusAI Platform</h1>
        <p className="mt-4 text-muted-foreground">The AI Agent for your business.</p>
      </main>
    </>
  );
}