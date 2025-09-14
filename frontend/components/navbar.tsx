"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // If we're not on the home page, navigate to home first
    if (pathname !== '/') {
      router.push('/#features')
      return
    }
    
    // If we're on the home page, scroll to features
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      // Add a small delay to ensure the page is fully loaded
      setTimeout(() => {
        featuresSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    } else {
      // Fallback: try to find the section by class or other means
      const section = document.querySelector('section[id="features"]')
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-foreground">
              NexusAI
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              onClick={handleFeaturesClick}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Features
            </a>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
