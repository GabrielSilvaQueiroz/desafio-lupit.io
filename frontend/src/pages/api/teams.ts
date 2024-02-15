import axios from 'axios';

// Definindo a URL base da API
const API_BASE_URL = 'http://localhost:3001/teams';

export interface Time {
    id: number;
    name: string;
}

export const fetchTimes = async (): Promise<Record<number, string>> => {
    try {
        const response = await axios.get<Time[]>(API_BASE_URL);
        const data = response.data;

        return data.reduce((timesMap, time) => {
            timesMap[time.id] = time.name;
            return timesMap;
        }, {} as Record<number, string>);
    } catch (error) {
        console.error('Erro ao buscar times da API:', error);
        throw error;
    }
};

// Exemplo de como usar a função fetchTimes
(async () => {
    try {
        const timesMap = await fetchTimes();
        console.log('Times:', timesMap);
    } catch (error) {
        console.error('Erro ao buscar times:', error);
    }
})();

export const fetchTeams = async (): Promise<Time[]> => {
    try {
        const response = await axios.get<Time[]>(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar times da API:', error);
        throw error;
    }
};

fetchTeams()