import prisma from '@/app/nakaneimoveis/lib/prisma/nakane';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Captura o ID do contato da URL

  try {
    // Filtra as mensagens pelo ID do contato
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { from: id },  // Para pegar mensagens enviadas pelo contato
          { to: id },    // Para pegar mensagens recebidas pelo contato
        ],
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
