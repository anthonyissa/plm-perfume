'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Beaker, TrendingUp, DollarSign, Truck, Search } from 'lucide-react'

// This would typically come from an API or database
const perfumes = [
  { id: 1, name: "Ocean Breeze", status: "In Development", progress: 60, deadline: "2023-09-30" },
  { id: 2, name: "Floral Whisper", status: "Testing", progress: 80, deadline: "2023-08-15" },
  { id: 3, name: "Spice Enigma", status: "In Production", progress: 90, deadline: "2023-07-31" },
  { id: 4, name: "Citrus Burst", status: "Concept", progress: 20, deadline: "2023-10-31" },
  { id: 5, name: "Woody Elegance", status: "In Development", progress: 40, deadline: "2023-09-15" },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPerfumes = perfumes.filter(perfume => 
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Perfumes</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{perfumes.length}</div>
            <p className="text-xs text-muted-foreground">in development pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trends</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">trending fragrance concepts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,500</div>
            <p className="text-xs text-muted-foreground">per fragrance development</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">scheduled this month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Perfumes in Development</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/3">
            <Label htmlFor="search" className="sr-only">Search Perfumes</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search perfumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                {filteredPerfumes.map((perfume) => (
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
            <TabsContent value="inDevelopment">
              {/* Similar structure as 'all', but filtered for 'In Development' status */}
            </TabsContent>
            <TabsContent value="testing">
              {/* Similar structure as 'all', but filtered for 'Testing' status */}
            </TabsContent>
            <TabsContent value="inProduction">
              {/* Similar structure as 'all', but filtered for 'In Production' status */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

