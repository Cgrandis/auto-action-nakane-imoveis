'use client';

import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#525259] tracking-widest">
          AutoAction
        </h1>
        <button
          onClick={() => router.push('/login')}
          className="bg-[#37A686] hover:bg-[#2C403A] text-white font-medium px-4 py-2 rounded transition"
        >
          Login
        </button>
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
