'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Beaker, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottlePreview } from '@/components/bottle-preview'

// This would typically come from an API or database
const ingredients = [
  { id: 'ing1', name: 'Bergamot', category: 'Top', description: 'Fresh citrus', stock: 100, cost: 50 },
  { id: 'ing2', name: 'Rose', category: 'Heart', description: 'Floral', stock: 80, cost: 75 },
  { id: 'ing3', name: 'Patchouli', category: 'Base', description: 'Woody, earthy', stock: 120, cost: 60 },
  { id: 'ing4', name: 'Vanilla', category: 'Base', description: 'Sweet, gourmand', stock: 90, cost: 80 },
  { id: 'ing5', name: 'Lavender', category: 'Heart', description: 'Herbal, floral', stock: 110, cost: 55 },
]

export default function CreationPage() {
  const searchParams = useSearchParams()
  const [trendId, setTrendId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    target: '',
    ingredients: [] as { id: string; percentage: number }[],
  })

  useEffect(() => {
    const trend = searchParams?.get('trend')
    if (trend) {
      setTrendId(trend)
      // Here you would typically fetch trend data based on the ID and update the form
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleIngredientChange = (id: string, percentage: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.some(ing => ing.id === id)
        ? prev.ingredients.map(ing => ing.id === id ? { ...ing, percentage } : ing)
        : [...prev.ingredients, { id, percentage }]
    }))
  }

  const calculateTotalCost = () => {
    return formData.ingredients.reduce((total, ing) => {
      const ingredient = ingredients.find(i => i.id === ing.id)
      return total + (ingredient ? (ingredient.cost * ing.percentage / 100) : 0)
    }, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Fragrance data submitted:', formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Fragrance</h1>
      {trendId && <p className="mb-4 text-muted-foreground">Based on trend ID: {trendId}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Fragrance Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select name="category" onValueChange={(value) => handleSelectChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eau-de-toilette">Eau de Toilette</SelectItem>
                  <SelectItem value="eau-de-parfum">Eau de Parfum</SelectItem>
                  <SelectItem value="parfum">Parfum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="target">Target Market</Label>
              <Select name="target" onValueChange={(value) => handleSelectChange('target', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Composition</Label>
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="accordion">Accordion View</TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ingredient</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ingredients.map((ingredient) => (
                      <TableRow key={ingredient.id}>
                        <TableCell>{ingredient.name}</TableCell>
                        <TableCell>{ingredient.category}</TableCell>
                        <TableCell>
                          <Slider
                            min={0}
                            max={100}
                            step={1}
                            value={[formData.ingredients.find(ing => ing.id === ingredient.id)?.percentage || 0]}
                            onValueChange={(value) => handleIngredientChange(ingredient.id, value[0])}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="accordion">
                <Accordion type="single" collapsible className="w-full">
                  {ingredients.map((ingredient) => (
                    <AccordionItem value={ingredient.id} key={ingredient.id}>
                      <AccordionTrigger>{ingredient.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Category:</strong> {ingredient.category}</p>
                          <p><strong>Description:</strong> {ingredient.description}</p>
                          <p><strong>Stock:</strong> {ingredient.stock} units</p>
                          <Label>Percentage</Label>
                          <Slider
                            min={0}
                            max={100}
                            step={1}
                            value={[formData.ingredients.find(ing => ing.id === ingredient.id)?.percentage || 0]}
                            onValueChange={(value) => handleIngredientChange(ingredient.id, value[0])}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">Estimated Cost: ${calculateTotalCost().toFixed(2)}</p>
          </div>
          <div className="space-x-4">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save Fragrance
            </Button>
            <Button type="button" variant="outline">
              <Beaker className="mr-2 h-4 w-4" /> Request Sample
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Bottle Preview</h2>
        <BottlePreview />
      </div>
    </div>
  )
}

