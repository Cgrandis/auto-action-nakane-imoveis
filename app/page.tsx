'use client';

import Header from '@/app/componentes/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#344459]">Bem-vindo ao AutoAction!</h1>
          <p className="mt-4 text-gray-600">Gerencie sua área com automação e eficiência.</p>
        </div>
      </div>
    </>
  );
}
