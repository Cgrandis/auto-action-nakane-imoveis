'use client';

import { useContacts } from '@/app/hooks/useContacts';
import { useState } from 'react';

export default function ContatoList() {
  const { contacts, loading, error } = useContacts();
  const [filterBrasil, setFilterBrasil] = useState<boolean>(false);
  const [dddFilter, setDddFilter] = useState<string>('');

  if (loading) {
    return <p className="text-center text-gray-600">Carregando contatos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  const filteredContacts = contacts.filter((contact) => {
    const isBrazilian = contact.number.startsWith('55');
    const ddd = contact.number.slice(2, 4);

    let matchesBrasil = true;
    let matchesDdd = true;

    if (filterBrasil && !isBrazilian) {
      matchesBrasil = false;
    }

    if (dddFilter && !contact.number.startsWith(`55${dddFilter}`)) {
      matchesDdd = false;
    }

    return matchesBrasil && matchesDdd;
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Filtros</h3>
        <div className="flex justify-between gap-6 mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filterBrasil}
              onChange={() => setFilterBrasil(!filterBrasil)}
              className="form-checkbox"
            />
            <label className="text-gray-700">Mostrar apenas números do Brasil</label>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">DDD:</label>
            <input
              type="text"
              value={dddFilter}
              onChange={(e) => setDddFilter(e.target.value)}
              maxLength={2}
              placeholder="Ex: 44"
              className="p-2 border border-gray-300 rounded-lg text-lg"
            />
          </div>
        </div>
      </div>

      {filteredContacts.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum contato encontrado.</p>
      ) : (
        filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-gray-800 font-medium text-lg"><strong>Nome:</strong> {contact.name}</p>
            <p className="text-gray-700"><strong>Número:</strong> {contact.number}</p>
            <p className="text-gray-600"><strong>Criado em:</strong> {new Date(contact.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
