"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusCircle, LayoutDashboard, TrendingUp, FolderKanban, FileText, Beaker} from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Trends", href: "/trends", icon: TrendingUp },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Creation", href: "/creation", icon: Beaker },
  { name: "Suivi", href: "/suivi", icon: Beaker },
  { name: "Database", href: "/database", icon: FileText },
]

export function PLMNav() {
  const pathname = usePathname()

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 justify-between max-w-[1400px] mx-auto">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Creation
        </Button>
        <nav className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

