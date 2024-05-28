import { API_KEY } from './key';

const fetchData = async (route, method, inputData = null) => {
    let url = new URL(route);
    url.searchParams.append('key', API_KEY); // Añadir la API key a la URL

    const fetchOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (method.toLowerCase() === 'get') {
        if (inputData) {
            Object.keys(inputData).forEach(key => {
                url.searchParams.append(key, inputData[key]);
            });
        }
    } else if (method.toLowerCase() === 'post') {
        fetchOptions.body = JSON.stringify({ ...inputData, key: API_KEY });
    }

    try {
        const result = await fetch(url.toString(), fetchOptions);
        const data = await result.json();
        return data;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};

const getGames = async (page = 1, name = '') => {
    const route = "https://api.rawg.io/api/games";
    const data = await fetchData(route, "get", { page, search: name });
    return data;
};

export {
    getGames
};
