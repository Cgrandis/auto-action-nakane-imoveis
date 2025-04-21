'use client';

import Layout from '@/app/nakaneimoveis/componentes/Layout';
import WhatsappConnect from '@/app/nakaneimoveis/componentes/WhatsappConnect';
import ProtectedPage from '@/app/nakaneimoveis/componentes/ProtectedPage';

export default function ConnectionPage() {
  return (
    <ProtectedPage>
    <Layout>
      <WhatsappConnect />
    </Layout>
    </ProtectedPage>
  );
}