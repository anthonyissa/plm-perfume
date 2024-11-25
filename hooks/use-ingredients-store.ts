import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Ingredient = {
  id: number
  name: string
  type: string
  supplier: string
  pricePerGram: number
  chemicalFormula: string
  density: number
  tags: string[]
  category: string
  origin: string
  sustainabilityCertified: boolean
  stockLevel: number
  minimumStock: number
  volatility: string
  allergens: string[]
  safetyNotes: string
}

type IngredientsStore = {
  ingredients: Ingredient[]
  addIngredient: (ingredient: Omit<Ingredient, 'id'>) => void
  updateIngredient: (id: number, ingredient: Partial<Ingredient>) => void
  deleteIngredient: (id: number) => void
}

// Using the initial ingredients data from your database page
const initialIngredients = [
    { 
      id: 1, 
      name: "Rose Essential Oil", 
      type: "Essential Oil", 
      supplier: "Supplier A",
      pricePerGram: 85.00,
      chemicalFormula: "C18H18O",
      density: 0.89,
      tags: ["floral", "sweet", "romantic"],
      category: "Heart",
      origin: "Bulgaria",
      sustainabilityCertified: true,
      stockLevel: 850,
      minimumStock: 200,
      volatility: "medium",
      allergens: ["none"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 2, 
      name: "Vanilla Extract", 
      type: "Extract", 
      supplier: "Supplier B",
      pricePerGram: 65.50,
      chemicalFormula: "C8H8O3",
      density: 1.05,
      tags: ["sweet", "warm", "gourmand"],
      category: "Base",
      origin: "Madagascar",
      sustainabilityCertified: true,
      stockLevel: 650,
      minimumStock: 150,
      volatility: "low",
      allergens: ["vanilla"],
      safetyNotes: "Generally recognized as safe (GRAS)"
    },
    { 
      id: 3, 
      name: "Bergamot", 
      type: "Essential Oil", 
      supplier: "Supplier C",
      pricePerGram: 45.75,
      chemicalFormula: "C10H12O4",
      density: 0.92,
      tags: ["citrus", "fresh", "energetic"],
      category: "Top",
      origin: "Italy",
      sustainabilityCertified: false,
      stockLevel: 500,
      minimumStock: 100,
      volatility: "high",
      allergens: ["bergamot"],
      safetyNotes: "May cause skin irritation in some individuals"
    },
    { 
      id: 4, 
      name: "Lavender Essential Oil", 
      type: "Essential Oil", 
      supplier: "Supplier A",
      pricePerGram: 42.00,
      chemicalFormula: "C10H16O",
      density: 0.88,
      tags: ["floral", "calming", "relaxing"],
      category: "Heart",
      origin: "France",
      sustainabilityCertified: true,
      stockLevel: 700,
      minimumStock: 150,
      volatility: "medium",
      allergens: ["lavender"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 5, 
      name: "Jasmine Absolute", 
      type: "Absolute", 
      supplier: "Supplier B",
      pricePerGram: 220.00,
      chemicalFormula: "C11H14O2",
      density: 0.95,
      tags: ["floral", "sweet", "romantic"],
      category: "Heart",
      origin: "India",
      sustainabilityCertified: true,
      stockLevel: 900,
      minimumStock: 200,
      volatility: "low",
      allergens: ["none"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 6, 
      name: "Sandalwood", 
      type: "Essential Oil", 
      supplier: "Supplier C",
      pricePerGram: 180.00,
      chemicalFormula: "C15H24O",
      density: 0.97,
      tags: ["woodsy", "rich", "musky"],
      category: "Base",
      origin: "Indonesia",
      sustainabilityCertified: true,
      stockLevel: 750,
      minimumStock: 150,
      volatility: "medium",
      allergens: ["sandalwood"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 7, 
      name: "Patchouli", 
      type: "Essential Oil", 
      supplier: "Supplier A",
      pricePerGram: 55.00,
      chemicalFormula: "C15H26O",
      density: 0.95,
      tags: ["earthy", "musky", "rich"],
      category: "Base",
      origin: "Indonesia",
      sustainabilityCertified: true,
      stockLevel: 600,
      minimumStock: 100,
      volatility: "medium",
      allergens: ["patchouli"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 8, 
      name: "Ylang Ylang", 
      type: "Essential Oil", 
      supplier: "Supplier B",
      pricePerGram: 75.00,
      chemicalFormula: "C15H24O",
      density: 0.94,
      tags: ["floral", "sweet", "romantic"],
      category: "Heart",
      origin: "Malaysia",
      sustainabilityCertified: true,
      stockLevel: 800,
      minimumStock: 150,
      volatility: "medium",
      allergens: ["ylang ylang"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 9, 
      name: "Neroli", 
      type: "Essential Oil", 
      supplier: "Supplier C",
      pricePerGram: 320.00,
      chemicalFormula: "C10H16O",
      density: 0.87,
      tags: ["floral", "sweet", "romantic"],
      category: "Heart",
      origin: "Italy",
      sustainabilityCertified: true,
      stockLevel: 950,
      minimumStock: 200,
      volatility: "medium",
      allergens: ["neroli"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 10, 
      name: "Ambergris Tincture", 
      type: "Tincture", 
      supplier: "Supplier A",
      pricePerGram: 450.00,
      chemicalFormula: "C16H28O",
      density: 0.92,
      tags: ["musky", "rich", "luxurious"],
      category: "Base",
      origin: "Bermuda",
      sustainabilityCertified: true,
      stockLevel: 550,
      minimumStock: 100,
      volatility: "low",
      allergens: ["ambergris"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 11, 
      name: "Benzoin", 
      type: "Resin", 
      supplier: "Supplier B",
      pricePerGram: 48.00,
      chemicalFormula: "C16H14O3",
      density: 1.15,
      tags: ["musky", "rich", "luxurious"],
      category: "Base",
      origin: "Indonesia",
      sustainabilityCertified: true,
      stockLevel: 700,
      minimumStock: 150,
      volatility: "medium",
      allergens: ["benzoin"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 12, 
      name: "Frankincense", 
      type: "Essential Oil", 
      supplier: "Supplier C",
      pricePerGram: 95.00,
      chemicalFormula: "C10H16O",
      density: 0.89,
      tags: ["floral", "sweet", "romantic"],
      category: "Heart",
      origin: "Somalia",
      sustainabilityCertified: true,
      stockLevel: 800,
      minimumStock: 150,
      volatility: "medium",
      allergens: ["frankincense"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 13, 
      name: "Vetiver", 
      type: "Essential Oil", 
      supplier: "Supplier A",
      pricePerGram: 85.00,
      chemicalFormula: "C15H24",
      density: 0.98,
      tags: ["earthy", "musky", "rich"],
      category: "Base",
      origin: "Madagascar",
      sustainabilityCertified: true,
      stockLevel: 650,
      minimumStock: 100,
      volatility: "medium",
      allergens: ["vetiver"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 14, 
      name: "Orange Blossom", 
      type: "Absolute", 
      supplier: "Supplier B",
      pricePerGram: 145.00,
      chemicalFormula: "C10H18O",
      density: 0.91,
      tags: ["floral", "sweet", "romantic"],
      category: "Heart",
      origin: "Spain",
      sustainabilityCertified: true,
      stockLevel: 900,
      minimumStock: 200,
      volatility: "medium",
      allergens: ["orange"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    },
    { 
      id: 15, 
      name: "Oud", 
      type: "Essential Oil", 
      supplier: "Supplier C",
      pricePerGram: 1200.00,
      chemicalFormula: "C15H26O",
      density: 0.96,
      tags: ["musky", "rich", "luxurious"],
      category: "Base",
      origin: "Oman",
      sustainabilityCertified: true,
      stockLevel: 500,
      minimumStock: 100,
      volatility: "medium",
      allergens: ["oud"],
      safetyNotes: "Non-toxic, may cause sensitivity in some individuals"
    }
  ]

export const useIngredientsStore = create<IngredientsStore>()(
  persist(
    (set) => ({
      ingredients: initialIngredients,
      addIngredient: (newIngredient) => 
        set((state) => ({
          ingredients: [...state.ingredients, { ...newIngredient, id: Date.now() }]
        })),
      updateIngredient: (id, updatedIngredient) =>
        set((state) => ({
          ingredients: state.ingredients.map((ingredient) =>
            ingredient.id === id ? { ...ingredient, ...updatedIngredient } : ingredient
          )
        })),
      deleteIngredient: (id) =>
        set((state) => ({
          ingredients: state.ingredients.filter((ingredient) => ingredient.id !== id)
        })),
    }),
    {
      name: 'ingredients-storage'
    }
  )
)
