'use client';

import { useRouter } from 'next/navigation';
import { useGroupedMessages } from '@/app/nakaneimoveis/hooks/useGroupedMessages';

export default function ConversationList() {
  const router = useRouter();
  const { conversations, loading, error } = useGroupedMessages();

  if (loading) return <p>Carregando conversas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-4">
      {conversations.length === 0 ? (
        <p>Nenhuma conversa ativa.</p>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation.contact}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/admin/Conversas-ativas/${conversation.contact}`)}
          >
            <p><strong>Contato:</strong> {conversation.contact}</p>
            <p><strong>Mensagens enviadas:</strong> {conversation.sent}</p>
            <p><strong>Mensagens recebidas:</strong> {conversation.received}</p>
          </div>
        ))
      )}
    </div>
  );
}
