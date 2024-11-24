import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project } from '@/types/plm'

type ProjectsStore = {
  projects: Project[]
  addProject: (project: Omit<Project, 'id'>) => void
  updateProject: (id: number, project: Partial<Project>) => void
  deleteProject: (id: number) => void
}

const initialProjects: Project[] = [
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
    trend: "Floral Fusion",
    ingredients: [
      { id: 1, name: "Bergamot", category: "Top", description: "Fresh citrus", stock: 500, unit: "ml", cost: 0.5 },
      { id: 2, name: "Jasmine", category: "Heart", description: "Sweet floral", stock: 300, unit: "ml", cost: 0.8 }
    ],
    currentLocation: "Creation Lab",
    nextDestination: "Production Plant",
    stockStatus: "In Stock",
    plannedSalePoints: ["Luxury Boutiques", "Online Store"]
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
    trend: "Oceanic Fusion",
    ingredients: [
      { id: 3, name: "Sandalwood", category: "Base", description: "Woody and musky", stock: 200, unit: "ml", cost: 1.2 },
      { id: 4, name: "Grapefruit", category: "Top", description: "Refreshing citrus", stock: 400, unit: "ml", cost: 0.7 }
    ],
    currentLocation: "Production Plant",
    nextDestination: "Distribution Center",
    stockStatus: "In Stock",
    plannedSalePoints: ["Beach Boutiques", "Online Store"]
  }
]

export const useProjectsStore = create<ProjectsStore>()(
  persist(
    (set) => ({
      projects: initialProjects,
      addProject: (newProject) => 
        set((state) => ({
          projects: [...state.projects, { ...newProject, id: Date.now() }]
        })),
      updateProject: (id, updatedProject) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedProject } : project
          )
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id)
        })),
    }),
    {
      name: 'projects-storage'
    }
  )
)
