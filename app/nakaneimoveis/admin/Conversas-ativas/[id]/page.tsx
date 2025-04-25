'use client';

import { useParams } from 'next/navigation';
import Layout from '@/app/nakaneimoveis/componentes/Layout';
import ProtectedPage from '@/app/nakaneimoveis/componentes/ProtectedPage';
import Link from 'next/link';
import { useMessagesByConversationId } from '@/app/nakaneimoveis/hooks/useMessagesByConversationId';

export default function ConversationDetail() {
  const { id } = useParams();
  const conversationId = Array.isArray(id) ? id[0] : id;
  const { messages, loading, error } = useMessagesByConversationId(conversationId || null);

  if (loading) return <p>Carregando mensagens...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ProtectedPage>
      <Layout>
        <div className="space-y-4">
          <Link href="/admin/Conversas-ativas" passHref>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full max-w-xs mx-auto text-sm transition-all duration-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none mb-4">
              Voltar para a lista de conversas
            </button>
          </Link>

          {messages.length === 0 ? (
            <p>Nenhuma mensagem encontrada para esta conversa.</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="bg-white p-4 rounded-lg shadow-md">
                <p><strong>De:</strong> {message.from}</p>
                <p><strong>Direção:</strong> {message.direction}</p>
                <p><strong>Mensagem:</strong> {message.body}</p>
                <p><strong>Criada em:</strong> {new Date(message.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </Layout>
    </ProtectedPage>
  );
}
