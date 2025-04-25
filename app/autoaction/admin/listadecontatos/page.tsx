import ContatoList from '@/app/autoaction/componentes/list/ContatoList';
import Layout from '@/app/autoaction/componentes/Layout';
// import ProtectedPage from '';

export default function CadastroPage() {
  return (
    // <ProtectedPage>
    <Layout>
    <div className="w-full max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Lista de Contatos</h2>
      <ContatoList />
    </div>
    </Layout>
   // {/* </ProtectedPage> */}
  );
}
