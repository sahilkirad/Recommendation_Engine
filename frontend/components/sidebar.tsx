"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Book, GanttChartSquare, FileText, Settings } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Catalog",
    href: "/catalog",
    icon: Book,
  },
  {
    name: "Business Rules",
    href: "/rules",
    icon: GanttChartSquare,
  },
  {
    name: "Docs",
    href: "/docs",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold text-sidebar-foreground">
            NexusAI
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
                {isActive && <div className="ml-auto w-1 h-6 bg-sidebar-primary-foreground rounded-full" />}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
