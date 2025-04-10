'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Início', path: '/' },
  { name: 'Whats Connect', path: '/whatsapp/connection' },
  { name: 'Cadastro', path: '/admin/cadastros' },
  { name: 'Contatos', path: '/admin/contatos' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 h-screen bg-[#FFFFFF] text-white shadow-md flex flex-col">

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#9C9FA6] hover:text-white font-medium text-sm ${
              pathname === item.path ? 'bg-[#252625] text-white' : 'text-[#002333]'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 