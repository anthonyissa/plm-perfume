'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Search } from 'lucide-react'

const projects = [
  { id: 1, name: "Ocean Breeze", status: "In Development", progress: 60, deadline: "2023-09-30", team: ["John Doe", "Jane Smith"], description: "Fresh marine fragrance" },
  { id: 2, name: "Floral Whisper", status: "Testing", progress: 80, deadline: "2023-08-15", team: ["Alice Johnson"], description: "Delicate floral blend" },
  { id: 3, name: "Spice Enigma", status: "In Production", progress: 90, deadline: "2023-07-31", team: ["Bob Wilson", "Emma Davis"], description: "Oriental spicy perfume" },
  { id: 4, name: "Citrus Burst", status: "Concept", progress: 20, deadline: "2023-10-31", team: ["Sarah Brown"], description: "Energetic citrus blend" },
  { id: 5, name: "Woody Elegance", status: "In Development", progress: 40, deadline: "2023-09-15", team: ["Mike Johnson", "Lisa Chen"], description: "Sophisticated woody scent" }
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3">
          <Label htmlFor="search" className="sr-only">Search Projects</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="inDevelopment">In Development</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="inProduction">In Production</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="divide-y divide-border">
              {filteredProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <p className="text-sm text-muted-foreground">Team: {project.team.join(", ")}</p>
                    <p className="text-sm text-muted-foreground">Deadline: {project.deadline}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={
                      project.status === "In Production" ? "default" :
                      project.status === "Testing" ? "secondary" :
                      "outline"
                    }>
                      {project.status}
                    </Badge>
                    <div className="w-[100px]">
                      <Progress value={project.progress} className="w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inDevelopment">
            <div className="divide-y divide-border">
              {filteredProjects
                .filter(project => project.status === "In Development")
                .map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <p className="text-sm text-muted-foreground">Team: {project.team.join(", ")}</p>
                      <p className="text-sm text-muted-foreground">Deadline: {project.deadline}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={
                        project.status === "In Production" ? "default" :
                        project.status === "Testing" ? "secondary" :
                        "outline"
                      }>
                        {project.status}
                      </Badge>
                      <div className="w-[100px]">
                        <Progress value={project.progress} className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="testing">
            <div className="divide-y divide-border">
              {filteredProjects
                .filter(project => project.status === "Testing")
                .map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <p className="text-sm text-muted-foreground">Team: {project.team.join(", ")}</p>
                      <p className="text-sm text-muted-foreground">Deadline: {project.deadline}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={
                        project.status === "In Production" ? "default" :
                        project.status === "Testing" ? "secondary" :
                        "outline"
                      }>
                        {project.status}
                      </Badge>
                      <div className="w-[100px]">
                        <Progress value={project.progress} className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="inProduction">
            <div className="divide-y divide-border">
              {filteredProjects
                .filter(project => project.status === "In Production")
                .map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <p className="text-sm text-muted-foreground">Team: {project.team.join(", ")}</p>
                      <p className="text-sm text-muted-foreground">Deadline: {project.deadline}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={
                        project.status === "In Production" ? "default" :
                        project.status === "Testing" ? "secondary" :
                        "outline"
                      }>
                        {project.status}
                      </Badge>
                      <div className="w-[100px]">
                        <Progress value={project.progress} className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
