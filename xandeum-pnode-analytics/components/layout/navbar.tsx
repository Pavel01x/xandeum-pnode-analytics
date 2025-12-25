'use client';

import Link from 'next/link';

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-6">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                    X
                </div>
                <Link href="/" className="text-xl font-bold text-white tracking-tight">
                    Xandeum <span className="text-blue-500">Pulse</span>
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-green-500">Network Live</span>
                </div>

                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    🔔
                </button>
                <button className="flex items-center space-x-2 p-1 pl-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
                    <span className="text-sm font-medium text-slate-300">Trynet v0.8.0</span>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">
                        JD
                    </div>
                </button>
            </div>
        </header>
    );
}
