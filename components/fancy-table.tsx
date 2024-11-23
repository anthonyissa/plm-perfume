"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Tag } from "@/components/ui/tag"

interface DataItem {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
  tags: string[]
}

const data: DataItem[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Developer", status: "Active", tags: ["Frontend", "React"] },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer", status: "Active", tags: ["UI/UX", "Figma"] },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Manager", status: "Inactive", tags: ["Project Management"] },
  { id: 4, name: "Diana Ross", email: "diana@example.com", role: "Developer", status: "Active", tags: ["Backend", "Node.js"] },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "DevOps", status: "Active", tags: ["AWS", "Docker"] },
]

type SortKeys = keyof Omit<DataItem, "id" | "tags">
type SortOrder = "asc" | "desc"

function FancyTable() {
  const [sortKey, setSortKey] = React.useState<SortKeys>("name")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc")
  const [searchTerm, setSearchTerm] = React.useState("")

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data]
    if (searchTerm) {
      sortableItems = sortableItems.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    return sortableItems.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }, [data, sortKey, sortOrder, searchTerm])

  const handleSort = (key: SortKeys) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  const SortIcon = ({ columnKey }: { columnKey: SortKeys }) => {
    if (columnKey !== sortKey) return null
    return sortOrder === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  return (
    <div className="w-full mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")} className="cursor-pointer hover:bg-gray-100">
                <span className="flex items-center">
                  Name <SortIcon columnKey="name" />
                </span>
              </TableHead>
              <TableHead onClick={() => handleSort("email")} className="cursor-pointer hover:bg-gray-100">
                <span className="flex items-center">
                  Email <SortIcon columnKey="email" />
                </span>
              </TableHead>
              <TableHead onClick={() => handleSort("role")} className="cursor-pointer hover:bg-gray-100">
                <span className="flex items-center">
                  Role <SortIcon columnKey="role" />
                </span>
              </TableHead>
              <TableHead onClick={() => handleSort("status")} className="cursor-pointer hover:bg-gray-100">
                <span className="flex items-center">
                  Status <SortIcon columnKey="status" />
                </span>
              </TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Tag variant={item.status === "Active" ? "default" : "destructive"}>
                    {item.status}
                  </Tag>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Tag key={index} variant="secondary">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default FancyTable

