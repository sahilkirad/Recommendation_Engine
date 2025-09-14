import { Book, Code, Zap, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

export default function DocsPage() {
  const sections = [
    {
      icon: Zap,
      title: "Quick Start",
      description: "Get up and running in minutes",
      items: ["Installation & Setup", "Authentication", "Your First API Call", "Testing & Debugging"],
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation",
      items: ["Endpoints Overview", "Request/Response Format", "Error Handling", "Rate Limiting"],
    },
    {
      icon: Book,
      title: "Guides",
      description: "Step-by-step tutorials",
      items: ["Building Recommendation Systems", "Custom AI Agents", "Data Integration", "Best Practices"],
    },
    {
      icon: Shield,
      title: "Security",
      description: "Keep your data safe",
      items: ["API Key Management", "Data Privacy", "Compliance", "Security Best Practices"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to integrate and build with NexusAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {sections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <section.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Can't find what you're looking for? Our support team is here to help.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                  >
                    Join Community
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
