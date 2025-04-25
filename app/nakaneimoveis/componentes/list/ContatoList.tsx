'use client';

import { useContacts } from '@/app/nakaneimoveis/hooks/useContacts';
import { useState, useMemo } from 'react';
import SearchInput from '@/app/componentes/search/SearchInput';
import { useDebounce } from '@/app/generalhooks/useDebounce';
import clsx from 'clsx';

export default function ContatoList() {
  const { contacts, loading, error } = useContacts();
  const [filterBrasil, setFilterBrasil] = useState(false);
  const [dddFilter, setDddFilter] = useState('');
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 200);

  const filteredContacts = useMemo(() => {
    const filtered = contacts.filter((contact) => {
      const isBrazilian = contact.number.startsWith('55');
      const matchesBrasil = !filterBrasil || isBrazilian;
      const matchesDdd = !dddFilter || contact.number.startsWith(`55${dddFilter}`);
      const matchesSearch =
        contact.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        contact.number.includes(debouncedSearch);

      return matchesBrasil && matchesDdd && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (a.name && !b.name) return -1;
      if (!a.name && b.name) return 1;
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [contacts, filterBrasil, dddFilter, debouncedSearch]);

  if (loading) return <p className="text-center text-gray-600">Carregando contatos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Filtros</h3>

        <SearchInput value={search} onChange={setSearch} />

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
        <div className="overflow-auto rounded-lg shadow">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Número</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Criado em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredContacts.map((contact, index) => (
                <tr
                  key={contact.id}
                  className={clsx(
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                    'hover:bg-gray-100 transition'
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {contact.name || <span className="italic text-gray-400">Sem nome</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {contact.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
