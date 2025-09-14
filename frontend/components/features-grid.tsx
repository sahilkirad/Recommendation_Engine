import { Card, CardContent } from "@/components/ui/card"
import { BrainCircuit, SlidersHorizontal, PlugZap } from "lucide-react"

export function FeaturesGrid() {
  const features = [
    {
      icon: BrainCircuit,
      title: "Industry-Specific Genius",
      description: "Pre-trained agents that understand your business from day one.",
    },
    {
      icon: SlidersHorizontal,
      title: "Strategic Control Panel",
      description: "Align AI with your business goals, not just clicks.",
    },
    {
      icon: PlugZap,
      title: "Instant Integration",
      description: "Go live in hours, not months. Save time, money, and complexity.",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
