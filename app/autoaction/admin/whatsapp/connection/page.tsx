'use client';

import Layout from '@/app/autoaction/componentes/Layout';
import WhatsappConnect from '@/app/autoaction/componentes/WhatsappConnect';
//import ProtectedPage from '@/app/autoaction/componentes/ProtectedPage';

export default function ConnectionPage() {
  return (
    // <ProtectedPage>
    <Layout>
      <WhatsappConnect />
    </Layout>
    // </ProtectedPage>
  );
}