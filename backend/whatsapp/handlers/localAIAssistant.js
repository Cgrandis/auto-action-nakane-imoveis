const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();  // Instanciando o Prisma Client
const { askGemma } = require('./localGptResponder');

/**
 * Carrega o contexto da corretora a partir do banco de dados
 * @returns {Promise<Object>} - Contexto com informações da empresa e corretores
 */
async function loadCorretoraContext() {
  try {
    const empresa = await prisma.empresa.findFirst();
    const corretores = await prisma.corretor.findMany();

    return {
      empresa: empresa.nome,
      endereco: empresa.endereco,
      instagram: empresa.instagram,
      corretores: corretores.map(c => c.nome),
    };
  } catch (error) {
    console.error('Erro ao carregar os dados da corretora:', error);
    return null;
  }
}

/**
 * Gera uma resposta inteligente com base no contexto da corretora de imóveis
 * @param {string} userMessage - A mensagem do cliente
 * @param {Array} conversationHistory - Histórico das mensagens trocadas
 * @returns {Promise<string>} - Resposta gerada pela IA
 */
async function gerarRespostaIA(userMessage, conversationHistory = []) {
  const contexto = await loadCorretoraContext();

  if (!contexto) {
    return 'Desculpe, houve um erro ao carregar os dados da corretora.';
  }

  // Construção do histórico da conversa com o contexto
  const conversationContext = conversationHistory.map((msg, idx) => {
    return `${idx % 2 === 0 ? "Cliente" : "Assistente"}: ${msg}`;
  }).join("\n");

  const prompt = `
Você é um assistente virtual cordial e profissional da corretora de imóveis "${contexto.empresa}". 
Seu papel é atender os clientes via WhatsApp, responder dúvidas e ajudar a agendar visitas aos imóveis com base nas informações abaixo:

📍 Endereço: ${contexto.endereco}
Instagram: ${contexto.instagram}

🧑‍💼 Corretores disponíveis:
${contexto.corretores.map(c => '- ' + c).join('\n')}

💡 Como agir:
- Se o cliente disser apenas "Oi", "Olá", "Bom dia", etc., dê boas-vindas e diga o nome da corretora.
- Se o cliente quiser agendar uma visita, peça o nome do corretor e agende a visita.
- Seja direto, cordial e útil. Sempre se ofereça para continuar ajudando.

Histórico de conversa:
${conversationContext}

Mensagem do cliente: "${userMessage}"
`;

  // Passando o prompt dinâmico com o histórico acumulado
  return await askGemma(prompt);
}

module.exports = {
  gerarRespostaIA,
};
