'use client';

import { useState, useMemo } from 'react';
import { usePNodes } from '@/lib/hooks/use-pnodes';
import { PNode } from '@/types/pnode';

export function PNodeTable() {
    const { data: nodes, isLoading, isError } = usePNodes();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'degraded'>('all');

    const filteredNodes = useMemo(() => {
        if (!nodes) return [];
        return nodes.filter(node => {
            const matchesSearch = node.pubkey.toLowerCase().includes(searchTerm.toLowerCase()) ||
                node.address.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || node.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [nodes, searchTerm, statusFilter]);

    if (isLoading) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl animate-pulse">
                <span className="text-slate-400">Loading network data...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-slate-900 border border-red-900/50 rounded-xl text-red-500">
                Error fetching pNode data. Check connection.
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {/* Table Controls */}
            <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-lg font-bold text-white whitespace-nowrap">Live pNode Network</h2>

                <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1 md:w-64">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by pubkey or IP..."
                            className="w-full bg-slate-950 border border-slate-700 text-sm rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        className="bg-slate-950 border border-slate-700 text-sm rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active Only</option>
                        <option value="degraded">Degraded Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                            <th className="p-4 font-semibold">Validator / Pubkey</th>
                            <th className="p-4 font-semibold">Address</th>
                            <th className="p-4 font-semibold text-center">Status</th>
                            <th className="p-4 font-semibold text-center">Uptime</th>
                            <th className="p-4 font-semibold text-right">Storage Used</th>
                            <th className="p-4 font-semibold text-right">Health</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {filteredNodes.length > 0 ? filteredNodes.map((node: PNode) => (
                            <tr key={node.pubkey} className="hover:bg-slate-800/50 transition-colors group cursor-pointer">
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-white truncate max-w-[150px]" title={node.pubkey}>
                                            {node.pubkey}
                                        </span>
                                        <span className="text-[10px] text-slate-500">{node.version}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-400">{node.address}</td>
                                <td className="p-4 text-center">
                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${node.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                            node.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`} />
                                    <span className={`text-xs capitalize ${node.status === 'active' ? 'text-green-500' :
                                            node.status === 'degraded' ? 'text-yellow-500' : 'text-red-500'
                                        }`}>
                                        {node.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center text-sm text-slate-300">
                                    {Math.floor(node.uptime / 3600)}h {Math.floor((node.uptime % 3600) / 60)}m
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-medium text-slate-200">
                                            {(node.storage_used / (1024 * 1024)).toFixed(2)} MB
                                        </span>
                                        <div className="w-20 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600"
                                                style={{ width: `${node.storage_usage_percent}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <span className={`text-sm font-bold ${(node.healthScore || 0) > 80 ? 'text-green-500' :
                                            (node.healthScore || 0) > 50 ? 'text-yellow-500' : 'text-red-500'
                                        }`}>
                                        {node.healthScore}%
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-500 italic">
                                    No nodes matching your search/filter criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Footer / Count */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/20 text-xs text-slate-500 text-right">
                Showing {filteredNodes.length} of {nodes?.length || 0} discovered nodes
            </div>
        </div>
    );
}
