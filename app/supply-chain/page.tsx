import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const supplyChainData = [
  { id: 1, name: "Fleur de Printemps", currentLocation: "Usine A", nextDestination: "Centre de distribution", stock: 500, salesPoints: "Paris, Lyon, Marseille" },
  { id: 2, name: "Bois Mystique", currentLocation: "Centre de distribution", nextDestination: "Boutiques", stock: 1000, salesPoints: "Bordeaux, Lille, Strasbourg" },
  { id: 3, name: "Océan Frais", currentLocation: "En production", nextDestination: "Usine B", stock: 0, salesPoints: "Nice, Cannes, Monaco" },
]

export default function SupplyChainPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Supply Chain</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du parfum</TableHead>
            <TableHead>Localisation actuelle</TableHead>
            <TableHead>Prochaine destination</TableHead>
            <TableHead>État du stock</TableHead>
            <TableHead>Points de vente prévus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplyChainData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.currentLocation}</TableCell>
              <TableCell>{item.nextDestination}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.salesPoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

