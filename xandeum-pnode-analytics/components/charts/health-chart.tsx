'use client';

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

interface NetworkHealthChartProps {
    data: any[];
}

export function NetworkHealthChart({ data }: NetworkHealthChartProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-[350px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white">Network Health Over Time</h2>
                    <p className="text-xs text-slate-500">Avg health score of all discovered pNodes</p>
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-slate-800 rounded-md text-[10px] text-slate-300 font-bold hover:bg-slate-700 transition-colors">1H</button>
                    <button className="px-3 py-1 bg-blue-600 rounded-md text-[10px] text-white font-bold">24H</button>
                    <button className="px-3 py-1 bg-slate-800 rounded-md text-[10px] text-slate-300 font-bold hover:bg-slate-700 transition-colors">7D</button>
                </div>
            </div>

            <div className="w-full h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#64748b"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#64748b"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                fontSize: '12px',
                                color: '#f8fafc'
                            }}
                            itemStyle={{ color: '#3b82f6' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="health"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorHealth)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
