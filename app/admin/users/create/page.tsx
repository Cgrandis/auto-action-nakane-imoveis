'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [slug, setSlug] = useState('');

  const handleCreateUser = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          email,
          contato: contact,
          slug,
          senha: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao criar usuário');
      } else {
        alert('Usuário criado com sucesso');

        setName('');
        setEmail('');
        setContact('');
        setPassword('');
        setSlug('');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold">Criar Novo Cliente</h2>

        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-lg">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg">Contato</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg">Area de acesso</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
              placeholder="Ex: nakaneimoveis"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleCreateUser}
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-md"
          >
            Criar Cliente
          </button>
        </form>
      </div>
    </div>
  );
}
