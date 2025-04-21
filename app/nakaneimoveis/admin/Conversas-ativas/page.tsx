'use client';

import Layout from '@/app/nakaneimoveis/componentes/Layout';
import ConversationList from '@/app/nakaneimoveis/componentes/list/ConversationList';
import ProtectedPage from '@/app/nakaneimoveis/componentes/ProtectedPage';

export default function ConversasAtivasPage() {
  return (
    <ProtectedPage>
    <Layout>
      <div className="min-h-screen bg-[#EEEEEE] flex flex-col p-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Conversas Ativas</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ConversationList />
        </div>
      </div>
    </Layout>
    </ProtectedPage>
  );
}
