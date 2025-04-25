'use client';

import { useEffect, useState } from 'react';

export interface UseCase {
  id: number;
  profession: string;
  title: string;
  description: string;
}

export function useExamplesTabs() {
  const [tabs, setTabs] = useState<Record<string, UseCase[]>>({});
  const [activeTab, setActiveTab] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const res = await fetch('/autoaction/api/examples/list');
        const data: UseCase[] = await res.json();

        const grouped = data.reduce((acc: Record<string, UseCase[]>, item) => {
          if (!acc[item.profession]) {
            acc[item.profession] = [];
          }
          acc[item.profession].push(item);
          return acc;
        }, {});

        setTabs(grouped);
        setActiveTab(Object.keys(grouped)[0]);
      } catch (err) {
        setError('Erro ao carregar exemplos');
      } finally {
        setLoading(false);
      }
    };

    fetchExamples();
  }, []);

  return { tabs, activeTab, setActiveTab, loading, error };
}