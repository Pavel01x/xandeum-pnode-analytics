'use client';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: string;
    trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ title, value, change, icon, trend }: StatCardProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-600/10 rounded-lg text-lg group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                {change && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-500/10 text-green-500' :
                            trend === 'down' ? 'bg-red-500/10 text-red-500' :
                                'bg-slate-800 text-slate-400'
                        }`}>
                        {change}
                    </span>
                )}
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
            <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
        </div>
    );
}
