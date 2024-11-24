import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Trend = {
  id: number
  name: string
  description: string
  keywords: string[]
  type: string
  popularity: number
  seasonality: string[]
}

type TrendsStore = {
  trends: Trend[]
  addTrend: (trend: Omit<Trend, 'id'>) => void
  updateTrend: (id: number, trend: Partial<Trend>) => void
  deleteTrend: (id: number) => void
}

const initialTrends: Trend[] = [
  {
    id: 1,
    name: "Ocean Breeze",
    description: "Fresh marine notes with citrus undertones",
    keywords: ["ocean", "citrus", "fresh"],
    type: "Fresh",
    popularity: 85,
    seasonality: ["Spring", "Summer"]
  },
  {
    id: 2,
    name: "Enchanted Forest",
    description: "Woody scent with floral touches",
    keywords: ["wood", "floral", "moss"],
    type: "Woody",
    popularity: 72,
    seasonality: ["Autumn", "Winter"]
  }
]

export const useTrendsStore = create<TrendsStore>()(
  persist(
    (set) => ({
      trends: initialTrends,
      addTrend: (newTrend) => 
        set((state) => ({
          trends: [...state.trends, { ...newTrend, id: Date.now() }]
        })),
      updateTrend: (id, updatedTrend) =>
        set((state) => ({
          trends: state.trends.map((trend) =>
            trend.id === id ? { ...trend, ...updatedTrend } : trend
          )
        })),
      deleteTrend: (id) =>
        set((state) => ({
          trends: state.trends.filter((trend) => trend.id !== id)
        })),
    }),
    {
      name: 'trends-storage'
    }
  )
)
