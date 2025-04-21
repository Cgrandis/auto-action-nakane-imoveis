import prisma from '@/app/nakaneimoveis/lib/prisma/nakane';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();
    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar contatos' }), {
      status: 500,
    });
  }
}
