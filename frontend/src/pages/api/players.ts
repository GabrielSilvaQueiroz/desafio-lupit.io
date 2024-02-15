import axios from 'axios';

// Definindo a URL base da API
const API_BASE_URL = 'http://localhost:3001/players';

// Criando uma interface para representar a estrutura dos dados de jogador da API
interface JogadorData {
    id: number;
    name: string;
    team_id: number;
    created_at: string;
    // Adicione outros campos, se necessário
}

export const fetchJogadores = async (): Promise<{
    id: number;
    nome: string;
    time: number;
    dataCriacao: string;
}[]> => {
    try {
        // Realizando a requisição para a API usando Axios
        const response = await axios.get<JogadorData[]>(API_BASE_URL);

        // Convertendo a resposta para o formato JSON
        const data = response.data;

        // Mapeando os dados para o formato desejado
        return data.map((jogador) => ({
            id: jogador.id,
            nome: jogador.name,
            time: jogador.team_id,
            dataCriacao: jogador.created_at,
        }));
    } catch (error) {
        // Lidando com erros e exibindo mensagens no console
        console.error('Erro ao buscar jogadores da API:', error);
        throw error;
    }
};

// Exemplo de como usar a função fetchJogadores
(async () => {
    try {
        const jogadores = await fetchJogadores();
        console.log('Jogadores:', jogadores);
    } catch (error) {
        console.error('Erro ao buscar jogadores:', error);
    }
})();

fetchJogadores()