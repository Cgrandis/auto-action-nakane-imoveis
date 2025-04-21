'use client';

import { useEffect, useState } from 'react';
import { Usuario } from '@/app/admin/types/interface';

export default function ManageUsersPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);

  const [form, setForm] = useState({ nome: '', email: '', contato: '', slug: '', senha: '' });

  const carregarUsuarios = async () => {
    const res = await fetch('/api/auth/users');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleEdit = (usuario: Usuario) => {
    setEditando(usuario);
    setForm({ ...usuario, senha: '' });
  };

  const handleSave = async () => {
    const res = await fetch('/api/auth/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: editando?.id }),
    });
    if (res.ok) {
      alert('Usuário atualizado com sucesso');
      setEditando(null);
      setForm({ nome: '', email: '', contato: '', slug: '', senha: '' });
      carregarUsuarios();
    } else {
      alert('Erro ao atualizar');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      await fetch('/api/auth/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      carregarUsuarios();
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Gerenciar Usuários</h2>

      {usuarios.map((user) => (
        <div key={user.id} className="mb-4 border p-4 rounded-md shadow-sm flex justify-between items-center">
          <div>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Slug:</strong> {user.slug}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => handleEdit(user)} className="bg-yellow-400 px-4 py-1 rounded">Editar</button>
            <button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white px-4 py-1 rounded">Excluir</button>
          </div>
        </div>
      ))}

      {editando && (
        <div className="mt-10 p-6 border rounded-md shadow-md bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Editar Usuário</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome" className="w-full border p-2 rounded" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border p-2 rounded" />
            <input value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })} placeholder="Contato" className="w-full border p-2 rounded" />
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full border p-2 rounded" />
            <input value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} placeholder="Nova Senha (opcional)" type="password" className="w-full border p-2 rounded" />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Alterações</button>
          </form>
        </div>
      )}
    </div>
  );
}
