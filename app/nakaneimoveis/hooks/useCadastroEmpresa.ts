import { useState, useEffect } from 'react';
import { Empresa } from '../types/interfaces';

export function useCadastroEmpresa() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [instagram, setInstagram] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Buscar empresa no carregamento
  const fetchEmpresa = async () => {
    try {
      const response = await fetch('/nakaneimoveis/api/empresa/get');
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const data: Empresa | null = await response.json();

      if (data) {
        setEmpresa(data);
        setNome(data.nome);
        setEndereco(data.endereco);
        setInstagram(data.instagram);
      } else {
        // Se não existir empresa, limpa os campos
        setEmpresa(null);
        setNome('');
        setEndereco('');
        setInstagram('');
      }
    } catch (err) {
      setError('Erro ao buscar dados da empresa');
    }
  };

  useEffect(() => {
    fetchEmpresa();
  }, []);

  // Criar ou atualizar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/nakaneimoveis/api/empresa/create', {
        method: empresa ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, endereco, instagram }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEditing(false);
        await fetchEmpresa(); // atualiza com dados do servidor
      } else {
        setError(data.error || 'Erro ao salvar os dados da empresa');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  // Excluir empresa
  const handleDelete = async () => {
    if (!empresa) return;

    try {
      const response = await fetch('/nakaneimoveis/api/empresa/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: empresa.id }),
      });

      if (response.ok) {
        setEmpresa(null);
        setNome('');
        setEndereco('');
        setInstagram('');
        setIsEditing(false);
        alert('Empresa excluída com sucesso');
      } else {
        setError('Erro ao excluir a empresa');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return {
    nome, setNome,
    endereco, setEndereco,
    instagram, setInstagram,
    loading, error,
    handleSubmit, handleDelete, handleEdit,
    empresa, isEditing
  };
}

export default useCadastroEmpresa;