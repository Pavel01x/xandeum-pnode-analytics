'use client';

import { usePNodes, useNodeStats } from '@/lib/hooks/use-pnodes';
import { StatCard } from '@/components/charts/stat-card';
import { PNodeTable } from '@/components/tables/pnode-table';
import { NetworkHealthChart } from '@/components/charts/health-chart';
import { PNode } from '@/types/pnode';

// Mock data for network health over time
const MOCK_HEALTH_DATA = [
  { time: '00:00', health: 85 },
  { time: '04:00', health: 88 },
  { time: '08:00', health: 82 },
  { time: '12:00', health: 91 },
  { time: '16:00', health: 89 },
  { time: '20:00', health: 94 },
  { time: '23:59', health: 92 },
];

export default function Home() {
  const { data: nodes } = usePNodes();
  const { data: stats } = useNodeStats();

  // Aggregated stats from nodes list
  const totalNodes = nodes?.length || 0;
  const activeNodes = nodes?.filter((n: PNode) => n.status === 'active').length || 0;
  const totalStorageUsed = nodes?.reduce((acc: number, n: PNode) => acc + (n.storage_used || 0), 0) || 0;
  const avgUptime = nodes?.length
    ? nodes.reduce((acc: number, n: PNode) => acc + (n.uptime || 0), 0) / nodes.length
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Network Overview</h1>
        <p className="text-slate-400">Real-time performance metrics for the Xandeum storage layer.</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total pNodes"
          value={totalNodes}
          change="+12"
          trend="up"
          icon="🖥️"
        />
        <StatCard
          title="Active Nodes"
          value={activeNodes}
          change={totalNodes > 0 ? `${((activeNodes / totalNodes) * 100).toFixed(1)}%` : '0%'}
          trend="neutral"
          icon="🟢"
        />
        <StatCard
          title="Network Storage"
          value={`${(totalStorageUsed / (1024 * 1024)).toFixed(1)} MB`}
          change="6.8 GB Cap"
          trend="up"
          icon="💾"
        />
        <StatCard
          title="Avg Core Uptime"
          value={`${(avgUptime / 3600).toFixed(1)}h`}
          change="Trynet v0.8"
          trend="up"
          icon="⏱️"
        />
      </div>

      {/* Visualization Section */}
      <div className="grid grid-cols-1 gap-6">
        <NetworkHealthChart data={MOCK_HEALTH_DATA} />
      </div>

      {/* Main Table */}
      <div className="mt-8">
        <PNodeTable />
      </div>
    </div>
  );
}
