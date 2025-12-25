'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/', icon: '📊' },
        { name: 'pNodes', href: '/pnodes', icon: '🖥️' },
        { name: 'Network Map', href: '/map', icon: '🌐' },
        { name: 'History', href: '/history', icon: '📈' },
        { name: 'Settings', href: '/settings', icon: '⚙️' },
    ];

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-slate-900 border-r border-slate-800 hidden md:block">
            <nav className="p-4 space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === link.href
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <span>{link.icon}</span>
                        <span className="font-medium">{link.name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
