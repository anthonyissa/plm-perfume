'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Beaker, Target, Clock, Droplet } from 'lucide-react'

interface FormulationStep {
  name: string
  ingredients: string[]
  concentration: number
  notes: string
  stability: number
  quality: number
}

interface ProductFormData {
  name: string
  reference: string
  description: string
  marketTarget: string
  inspiration: string
  olfactiveFamily: string
  topNotes: string[]
  heartNotes: string[]
  baseNotes: string[]
  sustainabilityScore: number
  estimatedCost: number
  estimatedTime: number
  formulation: FormulationStep[]
  targetMarket: string
  pricePoint: string
  competitorAnalysis: string
  regulations: string[]
  packaging: {
    type: string
    material: string
    size: string
  }
  team: string[]
  timeline: {
    development: number
    testing: number
    production: number
  }
}

const OLFACTIVE_FAMILIES = [
  "Floral",
  "Oriental",
  "Woody",
  "Fresh",
  "Citrus",
  "Fougère",
  "Chypre"
]

const generateReference = () => `PE_${Math.random().toString(36).substring(2, 8).toUpperCase()}`

export default function CreationPage() {
  const [step, setStep] = useState(1)
  const [reference, setReference] = useState('')

  useEffect(() => {
    setReference(generateReference())
  }, [])

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    reference: '',
    description: '',
    marketTarget: '',
    inspiration: '',
    olfactiveFamily: '',
    topNotes: [],
    heartNotes: [],
    baseNotes: [],
    sustainabilityScore: 0,
    estimatedCost: 0,
    estimatedTime: 0,
    formulation: [],
    targetMarket: '',
    pricePoint: '',
    competitorAnalysis: '',
    regulations: [],
    packaging: {
      type: '',
      material: '',
      size: ''
    },
    team: [],
    timeline: {
      development: 3,
      testing: 2,
      production: 1
    }
  })

  const steps = [
    { id: 1, name: "Market Analysis", icon: Target },
    { id: 2, name: "Concept Definition", icon: Beaker },
    { id: 3, name: "Olfactive Design", icon: Droplet },
    { id: 4, name: "Technical Specs", icon: Clock }
  ]

  const canAccessStep = (stepId: number, data: ProductFormData, currentStep: number) => {
    if (stepId <= currentStep) return true
    for (let i = 1; i < stepId; i++) {
      if (!validateStep(i, data)) return false
    }
    return stepId === currentStep + 1
  }

  const updateFormData = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1. Market Analysis</h2>
            <div className="grid gap-4">
              <div>
                <Label>Target Market</Label>
                <Textarea 
                  value={formData.targetMarket}
                  onChange={(e) => updateFormData('targetMarket', e.target.value)}
                  placeholder="Define your target market..."
                />
              </div>
              <div>
                <Label>Competitor Analysis</Label>
                <Textarea 
                  value={formData.competitorAnalysis}
                  onChange={(e) => updateFormData('competitorAnalysis', e.target.value)}
                  placeholder="Analyze main competitors..."
                />
              </div>
              <div>
                <Label>Price Point</Label>
                <Input 
                  value={formData.pricePoint}
                  onChange={(e) => updateFormData('pricePoint', e.target.value)}
                  placeholder="Expected retail price range"
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">2. Concept Definition</h2>
            <div className="grid gap-4">
              <div>
                <Label>Name</Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Product description"
                />
              </div>
              <div>
                <Label>Inspiration</Label>
                <Textarea 
                  value={formData.inspiration}
                  onChange={(e) => updateFormData('inspiration', e.target.value)}
                  placeholder="Source of inspiration"
                />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">3. Olfactive Design</h2>
            <div className="grid gap-4">
              <div>
                <Label>Olfactive Family</Label>
                <Select 
                  value={formData.olfactiveFamily}
                  onValueChange={(value) => updateFormData('olfactiveFamily', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select olfactive family" />
                  </SelectTrigger>
                  <SelectContent>
                    {OLFACTIVE_FAMILIES.map(family => (
                      <SelectItem key={family} value={family}>{family}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Top Notes (comma separated)</Label>
                <Input 
                  value={formData.topNotes.join(', ')}
                  onChange={(e) => updateFormData('topNotes', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="e.g., Bergamot, Lemon, Orange"
                />
              </div>
              <div>
                <Label>Heart Notes (comma separated)</Label>
                <Input 
                  value={formData.heartNotes.join(', ')}
                  onChange={(e) => updateFormData('heartNotes', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="e.g., Rose, Jasmine, Lavender"
                />
              </div>
              <div>
                <Label>Base Notes (comma separated)</Label>
                <Input 
                  value={formData.baseNotes.join(', ')}
                  onChange={(e) => updateFormData('baseNotes', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="e.g., Vanilla, Musk, Amber"
                />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">4. Technical Specifications</h2>
            <div className="grid gap-4">
              <div>
                <Label>Sustainability Score (%)</Label>
                <Input 
                  type="number"
                  value={formData.sustainabilityScore}
                  onChange={(e) => updateFormData('sustainabilityScore', Number(e.target.value))}
                  min={0}
                  max={100}
                />
              </div>
              <div>
                <Label>Estimated Cost (€)</Label>
                <Input 
                  type="number"
                  value={formData.estimatedCost}
                  onChange={(e) => updateFormData('estimatedCost', Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Estimated Development Time (months)</Label>
                <Input 
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => updateFormData('estimatedTime', Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        )
    }
  }

  const handleSubmit = () => {
    // Ici, on enverrait les données au backend
    console.log(formData)
  }

  const validateStep = (stepId: number, data: ProductFormData) => {
    switch (stepId) {
      case 1: // Market Analysis
        return !!data.targetMarket && 
               !!data.competitorAnalysis && 
               !!data.pricePoint
      case 2: // Concept Definition
        return !!data.name && 
               !!data.description && 
               !!data.inspiration
      case 3: // Olfactive Design
        return !!data.olfactiveFamily && 
               data.topNotes.length > 0 && 
               data.heartNotes.length > 0 && 
               data.baseNotes.length > 0
      case 4: // Technical Specs
        return data.sustainabilityScore > 0 && 
               data.estimatedCost > 0 && 
               data.estimatedTime > 0
      default:
        return false
    }
  }

  const handleStepChange = (newStep: number) => {
    if (canAccessStep(newStep, formData, step)) {
      setStep(newStep)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">New Fragrance Development</h1>
        <Badge variant="outline">Reference: {reference}</Badge>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {steps.map((s) => (
                  <Button
                    key={s.id}
                    variant={step === s.id ? "default" : "outline"}
                    onClick={() => handleStepChange(s.id)}
                    className="w-full justify-start"
                    disabled={!canAccessStep(s.id, formData, step)}
                  >
                    <s.icon className="mr-2 h-4 w-4" />
                    {s.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-9">
          <Card>
            <CardContent className="p-6">
              {renderStep()}
              
              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <Button variant="outline" onClick={() => handleStepChange(step - 1)}>
                    Previous
                  </Button>
                )}
                {step < steps.length ? (
                  <Button 
                    onClick={() => handleStepChange(step + 1)}
                    disabled={!validateStep(step, formData)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={!validateStep(step, formData)}
                  >
                    Create Project
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

