'use client';

import Layout from '@/app/autoaction/componentes/Layout';

export default function Home() {
  return (
    // <ProtectedPage>
    <Layout>
      <h2 className="text-2xl font-semibold text-[#344459] mb-4">Dashboard</h2>
      <p className="text-[#344459]">Bem-vindo ao AutoAction. Selecione uma opção no menu lateral para começar.</p>
    </Layout>
    // </ProtectedPage>
  );
}