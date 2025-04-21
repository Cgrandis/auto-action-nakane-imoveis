'use client';

import { useCadastroEmpresa } from '@/app/nakaneimoveis/hooks/useCadastroEmpresa';

export default function CadastroEmpresa() {
  const {
    nome, setNome,
    endereco, setEndereco,
    instagram, setInstagram,
    loading, error, handleSubmit, handleDelete, handleEdit, empresa, isEditing
  } = useCadastroEmpresa();

  // Desabilita o botão de submit com base nas regras
  const isSubmitDisabled =
    loading ||
    !nome.trim() ||
    !endereco.trim() ||
    !instagram.trim() ||
    (empresa && nome === empresa.nome && endereco === empresa.endereco && instagram === empresa.instagram);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {empresa ? (isEditing ? 'Editar Empresa' : 'Empresa Cadastrada') : 'Cadastrar Empresa'}
      </h2>

      {empresa ? (
        <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            {!isEditing ? (
              <>
                <p className="text-lg font-medium text-gray-800"><strong>Nome:</strong> {empresa.nome}</p>
                <p className="text-lg font-medium text-gray-800"><strong>Endereço:</strong> {empresa.endereco}</p>
                <p className="text-lg font-medium text-gray-800"><strong>Instagram:</strong> {empresa.instagram}</p>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nome da empresa"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
                  <input
                    type="text"
                    id="endereco"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Endereço completo"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
                  <input
                    type="text"
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Instagram da empresa"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className={`w-full py-3 text-lg text-white rounded-lg ${isSubmitDisabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#525259] hover:bg-[#6A6A73]'
                    } focus:outline-none transition duration-300`}
                  disabled={!!isSubmitDisabled}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

              </form>
            )}
          </div>

          <div className="flex gap-6 mt-6">
            {!isEditing && (
              <button
                className="bg-[#525259] text-white py-2 px-6 rounded-full text-lg hover:bg-[#6A6A73] transition duration-300"
                onClick={handleEdit}
              >
                Editar
              </button>
            )}
            {!isEditing && (
              <button
                className="bg-red-600 text-white py-2 px-6 rounded-full text-lg hover:bg-red-700 transition duration-300"
                onClick={handleDelete}
              >
                Excluir
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nome da empresa"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Endereço completo"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
            <input
              type="text"
              id="instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="@instagram"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full py-3 text-lg text-white rounded-lg ${isSubmitDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#525259] hover:bg-[#6A6A73]'
              } focus:outline-none transition duration-300`}
            disabled={!!isSubmitDisabled}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      )}
    </div>
  );
}
