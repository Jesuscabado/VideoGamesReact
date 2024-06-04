const fetchData = async (route, method, inputData = null) => {
    const url = new URL(route);

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
        fetchOptions.body = JSON.stringify(inputData);
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
// Función para obtener todas las amiibos
const getAmiibos = async (character = '', type = '') => {
    const route = "https://amiiboapi.com/api/amiibo/";
    const data = await fetchData(route, "get", { character, type });
    return data;
};

// Función para obtener los amiibos de un personaje
const getCharacterAmiibo = async (name) => {
    const route = "https://amiiboapi.com/api/amiibo/?name=" + name;
    const data = await fetchData(route, "get");
    return data;
}

// Función para obtener un solo amiibo
const getSingleAmiibo = async (name) => {
    const route = "https://amiiboapi.com/api/amiibo/?character=value";
    const data = await fetchData(route, "get");
    return data;
}





export {
    getAmiibos,
    getCharacterAmiibo,
    getSingleAmiibo
    
};
