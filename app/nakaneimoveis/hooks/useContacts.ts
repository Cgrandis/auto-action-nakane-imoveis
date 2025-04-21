'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@prisma/client/wasm';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/nakaneimoveis/api/contatos');
        if (!response.ok) {
          throw new Error('Erro ao carregar contatos');
        }
        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (err) {
        setError('Erro ao carregar a lista de contatos');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { contacts, loading, error };
}
