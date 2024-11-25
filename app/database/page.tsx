'use client'

import { useState } from 'react'
import { Plus, Upload, Download, Link, Box} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { BottleVisualizer } from '@/components/3d-visualizer'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// Sample data (replace with actual data from your backend)
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

const initialSuppliers = [
  { id: 1, name: "Supplier A", contact: "contact@suppliera.com", ingredients: ["Rose Essential Oil"] },
  { id: 2, name: "Supplier B", contact: "contact@supplierb.com", ingredients: ["Vanilla Extract"] },
  { id: 3, name: "Supplier C", contact: "contact@supplierc.com", ingredients: ["Bergamot"] },
]

const initialPerfumes = [
  { 
    id: 1, 
    name: "Spring Blossom", 
    ingredients: ["Rose Essential Oil", "Bergamot"], 
    notes: "Floral with citrus undertones" 
  },
  { 
    id: 2, 
    name: "Ocean Breeze", 
    ingredients: ["Bergamot", "Vanilla Extract"], 
    notes: "Fresh marine scent" 
  },
  { 
    id: 3, 
    name: "Midnight Mystery", 
    ingredients: ["Vanilla Extract", "Rose Essential Oil"], 
    notes: "Deep and mysterious" 
  },
]

export default function DatabasePage() {
  const [ingredients, setIngredients] = useState(initialIngredients)
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [perfumes, setPerfumes] = useState(initialPerfumes)
  const [searchTerm, setSearchTerm] = useState("")
  const [newItem, setNewItem] = useState({ name: '', type: '', supplier: '', contact: '', ingredients: '', notes: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewItem(prev => ({ ...prev, [name]: value }))
  }

  const handleAddItem = (type: 'ingredient' | 'supplier' | 'perfume') => {
    switch (type) {
      case 'ingredient':
        setIngredients([...ingredients, { id: ingredients.length + 1, name: newItem.name, type: newItem.type, supplier: newItem.supplier }])
        break
      case 'supplier':
        setSuppliers([...suppliers, { id: suppliers.length + 1, name: newItem.name, contact: newItem.contact, ingredients: [] }])
        break
      case 'perfume':
        setPerfumes([...perfumes, { id: perfumes.length + 1, name: newItem.name, ingredients: newItem.ingredients.split(',').map(i => i.trim()), notes: newItem.notes }])
        break
    }
    setNewItem({ name: '', type: '', supplier: '', contact: '', ingredients: '', notes: '' })
  }

  const filteredIngredients = ingredients.filter(ing => 
    ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ing.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ing.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredSuppliers = suppliers.filter(sup => 
    sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sup.contact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPerfumes = perfumes.filter(perf => 
    perf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perf.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Perfume Database</h1>

      <div className="mb-4 flex items-center space-x-4">
        <Input
          placeholder="Search database..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Import
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      <Tabs defaultValue="ingredients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="perfumes">Perfumes</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Ingredients</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Ingredient</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Ingredient</DialogTitle>
                  <DialogDescription>Enter the details of the new ingredient here.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" value={newItem.name} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Type</Label>
                    <Input id="type" name="type" value={newItem.type} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supplier" className="text-right">Supplier</Label>
                    <Input id="supplier" name="supplier" value={newItem.supplier} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pricePerGram" className="text-right">Price/g (€)</Label>
                    <Input id="pricePerGram" name="pricePerGram" type="number" step="0.01" value={newItem.pricePerGram} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="chemicalFormula" className="text-right">Chemical Formula</Label>
                    <Input id="chemicalFormula" name="chemicalFormula" value={newItem.chemicalFormula} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="density" className="text-right">Density (g/mL)</Label>
                    <Input id="density" name="density" type="number" step="0.01" value={newItem.density} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tags" className="text-right">Tags</Label>
                    <Input id="tags" name="tags" value={newItem.tags} onChange={handleInputChange} className="col-span-3" placeholder="Comma-separated tags" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Select name="category" value={newItem.category} onValueChange={(value) => handleInputChange({ target: { name: 'category', value }})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Top">Top</SelectItem>
                        <SelectItem value="Heart">Heart</SelectItem>
                        <SelectItem value="Base">Base</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="origin" className="text-right">Origin</Label>
                    <Input id="origin" name="origin" value={newItem.origin} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stockLevel" className="text-right">Stock Level</Label>
                    <Input id="stockLevel" name="stockLevel" type="number" value={newItem.stockLevel} onChange={handleInputChange} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => handleAddItem('ingredient')}>Add Ingredient</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Price/g (€)</TableHead>
                <TableHead>Chemical Formula</TableHead>
                <TableHead>Density (g/mL)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.type}</TableCell>
                  <TableCell>{ingredient.supplier}</TableCell>
                  <TableCell>{ingredient.pricePerGram}</TableCell>
                  <TableCell>{ingredient.chemicalFormula}</TableCell>
                  <TableCell>{ingredient.density}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Link className="mr-2 h-4 w-4" /> Supplier Website
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="suppliers">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Suppliers</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Supplier</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>Enter the details of the new supplier here.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" value={newItem.name} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">Contact</Label>
                    <Input id="contact" name="contact" value={newItem.contact} onChange={handleInputChange} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => handleAddItem('supplier')}>Add Supplier</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Ingredients</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.ingredients.join(", ")}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Link className="mr-2 h-4 w-4" /> Supplier Website
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="perfumes">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Perfumes</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Perfume</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Perfume</DialogTitle>
                  <DialogDescription>Enter the details of the new perfume here.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" value={newItem.name} onChange={handleInputChange} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ingredients" className="text-right">Ingredients</Label>
                    <Input id="ingredients" name="ingredients" value={newItem.ingredients} onChange={handleInputChange} className="col-span-3" placeholder="Comma-separated list" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">Notes</Label>
                    <Textarea id="notes" name="notes" value={newItem.notes} onChange={handleInputChange} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => handleAddItem('perfume')}>Add Perfume</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Ingredients</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPerfumes.map((perfume) => (
                <TableRow key={perfume.id}>
                  <TableCell>{perfume.name}</TableCell>
                  <TableCell>{perfume.ingredients.join(", ")}</TableCell>
                  <TableCell>{perfume.notes}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm"><Box className="mr-2 h-4 w-4" />View 3D Model</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{perfume.name} - 3D Model</DialogTitle>
                        </DialogHeader>
                        <BottleVisualizer modelUrl={perfume.modelUrl} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}

