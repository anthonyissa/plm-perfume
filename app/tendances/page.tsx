import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const trends = [
  {
    id: 1,
    name: "Fraîcheur Océanique",
    description: "Notes marines et agrumes",
    keywords: ["océan", "agrumes", "frais"],
    type: "Frais"
  },
  {
    id: 2,
    name: "Forêt Enchantée",
    description: "Boisé avec touches florales",
    keywords: ["bois", "fleurs", "mousse"],
    type: "Boisé"
  },
  {
    id: 3,
    name: "Douceur Gourmande",
    description: "Vanille et notes sucrées",
    keywords: ["vanille", "sucré", "gourmand"],
    type: "Oriental"
  }
]

export default function TrendsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tendances</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Mots-clés</TableHead>
            <TableHead>Type de parfum</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trends.map((trend) => (
            <TableRow key={trend.id}>
              <TableCell>{trend.name}</TableCell>
              <TableCell>{trend.description}</TableCell>
              <TableCell>{trend.keywords.join(", ")}</TableCell>
              <TableCell>{trend.type}</TableCell>
              <TableCell>
                <Link href={`/creation?trend=${trend.id}`}>
                  <Button>Créer un parfum</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

