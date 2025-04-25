'use client';

import Layout from '../../componentes/Layout';
import { useExamples } from '@/app/autoaction/hooks/useExamples';

export default function InsertExamplesPage() {
  const {
    profession, setProfession,
    title, setTitle,
    description, setDescription,
    examples, editingId,
    descriptionRef,
    handleSubmit, handleEdit, handleDelete
  } = useExamples();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Exemplos de Uso</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Profissão"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full px-4 py-3 bg-white border rounded-lg text-base"
            required
          />

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white border rounded-lg text-base"
            required
          />

          <textarea
            ref={descriptionRef}
            placeholder="Descrição detalhada do uso"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-white border rounded-lg text-base resize-none overflow-hidden min-h-[120px]"
            rows={1}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            {editingId ? 'Atualizar' : 'Inserir'} Exemplo
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">Exemplos Cadastrados</h3>
          {examples.map((ex) => (
            <div key={ex.id} className="bg-white border rounded p-4 mb-2">
              <p className="font-bold">{ex.profession}</p>
              <p className="text-lg">{ex.title}</p>
              <p>{ex.description}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(ex)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(ex.id)}
                  className="text-red-600 hover:underline"
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