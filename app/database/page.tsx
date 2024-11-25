'use client'

import { useState } from 'react'
import { Plus, Upload, Download, Link, Box, Trash2} from 'lucide-react'
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
import { useIngredientsStore } from '@/hooks/use-ingredients-store'
import { useSuppliersStore } from '@/hooks/use-suppliers-store'

export default function DatabasePage() {
  const { ingredients, addIngredient, updateIngredient, deleteIngredient } = useIngredientsStore()
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useSuppliersStore()
  const [perfumes, setPerfumes] = useState<Array<{
    id: number;
    name: string;
    ingredients: string[];
    notes: string;
    modelUrl?: string;
  }>>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newItem, setNewItem] = useState({ 
    name: '', 
    type: '', 
    supplier: '', 
    contact: '', 
    ingredients: '', 
    notes: '',
    pricePerGram: '',
    chemicalFormula: '',
    density: '',
    tags: '',
    category: '',
    origin: '',
    stockLevel: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewItem(prev => ({ ...prev, [name]: value }))
  }

  const handleAddItem = (type: 'ingredient' | 'supplier' | 'perfume') => {
    switch (type) {
      case 'ingredient':
        addIngredient({
          name: newItem.name,
          type: newItem.type,
          supplier: newItem.supplier,
          pricePerGram: parseFloat(newItem.pricePerGram) || 0,
          chemicalFormula: newItem.chemicalFormula,
          density: parseFloat(newItem.density) || 0,
          tags: newItem.tags ? newItem.tags.split(',').map(tag => tag.trim()) : [],
          category: newItem.category,
          origin: newItem.origin,
          sustainabilityCertified: true,
          stockLevel: parseInt(newItem.stockLevel) || 0,
          minimumStock: 100,
          volatility: "medium",
          allergens: [],
          safetyNotes: ""
        })
        break
      case 'supplier':
        addSupplier({
          name: newItem.name,
          contact: newItem.contact,
          ingredients: []
        })
        break
      case 'perfume':
        setPerfumes([...perfumes, { id: perfumes.length + 1, name: newItem.name, ingredients: newItem.ingredients.split(',').map(i => i.trim()), notes: newItem.notes }])
        break
    }
    setNewItem({ name: '', type: '', supplier: '', contact: '', ingredients: '', notes: '', pricePerGram: '', chemicalFormula: '', density: '', tags: '', category: '', origin: '', stockLevel: '' })
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
                <TableHead>Supplier Website</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteIngredient(ingredient.id)}
                    >
                      <Trash2/>
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
                <TableHead>Supplier Website</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteSupplier(supplier.id)}
                    >
                      <Trash2/>
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

