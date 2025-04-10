'use client';

import Layout from '@/app/componentes/Layout';
import ConversationList from '@/app/componentes/ConversationList';

export default function ConversasAtivasPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#EEEEEE] flex flex-col p-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Conversas Ativas</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ConversationList />
        </div>
      </div>
    </Layout>
  );
}
