'use client';

import { useState, useEffect } from 'react';
import styles from './AcessoPage.module.css';

const AcessoPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tribunal, setTribunal] = useState<string>('Tribunal Superior do Trabalho'); // Seleção do tribunal
  const [searchAfter, setSearchAfter] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL('/lawsolution/api/datajud', window.location.href);
      url.searchParams.append('size', '100');
      url.searchParams.append('search_term', searchTerm);
      url.searchParams.append('tribunal', tribunal); // Envia o nome do tribunal
      if (searchAfter) url.searchParams.append('search_after', searchAfter);

      const response = await fetch(url.toString());
      const data = await response.json();

      setData(data);
      setSearchAfter(data?.sort?.[data?.sort.length - 1]);
    } catch (err) {
      setError('Erro ao acessar a API.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tribunal]); // Refaz a consulta sempre que o tribunal mudar

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Acesso à API Datajud</h1>

      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Digite o número do processo"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Buscar</button>
      </form>

        {/* Dropdown para escolher o tribunal */}
        <select onChange={(e) => setTribunal(e.target.value)} className={styles.dropdown}>
          {/* Tribunais Superiores */}
          <option value="Tribunal Superior do Trabalho">Tribunal Superior do Trabalho</option>
          <option value="Tribunal Superior Eleitoral">Tribunal Superior Eleitoral</option>
          <option value="Tribunal Superior de Justiça">Tribunal Superior de Justiça</option>
          <option value="Tribunal Superior Militar">Tribunal Superior Militar</option>

          {/* Justiça Federal */}
          <option value="Tribunal Regional Federal da 1ª Região">TRF 1ª Região</option>
          <option value="Tribunal Regional Federal da 2ª Região">TRF 2ª Região</option>
          <option value="Tribunal Regional Federal da 3ª Região">TRF 3ª Região</option>
          <option value="Tribunal Regional Federal da 4ª Região">TRF 4ª Região</option>
          <option value="Tribunal Regional Federal da 5ª Região">TRF 5ª Região</option>
          <option value="Tribunal Regional Federal da 6ª Região">TRF 6ª Região</option>

          {/* Justiça Estadual */}
          <option value="Tribunal de Justiça do Acre">Tribunal de Justiça do Acre</option>
          <option value="Tribunal de Justiça de Alagoas">Tribunal de Justiça de Alagoas</option>
          <option value="Tribunal de Justiça do Amazonas">Tribunal de Justiça do Amazonas</option>
          <option value="Tribunal de Justiça do Amapá">Tribunal de Justiça do Amapá</option>
          <option value="Tribunal de Justiça da Bahia">Tribunal de Justiça da Bahia</option>
          <option value="Tribunal de Justiça do Ceará">Tribunal de Justiça do Ceará</option>
          <option value="TJ do Distrito Federal e Territórios">TJ do Distrito Federal e Territórios</option>
          <option value="Tribunal de Justiça do Espírito Santo">Tribunal de Justiça do Espírito Santo</option>
          <option value="Tribunal de Justiça do Goiás">Tribunal de Justiça do Goiás</option>
          <option value="Tribunal de Justiça do Maranhão">Tribunal de Justiça do Maranhão</option>
          <option value="Tribunal de Justiça de Minas Gerais">Tribunal de Justiça de Minas Gerais</option>
          <option value="TJ do Mato Grosso de Sul">TJ do Mato Grosso de Sul</option>
          <option value="Tribunal de Justiça do Mato Grosso">Tribunal de Justiça do Mato Grosso</option>
          <option value="Tribunal de Justiça do Pará">Tribunal de Justiça do Pará</option>
          <option value="Tribunal de Justiça da Paraíba">Tribunal de Justiça da Paraíba</option>
          <option value="Tribunal de Justiça de Pernambuco">Tribunal de Justiça de Pernambuco</option>
          <option value="Tribunal de Justiça do Piauí">Tribunal de Justiça do Piauí</option>
          <option value="Tribunal de Justiça do Paraná">Tribunal de Justiça do Paraná</option>
          <option value="Tribunal de Justiça do Rio de Janeiro">Tribunal de Justiça do Rio de Janeiro</option>
          <option value="TJ do Rio Grande do Norte">TJ do Rio Grande do Norte</option>
          <option value="Tribunal de Justiça de Rondônia">Tribunal de Justiça de Rondônia</option>
          <option value="Tribunal de Justiça de Roraima">Tribunal de Justiça de Roraima</option>
          <option value="Tribunal de Justiça do Rio Grande do Sul">Tribunal de Justiça do Rio Grande do Sul</option>
          <option value="Tribunal de Justiça de Santa Catarina">Tribunal de Justiça de Santa Catarina</option>
          <option value="Tribunal de Justiça de Sergipe">Tribunal de Justiça de Sergipe</option>
          <option value="Tribunal de Justiça de São Paulo">Tribunal de Justiça de São Paulo</option>
          <option value="Tribunal de Justiça do Tocantins">Tribunal de Justiça do Tocantins</option>

          {/* Justiça do Trabalho */}
          <option value="Tribunal Regional do Trabalho da 1ª Região">Tribunal Regional do Trabalho da 1ª Região</option>
          <option value="Tribunal Regional do Trabalho da 2ª Região">Tribunal Regional do Trabalho da 2ª Região</option>
          <option value="Tribunal Regional do Trabalho da 3ª Região">Tribunal Regional do Trabalho da 3ª Região</option>
          <option value="Tribunal Regional do Trabalho da 4ª Região">Tribunal Regional do Trabalho da 4ª Região</option>
          <option value="Tribunal Regional do Trabalho da 5ª Região">Tribunal Regional do Trabalho da 5ª Região</option>
          <option value="Tribunal Regional do Trabalho da 6ª Região">Tribunal Regional do Trabalho da 6ª Região</option>
          <option value="Tribunal Regional do Trabalho da 7ª Região">Tribunal Regional do Trabalho da 7ª Região</option>
          <option value="Tribunal Regional do Trabalho da 8ª Região">Tribunal Regional do Trabalho da 8ª Região</option>
          <option value="Tribunal Regional do Trabalho da 9ª Região">Tribunal Regional do Trabalho da 9ª Região</option>
          <option value="Tribunal Regional do Trabalho da 10ª Região">Tribunal Regional do Trabalho da 10ª Região</option>
          <option value="Tribunal Regional do Trabalho da 11ª Região">Tribunal Regional do Trabalho da 11ª Região</option>
          <option value="Tribunal Regional do Trabalho da 12ª Região">Tribunal Regional do Trabalho da 12ª Região</option>
          <option value="Tribunal Regional do Trabalho da 13ª Região">Tribunal Regional do Trabalho da 13ª Região</option>
          <option value="Tribunal Regional do Trabalho da 14ª Região">Tribunal Regional do Trabalho da 14ª Região</option>
          <option value="Tribunal Regional do Trabalho da 15ª Região">Tribunal Regional do Trabalho da 15ª Região</option>
          <option value="Tribunal Regional do Trabalho da 16ª Região">Tribunal Regional do Trabalho da 16ª Região</option>
          <option value="Tribunal Regional do Trabalho da 17ª Região">Tribunal Regional do Trabalho da 17ª Região</option>
          <option value="Tribunal Regional do Trabalho da 18ª Região">Tribunal Regional do Trabalho da 18ª Região</option>
          <option value="Tribunal Regional do Trabalho da 19ª Região">Tribunal Regional do Trabalho da 19ª Região</option>
          <option value="Tribunal Regional do Trabalho da 20ª Região">Tribunal Regional do Trabalho da 20ª Região</option>
          <option value="Tribunal Regional do Trabalho da 21ª Região">Tribunal Regional do Trabalho da 21ª Região</option>
          <option value="Tribunal Regional do Trabalho da 22ª Região">Tribunal Regional do Trabalho da 22ª Região</option>
          <option value="Tribunal Regional do Trabalho da 23ª Região">Tribunal Regional do Trabalho da 23ª Região</option>
          <option value="Tribunal Regional do Trabalho da 24ª Região">Tribunal Regional do Trabalho da 24ª Região</option>

          {/* Justiça Eleitoral */}
          <option value="Tribunal Regional Eleitoral do Acre">Tribunal Regional Eleitoral do Acre</option>
          <option value="Tribunal Regional Eleitoral de Alagoas">Tribunal Regional Eleitoral de Alagoas</option>
          <option value="Tribunal Regional Eleitoral do Amazonas">Tribunal Regional Eleitoral do Amazonas</option>
          <option value="Tribunal Regional Eleitoral do Amapá">Tribunal Regional Eleitoral do Amapá</option>
          <option value="Tribunal de Justiça da Bahia">Tribunal de Justiça da Bahia</option>
          <option value="Tribunal Regional Eleitoral do Ceará">Tribunal Regional Eleitoral do Ceará</option>
          <option value="TJ do Distrito Federal e Territórios">TJ do Distrito Federal e Territórios</option>
          <option value="Tribunal Regional Eleitoral do Espírito Santo">Tribunal Regional Eleitoral do Espírito Santo</option>
          <option value="Tribunal Regional Eleitoral do Goiás">Tribunal Regional Eleitoral do Goiás</option>
          <option value="Tribunal Regional Eleitoral do Maranhão">Tribunal Regional Eleitoral do Maranhão</option>
          <option value="Tribunal Regional Eleitoral de Minas Gerais">Tribunal Regional Eleitoral de Minas Gerais</option>
          <option value="TJ do Mato Grosso de Sul">TJ do Mato Grosso de Sul</option>
          <option value="Tribunal Regional Eleitoral do Mato Grosso">Tribunal Regional Eleitoral do Mato Grosso</option>
          <option value="Tribunal Regional Eleitoral do Pará">Tribunal Regional Eleitoral do Pará</option>
          <option value="Tribunal Regional Eleitoral da Paraíba">Tribunal Regional Eleitoral da Paraíba</option>
          <option value="Tribunal Regional Eleitoral de Pernambuco">Tribunal Regional Eleitoral de Pernambuco</option>
          <option value="Tribunal Regional Eleitoral do Piauí">Tribunal Regional Eleitoral do Piauí</option>
          <option value="Tribunal Regional Eleitoral do Paraná">Tribunal Regional Eleitoral do Paraná</option>
          <option value="Tribunal Regional Eleitoral do Rio de Janeiro">Tribunal Regional Eleitoral do Rio de Janeiro</option>
          <option value="TJ do Rio Grande do Norte">TJ do Rio Grande do Norte</option>
          <option value="Tribunal Regional Eleitoral de Rondônia">Tribunal Regional Eleitoral de Rondônia</option>
          <option value="Tribunal Regional Eleitoral de Roraima">Tribunal Regional Eleitoral de Roraima</option>
          <option value="Tribunal Regional Eleitoral do Rio Grande do Sul">Tribunal Regional Eleitoral do Rio Grande do Sul</option>
          <option value="Tribunal Regional Eleitoral de Santa Catarina">Tribunal Regional Eleitoral de Santa Catarina</option>
          <option value="Tribunal Regional Eleitoral de Sergipe">Tribunal Regional Eleitoral de Sergipe</option>
          <option value="Tribunal Regional Eleitoral de São Paulo">Tribunal Regional Eleitoral de São Paulo</option>
          <option value="Tribunal Regional Eleitoral do Tocantins">Tribunal Regional Eleitoral do Tocantins</option>

          {/* Justiça Militar */}
          <option value="Tribunal Justiça Militar de Minas Gerais">Tribunal Justiça Militar de Minas Gerais</option>
          <option value="Tribunal Justiça Militar do Rio Grande do Sul">Tribunal Justiça Militar do Rio Grande do Sul</option>
          <option value="Tribunal Justiça Militar de São Paulo">Tribunal Justiça Militar de São Paulo</option>
        </select>


      {loading ? (
        <p className={styles.loading}>Carregando dados...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.results}>
          <h2>Dados Retornados</h2>
          <pre className={styles.data}>{JSON.stringify(data, null, 2)}</pre>

          {searchAfter && (
            <button onClick={() => fetchData()} className={styles.loadMore}>Carregar mais resultados</button>
          )}
        </div>
      )}
    </div>
  );
};

export default AcessoPage;
