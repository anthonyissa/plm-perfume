import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Supplier = {
  id: number
  name: string
  contact: string
  ingredients: string[]
}

type SuppliersStore = {
  suppliers: Supplier[]
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void
  updateSupplier: (id: number, supplier: Partial<Supplier>) => void
  deleteSupplier: (id: number) => void
}

const initialSuppliers = [
  { id: 1, name: "Supplier A", contact: "contact@suppliera.com", ingredients: ["Rose Essential Oil"] },
  { id: 2, name: "Supplier B", contact: "contact@supplierb.com", ingredients: ["Vanilla Extract"] },
  { id: 3, name: "Supplier C", contact: "contact@supplierc.com", ingredients: ["Bergamot"] },
]

export const useSuppliersStore = create<SuppliersStore>()(
  persist(
    (set) => ({
      suppliers: initialSuppliers,
      addSupplier: (newSupplier) => 
        set((state) => ({
          suppliers: [...state.suppliers, { ...newSupplier, id: Date.now() }]
        })),
      updateSupplier: (id, updatedSupplier) =>
        set((state) => ({
          suppliers: state.suppliers.map((supplier) =>
            supplier.id === id ? { ...supplier, ...updatedSupplier } : supplier
          )
        })),
      deleteSupplier: (id) =>
        set((state) => ({
          suppliers: state.suppliers.filter((supplier) => supplier.id !== id)
        })),
    }),
    {
      name: 'suppliers-storage'
    }
  )
)
