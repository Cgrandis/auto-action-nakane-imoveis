import { useState, useEffect } from 'react';
import { Corretor } from '../types/interfaces';

export function useCadastroCorretor() {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [editingCorretorId, setEditingCorretorId] = useState<number | null>(null);

  const fetchCorretores = async () => {
    try {
      const response = await fetch('/api/corretores/list');
      const data: Corretor[] = await response.json();
      setCorretores(data || []);
    } catch (err) {
      setError('Erro ao carregar a lista de corretores');
    }
  };

  useEffect(() => {
    fetchCorretores();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const method = editingCorretorId ? 'PUT' : 'POST'; 
    const url = editingCorretorId ? `/api/corretores/update` : `/api/corretores/create`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingCorretorId,
          nome,
          contato,
          email
        }),
      });

      const data = await response.json();
      if (response.ok) {
        fetchCorretores(); 
       
        setNome('');
        setContato('');
        setEmail('');
        setEditingCorretorId(null);
      } else {
        setError(data.error || 'Erro ao cadastrar ou atualizar o corretor');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/corretores/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchCorretores(); 
        alert('Corretor excluído com sucesso');
      } else {
        setError('Erro ao excluir o corretor');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    }
  };

 
  const handleEdit = (corretor: Corretor) => {
    setNome(corretor.nome);
    setContato(corretor.contato);
    setEmail(corretor.email);
    setEditingCorretorId(corretor.id);
  };

  return {
    nome, setNome,
    contato, setContato,
    email, setEmail,
    loading, error, handleSubmit, handleDelete, handleEdit, corretores, editingCorretorId
  };
}
