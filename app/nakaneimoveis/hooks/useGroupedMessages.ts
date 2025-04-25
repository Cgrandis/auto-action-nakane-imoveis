import { useState, useEffect } from 'react';
import { Message } from '../../types/interfaces';

export function useGroupedMessages() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const groupMessagesByContact = (messages: Message[]) => {
    const grouped: Record<string, { contact: string; messages: Message[]; sent: number; received: number }> = {};

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`);
        if (!response.ok) throw new Error('Erro ao carregar mensagens');
        const data: Message[] = await response.json();
        setConversations(groupMessagesByContact(data));
      } catch (err) {
        setError('Erro ao carregar mensagens');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { conversations, loading, error };
}
