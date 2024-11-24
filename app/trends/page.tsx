'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

// This would typically come from an API or database
const initialTrends = [
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
  },
  {
    id: 3,
    name: "Sweet Gourmand",
    description: "Vanilla and sweet notes",
    keywords: ["vanilla", "sweet", "gourmand"],
    type: "Oriental",
    popularity: 68,
    seasonality: ["Autumn", "Winter"]
  }
]

export default function TrendsPage() {
  const [trends, setTrends] = useState(initialTrends)
  const [newTrend, setNewTrend] = useState({
    name: '',
    description: '',
    keywords: '',
    type: '',
    seasonality: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTrend(prev => ({ ...prev, [name]: value }))
  }

  const handleAddTrend = () => {
    const trendToAdd = {
      ...newTrend,
      id: trends.length + 1,
      keywords: newTrend.keywords.split(',').map(k => k.trim()),
      seasonality: newTrend.seasonality.split(',').map(s => s.trim()),
      popularity: Math.floor(Math.random() * 100)
    }
    setTrends([...trends, trendToAdd])
    setNewTrend({ name: '', description: '', keywords: '', type: '', seasonality: '' })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fragrance Trends</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add New Trend</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Trend</DialogTitle>
              <DialogDescription>
                Enter the details of the new fragrance trend here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newTrend.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newTrend.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="keywords" className="text-right">
                  Keywords
                </Label>
                <Input
                  id="keywords"
                  name="keywords"
                  value={newTrend.keywords}
                  onChange={handleInputChange}
                  placeholder="Comma-separated"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  name="type"
                  value={newTrend.type}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="seasonality" className="text-right">
                  Seasonality
                </Label>
                <Input
                  id="seasonality"
                  name="seasonality"
                  value={newTrend.seasonality}
                  onChange={handleInputChange}
                  placeholder="Comma-separated"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddTrend}>Add Trend</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trends.map((trend) => (
          <Card key={trend.id}>
            <CardHeader>
              <CardTitle>{trend.name}</CardTitle>
              <CardDescription>{trend.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span className="font-semibold">Type:</span> {trend.type}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Keywords:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {trend.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Seasonality:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {trend.seasonality.map((season, index) => (
                    <Badge key={index} variant="outline">{season}</Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <span className="font-semibold">Popularity:</span> {trend.popularity}%
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${trend.popularity}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Link href={`/creation?trend=${trend.id}`} passHref>
                <Button size="sm">Create Fragrance</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

