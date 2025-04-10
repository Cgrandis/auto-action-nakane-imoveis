import { useState, useEffect } from 'react';
import { Empresa } from '../types/interfaces';

export function useCadastroEmpresa() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [instagram, setInstagram] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Estado de edição

  const fetchEmpresa = async () => {
    try {
      const response = await fetch('/api/empresa/get');
      const data: Empresa | null = await response.json();
      if (data) {
        setEmpresa(data);
        setNome(data.nome);
        setEndereco(data.endereco);
        setInstagram(data.instagram);
      }
    } catch (err) {
      setError('Erro ao buscar dados da empresa');
    }
  };

  useEffect(() => {
    fetchEmpresa();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/empresa/create', {
        method: empresa ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, endereco, instagram }),
      });

      const data = await response.json();
      if (response.ok) {
        fetchEmpresa();
        setNome('');
        setEndereco('');
        setInstagram('');
        setIsEditing(false); // Sai do modo de edição após sucesso
      } else {
        setError(data.error || 'Erro ao salvar os dados da empresa');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!empresa) return;

    try {
      const response = await fetch('/api/empresa/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id: empresa.id }),
      });

      if (response.ok) {
        setEmpresa(null);
        setNome('');
        setEndereco('');
        setInstagram('');
        alert('Empresa excluída com sucesso');
      } else {
        setError('Erro ao excluir a empresa');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    }
  };

  // Função para entrar no modo de edição
  const handleEdit = () => {
    setIsEditing(true); // Ativa o modo de edição
  };

  return {
    nome, setNome,
    endereco, setEndereco,
    instagram, setInstagram,
    loading, error, handleSubmit, handleDelete, handleEdit, empresa, isEditing
  };
}
