'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Message } from '../../../types/interfaces';
import Layout from '@/app/nakaneimoveis/componentes/Layout';
import Link from 'next/link';
import ProtectedPage from '@/app/nakaneimoveis/componentes/ProtectedPage';

export default function ConversationDetail() {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const conversationId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      const decodedId = decodeURIComponent(conversationId);
      try {
        const response = await fetch(`/api/messages/${decodedId}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar mensagens');
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (err) {
        setError('Erro ao carregar mensagens');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  if (loading) {
    return <p>Carregando mensagens...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ProtectedPage>
    <Layout>
      <div className="space-y-4">
        {/* Botão de retorno estilizado com margem inferior */}
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
