'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Beaker, TrendingUp, DollarSign, Truck, CheckCircle, 
  TestTube, Clock, ShieldCheck, Target, Leaf, Droplet, Package, Search 
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Statistiques de R&D
const researchStats = [
  {
    title: "Formulation Success",
    value: "92%",
    description: "first-time approval rate",
    icon: Beaker,
    trend: "+5% vs last quarter"
  },
  {
    title: "Sustainability Score",
    value: "85%",
    description: "eco-friendly ingredients",
    icon: Leaf,
    trend: "+10% improvement"
  }
]

// Statistiques de production
const productionStats = [
  {
    title: "Production Yield",
    value: "98.5%",
    description: "efficiency rate",
    icon: Package,
    trend: "+1.5% improvement"
  },
  {
    title: "Raw Materials",
    value: "156",
    description: "active ingredients",
    icon: TestTube,
    trend: "12 low stock"
  }
]

// Statistiques de qualité
const qualityStats = [
  {
    title: "Quality Tests",
    value: "89%",
    description: "pass rate this month",
    icon: CheckCircle,
    trend: "+4% improvement"
  },
  {
    title: "Stability Tests",
    value: "95%",
    description: "success rate",
    icon: Droplet,
    trend: "Stable"
  }
]

// Statistiques de marché
const marketStats = [
  {
    title: "Market Share",
    value: "23%",
    description: "in luxury segment",
    icon: Target,
    trend: "+2.5% growth"
  },
  {
    title: "Time to Market",
    value: "4.2",
    description: "months average",
    icon: Clock,
    trend: "-2 weeks vs target"
  }
]

const perfumes = [
  { id: 1, name: "Ocean Breeze", status: "In Development", progress: 60, deadline: "2023-09-30" },
  { id: 2, name: "Floral Whisper", status: "Testing", progress: 80, deadline: "2023-08-15" },
  { id: 3, name: "Spice Enigma", status: "In Production", progress: 90, deadline: "2023-07-31" },
  { id: 4, name: "Citrus Burst", status: "Concept", progress: 20, deadline: "2023-10-31" },
  { id: 5, name: "Woody Elegance", status: "In Development", progress: 40, deadline: "2023-09-15" },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* R&D Stats */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">R&D</h3>
          {researchStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{stat.title}</span>
                  <stat.icon className="h-4 w-4 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className={cn(
                      "text-xs font-medium",
                      stat.trend.includes("+") ? "text-green-500" : 
                      stat.trend.includes("-") ? "text-red-500" : 
                      "text-muted-foreground"
                    )}>
                      {stat.trend}
                    </span>
                  </div>
                  <Progress 
                    value={parseInt(stat.value)} 
                    className="h-1" 
                  />
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Production Stats */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Production</h3>
          {productionStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{stat.title}</span>
                  <stat.icon className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className={cn(
                      "text-xs font-medium",
                      stat.trend.includes("+") ? "text-green-500" : 
                      stat.trend.includes("-") ? "text-red-500" : 
                      "text-muted-foreground"
                    )}>
                      {stat.trend}
                    </span>
                  </div>
                  <Progress 
                    value={parseInt(stat.value)} 
                    className="h-1" 
                  />
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quality Stats */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Quality</h3>
          {qualityStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{stat.title}</span>
                  <stat.icon className="h-4 w-4 text-purple-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className={cn(
                      "text-xs font-medium",
                      stat.trend.includes("+") ? "text-green-500" : 
                      stat.trend.includes("-") ? "text-red-500" : 
                      "text-muted-foreground"
                    )}>
                      {stat.trend}
                    </span>
                  </div>
                  <Progress 
                    value={parseInt(stat.value)} 
                    className="h-1" 
                  />
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Stats */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Market</h3>
          {marketStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{stat.title}</span>
                  <stat.icon className="h-4 w-4 text-orange-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className={cn(
                      "text-xs font-medium",
                      stat.trend.includes("+") ? "text-green-500" : 
                      stat.trend.includes("-") ? "text-red-500" : 
                      "text-muted-foreground"
                    )}>
                      {stat.trend}
                    </span>
                  </div>
                  <Progress 
                    value={parseInt(stat.value)} 
                    className="h-1" 
                  />
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Perfumes in Development Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Perfumes in Development</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/3">
            <Label htmlFor="search" className="sr-only">Search Perfumes</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search perfumes..."
                className="pl-8"
              />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-md">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="inDevelopment">In Development</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="inProduction">In Production</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="divide-y divide-border rounded-md border">
                {perfumes.map((perfume) => (
                  <div key={perfume.id} className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-semibold">{perfume.name}</h3>
                      <p className="text-sm text-muted-foreground">Deadline: {perfume.deadline}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={
                        perfume.status === "In Production" ? "default" :
                        perfume.status === "Testing" ? "secondary" :
                        "outline"
                      }>
                        {perfume.status}
                      </Badge>
                      <div className="w-[100px]">
                        <Progress value={perfume.progress} className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

