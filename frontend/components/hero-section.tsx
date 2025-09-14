import { CodeBlock } from "@/components/code-block"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Stop Building Recommendation Engines. <span className="text-primary">Hire an AI Agent.</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto">
          Integrate a world-class personalization agent into your app in minutes with our simple API.
        </p>

        <div className="max-w-2xl mx-auto">
          <CodeBlock />
        </div>
      </div>
    </section>
  )
}
