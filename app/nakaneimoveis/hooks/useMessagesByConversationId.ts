'use client';

import { useEffect, useState } from 'react';
import { Message } from '@/app/types/interfaces';

export function useMessagesByConversationId(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      const decodedId = decodeURIComponent(conversationId);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/${decodedId}`);
        if (!response.ok) throw new Error('Erro ao carregar mensagens');
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

  return { messages, loading, error };
}
