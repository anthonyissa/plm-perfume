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
import { Beaker, Target, Clock, Droplet, TestTube, FlaskConical, ShieldCheck, Settings, Scale } from 'lucide-react'
import { useIngredientsStore } from '@/hooks/use-ingredients-store'

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
  topNotes: SelectedNote[]
  heartNotes: SelectedNote[]
  baseNotes: SelectedNote[]
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
  labDevelopment: LabDevelopment
  stabilityTests: StabilityTest[]
  safetyAssessment: SafetyAssessment
  productionSpecs: ProductionSpecs
  regulatoryDocuments: {
    msds: boolean
    ifraConformity: boolean
    allergenDeclaration: boolean
    safetyAssessmentReport: boolean
  }
}

interface Ingredient {
  name: string
  category: 'top' | 'heart' | 'base'
  description: string
  intensity: number
  concentration: number
  price: number
  stockLevel: number
  family: string
}

interface SelectedNote {
  name: string
  concentration: number
  intensity: number
}

interface LabDevelopment {
  batchNumber: string
  temperature: number
  humidity: number
  mixingTime: number
  observations: string[]
  pH: number
  viscosity: number
}

interface StabilityTest {
  accelerated: boolean
  duration: number
  temperature: number
  results: {
    color: string
    odor: string
    separation: string
    pH: number
  }
  passed: boolean
}

interface SafetyAssessment {
  allergenList: string[]
  ifraCompliance: boolean
  skinIrritationTest: string
  photosensitivityTest: string
  preservativeSystem: string
  stabilityPeriod: number
}

interface ProductionSpecs {
  batchSize: number
  equipmentRequirements: string[]
  mixingInstructions: string[]
  qualityControlPoints: string[]
  packagingRequirements: string[]
  storageConditions: string
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
  const { ingredients } = useIngredientsStore()

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
    },
    labDevelopment: {
      batchNumber: '',
      temperature: 0,
      humidity: 0,
      mixingTime: 0,
      observations: [],
      pH: 0,
      viscosity: 0
    },
    stabilityTests: [],
    safetyAssessment: {
      allergenList: [],
      ifraCompliance: false,
      skinIrritationTest: '',
      photosensitivityTest: '',
      preservativeSystem: '',
      stabilityPeriod: 0
    },
    productionSpecs: {
      batchSize: 0,
      equipmentRequirements: [],
      mixingInstructions: [],
      qualityControlPoints: [],
      packagingRequirements: [],
      storageConditions: ''
    },
    regulatoryDocuments: {
      msds: false,
      ifraConformity: false,
      allergenDeclaration: false,
      safetyAssessmentReport: false
    }
  })

  const steps = [
    { id: 1, name: "Market Analysis", icon: Target },
    { id: 2, name: "Concept Definition", icon: Beaker },
    { id: 3, name: "Olfactive Design", icon: Droplet },
    { id: 4, name: "Lab Development", icon: TestTube },
    { id: 5, name: "Stability Tests", icon: FlaskConical },
    { id: 6, name: "Safety Assessment", icon: ShieldCheck },
    { id: 7, name: "Production Specs", icon: Settings },
    { id: 8, name: "Regulatory Review", icon: Scale },
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
            <div className="grid gap-6">
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

              {[
                { type: 'Top', label: 'Top Notes', field: 'topNotes' as keyof ProductFormData },
                { type: 'Heart', label: 'Heart Notes', field: 'heartNotes' as keyof ProductFormData },
                { type: 'Base', label: 'Base Notes', field: 'baseNotes' as keyof ProductFormData }
              ].map(section => (
                <div key={section.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>{section.label}</Label>
                    <Badge variant="secondary">
                      Selected: {(formData[section.field] as SelectedNote[]).length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Available Ingredients</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {ingredients
                          .filter(i => i.category === section.type)
                          .map(ingredient => (
                            <Button
                              key={ingredient.id}
                              variant="outline"
                              className="w-full justify-between group relative"
                              onClick={() => {
                                const newNote: SelectedNote = {
                                  name: ingredient.name,
                                  concentration: 5,
                                  intensity: 5
                                }
                                if (!formData[section.field as keyof Pick<ProductFormData, 'topNotes' | 'heartNotes' | 'baseNotes'>].find(n => n.name === ingredient.name)) {
                                  updateFormData(section.field, [...formData[section.field as keyof Pick<ProductFormData, 'topNotes' | 'heartNotes' | 'baseNotes'>], newNote])
                                }
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span>{ingredient.name}</span>
                                <Badge variant="outline">{ingredient.type}</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">
                                  {ingredient.pricePerGram}€/g
                                </Badge>
                              </div>
                              <div className="absolute invisible group-hover:visible bg-black/75 text-white p-2 rounded text-sm -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-50">
                                Stock: {ingredient.stockLevel}g | Origin: {ingredient.origin}
                              </div>
                            </Button>
                          ))}
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Selected Notes</h4>
                      <div className="space-y-2">
                        {(formData[section.field] as SelectedNote[]).map((note, index) => (
                          <div key={note.name} className="flex items-center gap-2">
                            <Input
                              type="number"
                              min={1}
                              max={100}
                              value={note.concentration}
                              onChange={(e) => {
                                const newNotes = [...formData[section.field] as SelectedNote[]]
                                newNotes[index] = {
                                  ...note,
                                  concentration: Number(e.target.value)
                                }
                                updateFormData(section.field, newNotes)
                              }}
                              className="w-20"
                            />
                            <span className="flex-grow">{note.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                updateFormData(
                                  section.field,
                                  (formData[section.field] as SelectedNote[]).filter((_, i) => i !== index)
                                )
                              }}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">4. Lab Development</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Batch Number</Label>
                  <Input 
                    value={formData.labDevelopment.batchNumber}
                    onChange={(e) => updateFormData('labDevelopment', {
                      ...formData.labDevelopment,
                      batchNumber: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>Temperature (°C)</Label>
                  <Input 
                    type="number"
                    value={formData.labDevelopment.temperature}
                    onChange={(e) => updateFormData('labDevelopment', {
                      ...formData.labDevelopment,
                      temperature: Number(e.target.value)
                    })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Humidity (%)</Label>
                  <Input 
                    type="number"
                    value={formData.labDevelopment.humidity}
                    onChange={(e) => updateFormData('labDevelopment', {
                      ...formData.labDevelopment,
                      humidity: Number(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label>pH Level</Label>
                  <Input 
                    type="number"
                    step="0.1"
                    value={formData.labDevelopment.pH}
                    onChange={(e) => updateFormData('labDevelopment', {
                      ...formData.labDevelopment,
                      pH: Number(e.target.value)
                    })}
                  />
                </div>
              </div>
              <div>
                <Label>Observations</Label>
                <Textarea 
                  value={formData.labDevelopment.observations.join('\n')}
                  onChange={(e) => updateFormData('labDevelopment', {
                    ...formData.labDevelopment,
                    observations: e.target.value.split('\n')
                  })}
                  placeholder="Enter each observation on a new line"
                />
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">5. Stability Tests</h2>
            <div className="grid gap-4">
              {formData.stabilityTests.map((test, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>Test #{index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Duration (days)</Label>
                          <Input 
                            type="number"
                            value={test.duration}
                            onChange={(e) => {
                              const newTests = [...formData.stabilityTests]
                              newTests[index] = { ...test, duration: Number(e.target.value) }
                              updateFormData('stabilityTests', newTests)
                            }}
                          />
                        </div>
                        <div>
                          <Label>Temperature (°C)</Label>
                          <Input 
                            type="number"
                            value={test.temperature}
                            onChange={(e) => {
                              const newTests = [...formData.stabilityTests]
                              newTests[index] = { ...test, temperature: Number(e.target.value) }
                              updateFormData('stabilityTests', newTests)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button 
                onClick={() => {
                  updateFormData('stabilityTests', [...formData.stabilityTests, {
                    accelerated: false,
                    duration: 0,
                    temperature: 25,
                    results: { color: '', odor: '', separation: '', pH: 7 },
                    passed: false
                  }])
                }}
              >
                Add Test
              </Button>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">6. Safety Assessment</h2>
            <div className="grid gap-4">
              <div>
                <Label>Allergen List</Label>
                <Textarea 
                  value={formData.safetyAssessment.allergenList.join('\n')}
                  onChange={(e) => updateFormData('safetyAssessment', {
                    ...formData.safetyAssessment,
                    allergenList: e.target.value.split('\n')
                  })}
                  placeholder="Enter each allergen on a new line"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>IFRA Compliance</Label>
                  <Input 
                    type="checkbox"
                    checked={formData.safetyAssessment.ifraCompliance}
                    onChange={(e) => updateFormData('safetyAssessment', {
                      ...formData.safetyAssessment,
                      ifraCompliance: e.target.checked
                    })}
                  />
                </div>
                <div>
                  <Label>Stability Period (months)</Label>
                  <Input 
                    type="number"
                    value={formData.safetyAssessment.stabilityPeriod}
                    onChange={(e) => updateFormData('safetyAssessment', {
                      ...formData.safetyAssessment,
                      stabilityPeriod: Number(e.target.value)
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">7. Production Specifications</h2>
            <div className="grid gap-4">
              <div>
                <Label>Batch Size (L)</Label>
                <Input 
                  type="number"
                  value={formData.productionSpecs.batchSize}
                  onChange={(e) => updateFormData('productionSpecs', {
                    ...formData.productionSpecs,
                    batchSize: Number(e.target.value)
                  })}
                />
              </div>
              <div>
                <Label>Equipment Requirements</Label>
                <Textarea 
                  value={formData.productionSpecs.equipmentRequirements.join('\n')}
                  onChange={(e) => updateFormData('productionSpecs', {
                    ...formData.productionSpecs,
                    equipmentRequirements: e.target.value.split('\n')
                  })}
                  placeholder="Enter each equipment requirement on a new line"
                />
              </div>
              <div>
                <Label>Mixing Instructions</Label>
                <Textarea 
                  value={formData.productionSpecs.mixingInstructions.join('\n')}
                  onChange={(e) => updateFormData('productionSpecs', {
                    ...formData.productionSpecs,
                    mixingInstructions: e.target.value.split('\n')
                  })}
                  placeholder="Enter each instruction on a new line"
                />
              </div>
            </div>
          </div>
        )
      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">8. Regulatory Review</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>MSDS</Label>
                  <Input 
                    type="checkbox"
                    checked={formData.regulatoryDocuments.msds}
                    onChange={(e) => updateFormData('regulatoryDocuments', {
                      ...formData.regulatoryDocuments,
                      msds: e.target.checked
                    })}
                  />
                </div>
                <div>
                  <Label>IFRA Conformity</Label>
                  <Input 
                    type="checkbox"
                    checked={formData.regulatoryDocuments.ifraConformity}
                    onChange={(e) => updateFormData('regulatoryDocuments', {
                      ...formData.regulatoryDocuments,
                      ifraConformity: e.target.checked
                    })}
                  />
                </div>
              </div>
              <div>
                <Label>Regulations</Label>
                <Textarea 
                  value={formData.regulations.join('\n')}
                  onChange={(e) => updateFormData('regulations', e.target.value.split('\n'))}
                  placeholder="Enter each regulation on a new line"
                />
              </div>
            </div>
          </div>
        )
      default:
        return null
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
      case 4: // Lab Development
        return !!data.labDevelopment.batchNumber && 
               !!data.labDevelopment.temperature && 
               !!data.labDevelopment.humidity && 
               !!data.labDevelopment.mixingTime && 
               !!data.labDevelopment.observations.length && 
               !!data.labDevelopment.pH && 
               !!data.labDevelopment.viscosity
      case 5: // Stability Tests
        return data.stabilityTests.length > 0 && 
               data.stabilityTests.every(test => 
                 test.duration > 0 && 
                 test.temperature > 0 && 
                 test.results.color && 
                 test.results.odor && 
                 test.results.separation && 
                 test.results.pH > 0
               )
      case 6: // Safety Assessment
        return data.safetyAssessment.allergenList.length > 0 && 
               data.safetyAssessment.skinIrritationTest && 
               data.safetyAssessment.photosensitivityTest && 
               data.safetyAssessment.preservativeSystem && 
               data.safetyAssessment.stabilityPeriod > 0
      case 7: // Production Specs
        return data.productionSpecs.batchSize > 0 && 
               data.productionSpecs.equipmentRequirements.length > 0 && 
               data.productionSpecs.mixingInstructions.length > 0 && 
               data.productionSpecs.qualityControlPoints.length > 0 && 
               data.productionSpecs.packagingRequirements.length > 0 && 
               data.productionSpecs.storageConditions
      case 8: // Regulatory Review
        return data.regulatoryDocuments.msds && 
               data.regulatoryDocuments.ifraConformity && 
               data.regulatoryDocuments.allergenDeclaration && 
               data.regulatoryDocuments.safetyAssessmentReport
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
              
              <div className="flex justify-end gap-4 mt-6">
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

