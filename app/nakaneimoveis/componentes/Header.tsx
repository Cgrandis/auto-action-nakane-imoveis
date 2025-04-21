'use client';

import LogoutButton from '@/app/componentes/auth/LogoutButton';
import { useUser } from '@/app/lib/auth/useUser';

export default function Header() {
  const { user, loading } = useUser();
  return (
    <header className="bg-[#FFFFFF] shadow-md">
      <div className="py-3 px-6 flex items-center justify-between">
        <h1
          className="text-2xl font-bold tracking-widest"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#525259',
            textShadow: '0 0 16px rgba(6, 7, 7, 0.4)',
          }}
        >
          Nakane Auto Autoatendimento
        </h1>

        <div className="flex items-center gap-4">
          {!loading && user?.nome && (
            <span className="text-gray-600">Olá, {user.nome}</span>
          )}
          <LogoutButton />
        </div>
      </div>

      <div
        className="h-[4px] w-full"
        style={{
          background: 'linear-gradient(to right, #6A6A73, #525259, #9C9FA6, #252625',
        }}
      />
    </header>
  );
}
