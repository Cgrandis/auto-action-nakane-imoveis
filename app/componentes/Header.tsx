'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#05AFF2] tracking-widest">
          AutoAction
        </h1>
        <button
          onClick={() => router.push('/login')}
          className="bg-[#344459] hover:bg-[#0583F2] text-white font-medium px-4 py-2 rounded transition"
        >
          Login
        </button>
      </div>
      <div
        className="h-[4px] w-full"
        style={{
          background: 'linear-gradient(to right, #344459, #0583F2, #05AFF2, #05DBF2, #0D0D0D',
        }}
      />
    </header>
  );
}
