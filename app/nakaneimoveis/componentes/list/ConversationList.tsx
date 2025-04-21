'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Message } from '../../types/interfaces';

export default function ConversationList() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const groupMessagesByContact = (messages: Message[]) => {
    const grouped: any = {};

    messages.forEach((message) => {
      const contact = message.from;

      if (!grouped[contact]) {
        grouped[contact] = {
          contact,
          messages: [],
          sent: 0,
          received: 0,
        };
      }

      grouped[contact].messages.push(message);
      if (message.direction === 'sent') {
        grouped[contact].sent += 1;
      } else {
        grouped[contact].received += 1;
      }
    });

    return Object.values(grouped);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/nakaneimoveis/api/messages');
        if (!response.ok) {
          console.error('Erro na resposta do fetch:', response.status, response.statusText);
          throw new Error('Erro ao carregar mensagens');
        }
        const data: Message[] = await response.json();
        const groupedMessages = groupMessagesByContact(data);
        setConversations(groupedMessages);
      } catch (err) {
        console.error('Erro no fetch:', err);
        setError('Erro ao carregar mensagens');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <p>Carregando conversas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-4">
      {conversations.length === 0 ? (
        <p>Nenhuma conversa ativa.</p>
      ) : (
        conversations.map((conversation) => (
          <div
            key={conversation.contact}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/admin/Conversas-ativas/${conversation.contact}`)} // Redireciona para a conversa
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
