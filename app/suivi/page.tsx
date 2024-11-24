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
    nextMilestoneDate: "2023-07-01"
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
    nextMilestoneDate: "2023-08-15"
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
    nextMilestoneDate: "2023-07-10"
  },
]

export default function SuiviPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [selectedProject, setSelectedProject] = useState<typeof initialProjects[0] | null>(null)

  const toggleRowExpansion = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, status: newStatus } : project
    ))
  }

  const handleNoteUpdate = (id: number, newNote: string) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, notes: newNote } : project
    ))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Project Follow-up</h1>
      
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
          {projects.map((project) => (
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
                      <DropdownMenuItem onClick={() => handleStatusChange(project.id, "In Development")}>
                        Set to In Development
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(project.id, "In Production")}>
                        Set to In Production
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(project.id, "Completed")}>
                        Set to Completed
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

