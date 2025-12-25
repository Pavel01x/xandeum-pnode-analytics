'use client';

import { usePNode } from '@/lib/hooks/use-pnodes';
import { useParams, useRouter } from 'next/navigation';
import { StatCard } from '@/components/charts/stat-card';
import Link from 'next/link';

export default function PNodeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const pubkey = params.id as string;
    const { data: node, isLoading, isError } = usePNode(pubkey);

    if (isLoading) {
        return <div className="p-8 text-center text-slate-400 animate-pulse">Loading pNode details...</div>;
    }

    if (isError || !node) {
        return (
            <div className="p-8 text-center text-red-500">
                <p className="mb-4">pNode not found or error loading data.</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Link href="/" className="hover:text-blue-500 transition-colors">Dashboard</Link>
                <span>/</span>
                <span className="text-slate-300">pNode Details</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 break-all">
                        {node.pubkey}
                    </h1>
                    <div className="flex items-center space-x-3">
                        <span className={`inline-block w-3 h-3 rounded-full ${node.status === 'active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                                node.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                        <span className="text-slate-300 font-medium capitalize">{node.status}</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-slate-400 font-mono text-sm">{node.address}</span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(node.pubkey);
                            alert('Pubkey copied to clipboard!');
                        }}
                        className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-600/20 transition-all text-sm font-medium"
                    >
                        Copy Pubkey
                    </button>
                    <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-all text-sm font-medium">
                        Export Logs
                    </button>
                </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Health Score"
                    value={`${node.healthScore}%`}
                    icon="🏥"
                    trend={node.healthScore && node.healthScore > 80 ? 'up' : 'neutral'}
                />
                <StatCard
                    title="Current Uptime"
                    value={`${(node.uptime / 3600).toFixed(1)}h`}
                    icon="⏱️"
                    trend="neutral"
                />
                <StatCard
                    title="Storage Used"
                    value={`${(node.storage_used / (1024 * 1024)).toFixed(2)} MB`}
                    icon="💾"
                    trend="neutral"
                />
                <StatCard
                    title="Usage %"
                    value={`${node.storage_usage_percent.toFixed(4)}%`}
                    icon="📊"
                    trend="neutral"
                />
            </div>

            {/* Details and Technical Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Performance History Placeholder */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-[400px] flex flex-col items-center justify-center text-slate-500 italic">
                        <div className="text-4xl mb-4">📈</div>
                        Performance history chart coming soon...
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Technical Specs</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b border-slate-800">
                                <span className="text-slate-400 text-sm">Software Version</span>
                                <span className="text-white text-sm font-mono">{node.version}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-800">
                                <span className="text-slate-400 text-sm">RPC Port</span>
                                <span className="text-white text-sm font-mono">{node.rpc_port}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-800">
                                <span className="text-slate-400 text-sm">Is Public</span>
                                <span className="text-white text-sm">{node.is_public ? '✅ Yes' : '❌ No'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-800">
                                <span className="text-slate-400 text-sm">Total Committed</span>
                                <span className="text-white text-sm">{(node.storage_committed / (1024 * 1024 * 1024)).toFixed(2)} GB</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-slate-400 text-sm">Last Seen</span>
                                <span className="text-white text-sm">
                                    {new Date(node.last_seen_timestamp * 1000).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600/5 border border-blue-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-blue-500 mb-2">Node Insights</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {node.healthScore && node.healthScore > 90
                                ? "This node is performing optimally and contributing significantly to the Xandeum storage network."
                                : node.status === 'degraded'
                                    ? "This node has low uptime or storage utilization issues. Operator intervention may be required."
                                    : "This node is stable but has room for health optimization through increased uptime."
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
