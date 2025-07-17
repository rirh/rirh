import React from "react"
import ServerTable from "@/components/server-table"

export default function ServerTableDemo() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">服务器状态监控</h1>
        <p className="text-muted-foreground">
          实时监控服务器状态，包括健康值、CPU使用率、内存使用率等关键指标
        </p>
      </div>
      
      <ServerTable />
    </div>
  )
}