'use client';

import { useState, useEffect } from 'react';
import { Message } from '../types/interfaces';

export default function ConversationList() {
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
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
  }, []);

  if (loading) {
    return <p>Carregando mensagens...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p>Nenhuma mensagem encontrada.</p>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="bg-white p-4 rounded-lg shadow-md">
            <p><strong>De:</strong> {message.from}</p>
            <p><strong>Para:</strong> {message.to}</p>
            <p><strong>Direção:</strong> {message.direction}</p>
            <p><strong>Mensagem:</strong> {message.body}</p>
            <p><strong>Criada em:</strong> {new Date(message.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
