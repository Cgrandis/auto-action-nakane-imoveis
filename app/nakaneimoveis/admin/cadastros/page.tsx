'use client';

import { useState } from 'react';
import Layout from '@/app/nakaneimoveis/componentes/Layout';
import CadastroEmpresa from '@/app/nakaneimoveis/componentes/cadastro/CadastroEmpresa';
import CadastroCorretor from '@/app/nakaneimoveis/componentes/cadastro/CadastroCorretor';
import ProtectedPage from '../../componentes/ProtectedPage';

export default function CadastrosPage() {
  const [activeTab, setActiveTab] = useState<'empresa' | 'corretor'>('empresa');

  return (
    <ProtectedPage>
    <Layout>
      <div className="min-h-screen bg-[#EEEEEE] flex flex-col">
        <div className="p-6">
          {/* Abas de navegação */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('empresa')}
              className={`text-xl font-semibold py-2 px-4 rounded-lg transition-all ${
                activeTab === 'empresa'
                  ? 'bg-[#0D0D0D] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
              }`}
            >
              Cadastro da Empresa
            </button>
            <button
              onClick={() => setActiveTab('corretor')}
              className={`text-xl font-semibold py-2 px-4 rounded-lg transition-all ${
                activeTab === 'corretor'
                  ? 'bg-[#0D0D0D] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
              }`}
            >
              Cadastro do Corretor
            </button>
          </div>

          {/* Conteúdo das abas */}
          {activeTab === 'empresa' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CadastroEmpresa />
            </div>
          )}

          {activeTab === 'corretor' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CadastroCorretor />
            </div>
          )}
        </div>
      </div>
    </Layout>
    </ProtectedPage>
  );
}
