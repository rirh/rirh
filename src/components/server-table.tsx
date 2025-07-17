import React, { useState, useMemo } from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Server data types
interface ServerData {
  id: string
  instance: string
  health: number
  cpuUsage: number
  memoryUsage: number
  status: "healthy" | "warning" | "critical"
  location: string
  uptime: string
}

// Sorting configuration
type SortField = keyof ServerData
type SortDirection = "asc" | "desc" | null

interface SortableColumn {
  field: SortField
  label: string
  sortable: boolean
  render?: (value: any, row: ServerData) => React.ReactNode
}

// Sample data for demo purposes
const sampleServerData: ServerData[] = [
  {
    id: "1",
    instance: "web-server-01",
    health: 98,
    cpuUsage: 45,
    memoryUsage: 67,
    status: "healthy",
    location: "US-East",
    uptime: "15d 4h"
  },
  {
    id: "2", 
    instance: "api-server-02",
    health: 85,
    cpuUsage: 78,
    memoryUsage: 89,
    status: "warning",
    location: "EU-West",
    uptime: "8d 12h"
  },
  {
    id: "3",
    instance: "db-server-03", 
    health: 45,
    cpuUsage: 95,
    memoryUsage: 96,
    status: "critical",
    location: "Asia-Pacific",
    uptime: "2d 6h"
  },
  {
    id: "4",
    instance: "cache-server-04",
    health: 92,
    cpuUsage: 23,
    memoryUsage: 45,
    status: "healthy",
    location: "US-West",
    uptime: "25d 8h"
  },
  {
    id: "5",
    instance: "lb-server-05",
    health: 88,
    cpuUsage: 34,
    memoryUsage: 56,
    status: "healthy",
    location: "EU-Central",
    uptime: "12d 3h"
  }
]

// Column configuration
const columns: SortableColumn[] = [
  {
    field: "instance",
    label: "实例名称",
    sortable: false, // Text columns are not sortable as per requirements
    render: (value: string, row: ServerData) => (
      <div className="font-medium">
        <div className="text-sm">{value}</div>
        <div className="text-xs text-muted-foreground">{row.location}</div>
      </div>
    )
  },
  {
    field: "health",
    label: "健康值",
    sortable: true, // Numerical column - sortable
    render: (value: number) => (
      <div className="text-center">
        <div className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
          value >= 90 ? "bg-green-100 text-green-800" :
          value >= 70 ? "bg-yellow-100 text-yellow-800" :
          "bg-red-100 text-red-800"
        )}>
          {value}%
        </div>
      </div>
    )
  },
  {
    field: "cpuUsage",
    label: "CPU使用率",
    sortable: true, // Numerical column - sortable
    render: (value: number) => (
      <div className="space-y-1">
        <div className="text-sm font-medium">{value}%</div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={cn(
              "h-2 rounded-full transition-all",
              value >= 80 ? "bg-red-500" :
              value >= 60 ? "bg-yellow-500" :
              "bg-green-500"
            )}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    )
  },
  {
    field: "memoryUsage",
    label: "内存使用率",
    sortable: true, // Numerical column - sortable
    render: (value: number) => (
      <div className="space-y-1">
        <div className="text-sm font-medium">{value}%</div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={cn(
              "h-2 rounded-full transition-all",
              value >= 80 ? "bg-red-500" :
              value >= 60 ? "bg-yellow-500" :
              "bg-green-500"
            )}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    )
  },
  {
    field: "status",
    label: "状态",
    sortable: false, // Status column - not sortable
    render: (value: string) => (
      <div className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        value === "healthy" ? "bg-green-100 text-green-800" :
        value === "warning" ? "bg-yellow-100 text-yellow-800" :
        "bg-red-100 text-red-800"
      )}>
        {value === "healthy" ? "健康" : value === "warning" ? "警告" : "严重"}
      </div>
    )
  },
  {
    field: "uptime",
    label: "运行时间", 
    sortable: false, // Text-based time format - not sortable
  }
]

interface ServerTableProps {
  data?: ServerData[]
  className?: string
}

export default function ServerTable({ data = sampleServerData, className }: ServerTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = data.filter(row =>
      row.instance.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aVal = a[sortField]
        const bVal = b[sortField]
        
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal
        }
        
        const aStr = String(aVal).toLowerCase()
        const bStr = String(bVal).toLowerCase()
        if (sortDirection === "asc") {
          return aStr < bStr ? -1 : aStr > bStr ? 1 : 0
        } else {
          return aStr > bStr ? -1 : aStr < bStr ? 1 : 0
        }
      })
    }

    return filtered
  }, [data, searchTerm, sortField, sortDirection])

  // Handle sorting
  const handleSort = (field: SortField, sortable: boolean) => {
    if (!sortable) return

    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortField(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get sort icon
  const getSortIcon = (field: SortField, sortable: boolean) => {
    if (!sortable) return null

    if (sortField === field) {
      if (sortDirection === "asc") {
        return <ChevronUp className="h-4 w-4" />
      } else if (sortDirection === "desc") {
        return <ChevronDown className="h-4 w-4" />
      }
    }
    return <ChevronsUpDown className="h-4 w-4 opacity-50" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search input */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索实例或位置..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table with fixed first column */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]"> {/* Ensure minimum width for horizontal scroll */}
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead
                      key={column.field}
                      className={cn(
                        index === 0 && "sticky left-0 bg-background z-10 border-r min-w-[200px]", // Fixed first column
                        column.sortable && "cursor-pointer select-none hover:bg-muted/50",
                        "transition-colors"
                      )}
                      onClick={() => handleSort(column.field, column.sortable)}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{column.label}</span>
                        {getSortIcon(column.field, column.sortable)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column, index) => (
                      <TableCell
                        key={column.field}
                        className={cn(
                          index === 0 && "sticky left-0 bg-background z-10 border-r min-w-[200px]" // Fixed first column
                        )}
                      >
                        {column.render 
                          ? column.render(row[column.field], row)
                          : row[column.field]
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Results summary */}
      <div className="text-sm text-muted-foreground">
        显示 {processedData.length} 个结果，共 {data.length} 个服务器实例
      </div>
    </div>
  )
}