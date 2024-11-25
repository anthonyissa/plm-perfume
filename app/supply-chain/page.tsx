'use client'

import { useState } from 'react'
import { BarChart, Truck, Package, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from an API or database
const initialSupplyChainData = [
  { 
    id: 1, 
    name: "Spring Blossom", 
    currentLocation: "Manufacturing Plant A", 
    nextDestination: "Distribution Center", 
    stock: 5000,
    salesPoints: ["Paris", "New York", "Tokyo"],
    rawMaterials: [
      { name: "Rose Essential Oil", stock: 80, reorderPoint: 50 },
      { name: "Bergamot Extract", stock: 120, reorderPoint: 100 },
      { name: "Jasmine Absolute", stock: 40, reorderPoint: 30 }
    ],
    productionStatus: "In Progress",
    qualityCheck: "Passed",
    estimatedDelivery: "2023-08-15"
  },
  { 
    id: 2, 
    name: "Ocean Breeze", 
    currentLocation: "Distribution Center", 
    nextDestination: "Retail Stores", 
    stock: 10000,
    salesPoints: ["London", "Sydney", "Dubai"],
    rawMaterials: [
      { name: "Sea Salt Extract", stock: 150, reorderPoint: 100 },
      { name: "Citrus Blend", stock: 90, reorderPoint: 80 },
      { name: "Aquatic Notes", stock: 110, reorderPoint: 90 }
    ],
    productionStatus: "Completed",
    qualityCheck: "Passed",
    estimatedDelivery: "2023-07-30"
  },
  { 
    id: 3, 
    name: "Midnight Mystery", 
    currentLocation: "Quality Control", 
    nextDestination: "Manufacturing Plant B", 
    stock: 0,
    salesPoints: ["Milan", "Los Angeles", "Hong Kong"],
    rawMaterials: [
      { name: "Vanilla Bourbon", stock: 30, reorderPoint: 50 },
      { name: "Patchouli Oil", stock: 70, reorderPoint: 60 },
      { name: "Amber Resin", stock: 45, reorderPoint: 40 }
    ],
    productionStatus: "Quality Check",
    qualityCheck: "In Progress",
    estimatedDelivery: "2023-09-01"
  },
]

export default function SupplyChainPage() {
  const [supplyChainData, setSupplyChainData] = useState(initialSupplyChainData)
  const [selectedProduct, setSelectedProduct] = useState<typeof initialSupplyChainData[0] | null>(null)

  const handleStockUpdate = (id: number, newStock: number) => {
    setSupplyChainData(prev => prev.map(item => 
      item.id === id ? { ...item, stock: newStock } : item
    ))
  }

  const handleLocationUpdate = (id: number, newLocation: string) => {
    setSupplyChainData(prev => prev.map(item => 
      item.id === id ? { ...item, currentLocation: newLocation } : item
    ))
  }

  const getTotalStock = () => supplyChainData.reduce((sum, item) => sum + item.stock, 0)

  const getLowStockItems = () => supplyChainData.filter(item => 
    item.rawMaterials.some(material => material.stock < material.reorderPoint)
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Supply Chain Management</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalStock().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">units across all products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products in Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supplyChainData.filter(item => item.currentLocation !== item.nextDestination).length}</div>
            <p className="text-xs text-muted-foreground">products currently moving</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getLowStockItems().length}</div>
            <p className="text-xs text-muted-foreground">products with low raw materials</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Checks</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supplyChainData.filter(item => item.qualityCheck === "Passed").length}/{supplyChainData.length}</div>
            <p className="text-xs text-muted-foreground">products passed quality control</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rawMaterials">Raw Materials</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Current Location</TableHead>
                <TableHead>Next Destination</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Production Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplyChainData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.currentLocation}</TableCell>
                  <TableCell>{item.nextDestination}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <Badge variant={item.productionStatus === "Completed" ? "default" : "secondary"}>
                      {item.productionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setSelectedProduct(item)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="rawMaterials" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Raw Material</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Reorder Point</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplyChainData.flatMap((item) => 
                item.rawMaterials.map((material, index) => (
                  <TableRow key={`${item.id}-${index}`}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>{material.stock}</TableCell>
                    <TableCell>{material.reorderPoint}</TableCell>
                    <TableCell>
                      <Badge variant={material.stock < material.reorderPoint ? "destructive" : "default"}>
                        {material.stock < material.reorderPoint ? "Low Stock" : "Sufficient"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Detailed view and management of the product supply chain
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-location" className="text-right">
                Current Location
              </Label>
              <Select
                value={selectedProduct?.currentLocation}
                onValueChange={(value) => selectedProduct && handleLocationUpdate(selectedProduct.id, value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manufacturing Plant A">Manufacturing Plant A</SelectItem>
                  <SelectItem value="Manufacturing Plant B">Manufacturing Plant B</SelectItem>
                  <SelectItem value="Distribution Center">Distribution Center</SelectItem>
                  <SelectItem value="Quality Control">Quality Control</SelectItem>
                  <SelectItem value="Retail Stores">Retail Stores</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={selectedProduct?.stock}
                onChange={(e) => selectedProduct && handleStockUpdate(selectedProduct.id, parseInt(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sales-points" className="text-right">
                Sales Points
              </Label>
              <Input id="sales-points" value={selectedProduct?.salesPoints.join(", ")} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quality-check" className="text-right">
                Quality Check
              </Label>
              <Input id="quality-check" value={selectedProduct?.qualityCheck} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estimated-delivery" className="text-right">
                Est. Delivery
              </Label>
              <Input id="estimated-delivery" value={selectedProduct?.estimatedDelivery} className="col-span-3" readOnly />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

