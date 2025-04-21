'use client';

import { useCadastroCorretor } from '@/app/nakaneimoveis/hooks/useCadastroCorretor';

export default function CadastroCorretor() {
  const {
    nome, setNome,
    contato, setContato,
    email, setEmail,
    loading, error, handleSubmit, handleDelete, handleEdit, corretores, editingCorretorId
  } = useCadastroCorretor();

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-50 p-8 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Cadastrar Corretor</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Corretor</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={`mt-2 p-3 w-full border text-lg placeholder-gray-500 focus:outline-none focus:ring-2 ${editingCorretorId ? 'border-yellow-600 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
            placeholder="Nome e Sobrenome"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contato" className="block text-sm font-medium text-gray-700">Contato</label>
          <input
            type="text"
            id="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className={`mt-2 p-3 w-full border text-lg placeholder-gray-500 focus:outline-none focus:ring-2 ${editingCorretorId ? 'border-yellow-600 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
            placeholder="(XX) XXXXX-XXXX"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 p-3 w-full border text-lg placeholder-gray-500 focus:outline-none focus:ring-2 ${editingCorretorId ? 'border-yellow-600 focus:ring-yellow-500' : 'border-gray-300 focus:ring-blue-500'}`}
            placeholder="email.corretor@empresa.com"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className={`w-full py-3 text-lg text-white rounded-lg ${loading ? 'bg-[#525259]' : 'bg-[#525259] hover:bg-[#9C9FA6]'} focus:outline-none transition duration-300`}
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : editingCorretorId ? 'Atualizar Corretor' : 'Cadastrar Corretor'}
        </button>
      </form>

      <h3 className="text-xl font-bold text-gray-900 mt-8">Corretores Cadastrados</h3>
      <div className="space-y-4 mt-4">
        {corretores.length > 0 ? (
          corretores.map((corretor) => (
            <div key={corretor.id} className="bg-white p-4 rounded-lg shadow-md">
              <p><strong>Nome:</strong> {corretor.nome}</p>
              <p><strong>Contato:</strong> {corretor.contato}</p>
              <p><strong>Email:</strong> {corretor.email}</p>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-yellow-600 text-white py-2 px-6 rounded-full text-lg hover:bg-yellow-700 transition duration-300"
                  onClick={() => handleEdit(corretor)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white py-2 px-6 rounded-full text-lg hover:bg-red-700 transition duration-300"
                  onClick={() => handleDelete(corretor.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum corretor cadastrado.</p>
        )}
      </div>
    </div>
  );
}
