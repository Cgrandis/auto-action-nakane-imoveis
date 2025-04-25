import axios from 'axios';
import tribunaisData from '../../tribunais/tribunais.json';

const API_KEY = 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==';

export async function GET(request: Request) {
  const urlParams = new URL(request.url);
  const tribunalNome = urlParams.searchParams.get('tribunal'); // Nome do tribunal a ser acessado
  const searchAfter = urlParams.searchParams.get('search_after');
  const size = parseInt(urlParams.searchParams.get('size') || '100', 10);
  const searchTerm = urlParams.searchParams.get('search_term') || '';

  // Encontrando o tribunal correspondente
  const tribunal = tribunaisData.tribunais_superiores.concat(
    tribunaisData.justica_federal,
    tribunaisData.justica_estadual,
    tribunaisData.justica_do_trabalho,
    tribunaisData.justica_eleitoral,
    tribunaisData.justica_militar
  ).find(t => t.nome.toLowerCase() === tribunalNome?.toLowerCase()); // Comparação insensível a maiúsculas/minúsculas

  if (!tribunal) {
    return new Response('Tribunal não encontrado', { status: 404 });
  }

  // Construindo a consulta
  const query = {
    query: {
      bool: {
        must: searchTerm ? [{ match: { numeroProcesso: searchTerm } }] : [],
      },
    },
    size,
    sort: [
      {
        '@timestamp': {
          order: 'asc',
        },
      },
    ],
    search_after: searchAfter ? [searchAfter] : undefined,
  };

  try {
    // Fazendo a requisição ao tribunal selecionado
    const response = await axios.post(tribunal.url, query, {
      headers: {
        Authorization: `APIKey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Retornando os dados da consulta
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err: any) {
    console.error('Erro ao acessar a API:', err);
    return new Response('Erro ao acessar a API', { status: 500 });
  }
}
