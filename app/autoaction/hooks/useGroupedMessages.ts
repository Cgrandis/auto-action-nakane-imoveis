import { useEffect, useState } from 'react';
import { Message } from '@/app/types/interfaces';

export interface ConversationGroup {
  id: string;
  contact: string;
  name: string;
  messages: Message[];
  sent: number;
  received: number;
}

export function useGroupedMessagesStream(): {
  conversations: ConversationGroup[];
  loading: boolean;
  error: string;
} {
  const [conversations, setConversations] = useState<ConversationGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/autoaction/api/conversas/stream`);

    eventSource.onmessage = (event) => {
      try {
        const incomingData: ConversationGroup[] = JSON.parse(event.data);

        setConversations((prevConversations) => {
          const mergedMap = new Map<string, ConversationGroup>();

          // Adiciona as conversas antigas no map
          for (const convo of prevConversations) {
            mergedMap.set(convo.contact, convo);
          }

          // Atualiza ou insere as novas conversas
          for (const newConvo of incomingData) {
            const existing = mergedMap.get(newConvo.contact);

            if (existing) {
              // Merge mensagens sem duplicar (baseado no id)
              const allMessages = [...existing.messages, ...newConvo.messages];
              const uniqueMessages = Array.from(
                new Map(allMessages.map(msg => [msg.id, msg])).values()
              );

              mergedMap.set(newConvo.contact, {
                ...newConvo,
                messages: uniqueMessages,
              });
            } else {
              mergedMap.set(newConvo.contact, newConvo);
            }
          }

          return Array.from(mergedMap.values());
        });

        setError('');
        setLoading(false);
      } catch (e) {
        console.error('Erro ao processar mensagens:', e);
        setError('Erro ao processar mensagens');
        setLoading(false);
      }
    };

    eventSource.onerror = () => {
      setError('Erro na conexão em tempo real');
      setLoading(false);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return { conversations, loading, error };
}
