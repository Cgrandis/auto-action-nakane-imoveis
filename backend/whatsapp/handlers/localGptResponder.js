/**
 * Faz uma pergunta ao modelo Gemma rodando localmente via Ollama.
 * @param {string} prompt - A pergunta ou mensagem do usuário
 * @returns {Promise<string>} - Resposta gerada pelo modelo
 */
async function askGemma(prompt) {
    try {
      // Faz a importação dinâmica de node-fetch (ESM)
      const fetch = (await import('node-fetch')).default;
  
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral',
          prompt,
          stream: false,
        }),
      });
  
      const data = await res.json();
  
      if (data && data.response) {
        return data.response.trim();
      }
  
      return 'Desculpe, não consegui entender sua pergunta.';
    } catch (err) {
      console.error('Erro ao consultar o modelo Gemma:', err);
      return 'Houve um erro ao processar sua solicitação.';
    }
  }
  
  module.exports = { askGemma };
  