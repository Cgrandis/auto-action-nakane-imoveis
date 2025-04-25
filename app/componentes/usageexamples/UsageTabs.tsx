'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useExamplesTabs } from '@/app/autoaction/hooks/useExamplesTabs';

const UsageTab = ({ profession, useCases }: { profession: string; useCases: { title: string; description: string }[] }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    {/* <h3 className="text-xl font-semibold text-gray-800 mb-4">{profession}</h3> */}
    <ul className="space-y-4">
      {useCases.map((item, index) => (
        <li key={index}>
          <h4 className="text-lg font-semibold text-[#344459]">{item.title}</h4>
          <p className="text-gray-700 text-sm mt-1">{item.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default function ExamplesTabs() {
  const { tabs, activeTab, setActiveTab, loading, error } = useExamplesTabs();

  if (loading) return <p className="text-center">Carregando exemplos...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const professions = Object.keys(tabs);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-[#344459] mb-8 text-center">Exemplos de Uso por Profissão</h2>

      <div className="flex flex-wrap justify-center mb-6 gap-2">
        {professions.map((prof) => (
          <button
            key={prof}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              prof === activeTab ? 'bg-[#05AFF2] text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(prof)}
          >
            {prof}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <UsageTab profession={activeTab} useCases={tabs[activeTab]} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
