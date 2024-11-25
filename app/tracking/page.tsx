'use client'

import { useState } from 'react'
import { MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BottleVisualizer } from '@/components/3d-visualizer'

// This would typically come from an API or database
const initialProjects = [
  { 
    id: 1, 
    name: "Spring Blossom", 
    creationDate: "2023-05-15", 
    status: "In Development", 
    stage: "Formula Refinement",
    progress: 60, 
    notes: "Adjusting top notes for better first impression",
    team: ["John Doe", "Jane Smith"],
    nextMilestone: "Stability Testing",
    nextMilestoneDate: "2023-07-01",
    modelUrl: "/models/spring-blossom.glb"
  },
  { 
    id: 2, 
    name: "Ocean Breeze", 
    creationDate: "2023-04-20", 
    status: "In Production", 
    stage: "Scaling Up",
    progress: 80, 
    notes: "Finalizing packaging design",
    team: ["Alice Johnson", "Bob Williams"],
    nextMilestone: "Market Launch",
    nextMilestoneDate: "2023-08-15",
    modelUrl: "/models/ocean-breeze.glb"
  },
  { 
    id: 3, 
    name: "Midnight Mystery", 
    creationDate: "2023-06-01", 
    status: "In Development", 
    stage: "Initial Formulation",
    progress: 30, 
    notes: "Exploring unique base note combinations",
    team: ["Emma Brown", "Michael Davis"],
    nextMilestone: "First Sample Review",
    nextMilestoneDate: "2023-07-10",
    modelUrl: "/models/midnight-mystery.glb"
  },
]

export default function SuiviPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [selectedProject, setSelectedProject] = useState<typeof initialProjects[0] | null>(null)
  const [filter, setFilter] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const toggleRowExpansion = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const handleStatusChange = (id: number, field: string, value: string | string[]) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ))
  }

  const handleNoteUpdate = (id: number, newNote: string) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, notes: newNote } : project
    ))
  }

  const handleCommentUpdate = (id: number, newComment: string) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, comments: newComment } : project
    ))
  }

  const filteredAndSortedProjects = projects
  .filter(project => project.name.toLowerCase().includes(filter.toLowerCase()))
  .sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "status") return a.status.localeCompare(b.status)
    if (sortBy === "progress") return b.progress - a.progress
    return 0
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Project Tracking</h1>
      
      <div className="mb-4 flex items-center space-x-4">
        <Input
          placeholder="Filter projects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Next Milestone</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedProjects.map((project) => (
            <>
              <TableRow key={project.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(project.id)}
                  >
                    {expandedRows.includes(project.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Badge variant={project.status === "In Production" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Progress value={project.progress} className="w-[60%]" />
                </TableCell>
                <TableCell>{project.nextMilestone}</TableCell>
                <TableCell>{project.team.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedProject(project)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleStatusChange(project.id, "status", "In Development")}>
                        Set to In Development
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(project.id, "status", "In Production")}>
                        Set to In Production
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(project.id, "status", "Completed")}>
                        Set to Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        const newDeadline = prompt("Enter new deadline (YYYY-MM-DD):", project.nextMilestoneDate)
                        if (newDeadline) handleStatusChange(project.id, "nextMilestoneDate", newDeadline)
                      }}>
                        Update Deadline
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        const newTeam = prompt("Enter team members (comma-separated):", project.team.join(", "))
                        if (newTeam) handleStatusChange(project.id, "team", newTeam.split(",").map(m => m.trim()))
                      }}>
                        Update Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              {expandedRows.includes(project.id) && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="p-4 bg-muted rounded-md">
                      <h4 className="font-semibold mb-2">Project Details</h4>
                      <p><strong>Creation Date:</strong> {project.creationDate}</p>
                      <p><strong>Current Stage:</strong> {project.stage}</p>
                      <p><strong>Next Milestone Date:</strong> {project.nextMilestoneDate}</p>
                      <div className="mt-2">
                        <Label htmlFor={`notes-${project.id}`}>Notes</Label>
                        <Textarea
                          id={`notes-${project.id}`}
                          value={project.notes}
                          onChange={(e) => handleNoteUpdate(project.id, e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="mt-2">
                        <Label htmlFor={`comments-${project.id}`}>Comments</Label>
                        <Textarea
                          id={`comments-${project.id}`}
                          value={project.comments || ""}
                          onChange={(e) => handleCommentUpdate(project.id, e.target.value)}
                          className="mt-1"
                          placeholder="Add a comment..."
                        />
                      </div>
                      {project.status === "In Production" && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Bottle 3D Model</h4>
                          <BottleVisualizer modelUrl={project.modelUrl} />
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
            <DialogDescription>
              Detailed view of the project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input id="status" value={selectedProject?.status} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="progress" className="text-right">
                Progress
              </Label>
              <Progress id="progress" value={selectedProject?.progress} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stage" className="text-right">
                Current Stage
              </Label>
              <Input id="stage" value={selectedProject?.stage} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="milestone" className="text-right">
                Next Milestone
              </Label>
              <Input id="milestone" value={selectedProject?.nextMilestone} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Team
              </Label>
              <Input id="team" value={selectedProject?.team.join(", ")} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea id="notes" value={selectedProject?.notes} className="col-span-3" readOnly />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

