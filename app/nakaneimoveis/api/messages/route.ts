import prisma from '@/app/nakaneimoveis/lib/prisma/nakane';

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Retorna as mensagens como uma resposta JSON
    return new Response(JSON.stringify(messages), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return new Response('Erro ao buscar mensagens', { status: 500 });
  }
}
