import { UploadCloud, Code, Rocket } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: UploadCloud,
      title: "Sync Your Catalog",
      description: "Upload your product data and let our AI understand your inventory.",
    },
    {
      number: 2,
      icon: Code,
      title: "Integrate the API",
      description: "Add our simple API endpoint to your existing application.",
    },
    {
      number: 3,
      icon: Rocket,
      title: "Go Live",
      description: "Start delivering personalized recommendations to your users.",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
        <p className="text-xl text-muted-foreground mb-16 text-pretty">
          Three simple steps to transform your user experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="absolute -inset-2 rounded-full bg-primary/20 -z-10"></div>
                </div>

                <div className="mb-4 p-3 rounded-lg bg-accent/10 text-accent">
                  <step.icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-pretty">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border transform -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-border rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
