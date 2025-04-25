'use client';

import React from 'react';
import { XCircle } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
        Buscar contato
      </label>

      <div className="relative">
        {/* Ícone de lupa (esquerda) */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-lg pointer-events-none">
          🔍
        </span>

        {/* Campo de busca */}
        <input
          type="text"
          id="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Digite nome ou número..."
          className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Botão de limpar (direita) */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-red-500 focus:outline-none"
            aria-label="Limpar busca"
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
