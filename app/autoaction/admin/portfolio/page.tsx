'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Layout from '../../componentes/Layout';

export default function PortfolioPage() {
  const [servico, setServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchPortfolio = async () => {
    const res = await fetch('/autoaction/api/portfolio/list');
    const data = await res.json();
    setPortfolio(data);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = editId ? '/autoaction/api/portfolio/update' : '/autoaction/api/portfolio/create';
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editId, servico, descricao })
    });

    if (res.ok) {
      toast.success(editId ? 'Serviço atualizado!' : 'Serviço adicionado!');
      setServico('');
      setDescricao('');
      setEditId(null);
      fetchPortfolio();
    } else {
      toast.error('Erro ao salvar serviço.');
    }
  };

  const handleEdit = (item: any) => {
    setServico(item.servico);
    setDescricao(item.descricao);
    setEditId(item.id);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch('/autoaction/api/portfolio/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      toast.success('Serviço removido.');
      fetchPortfolio();
    } else {
      toast.error('Erro ao remover serviço.');
    }
  };

  return (
    <Layout>
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Gerenciar Portfólio de Serviços</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome do Serviço"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
        <textarea
          placeholder="Descrição do serviço"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[100px]"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          {editId ? 'Atualizar' : 'Adicionar'} Serviço
        </button>
      </form>

      <div className="mt-10 space-y-4">
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="bg-white border p-4 rounded-lg shadow flex justify-between items-start"
          >
            <div>
              <p className="font-bold text-lg">{item.servico}</p>
              <p className="text-sm text-gray-600">{item.descricao}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}