'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.error || 'Erro no login');
      } else {
       
        window.location.href = `/${data.usuario.slug}`;
      }
    } catch (err) {
      alert('Erro ao conectar ao servidor');
    }
  };  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold">Login</h2>
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label className="block text-lg" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-md"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
