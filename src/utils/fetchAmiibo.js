const fetchData = async (route, method, inputData = null) => {
    const url = new URL(route);

    const fetchOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (method.toLowerCase() === 'get' && inputData) {
        Object.keys(inputData).forEach(key => {
            url.searchParams.append(key, inputData[key]);
        });
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

// Function to get all amiibos
const getAmiibos = async () => {
    const route = "https://amiiboapi.com/api/amiibo/";
    const data = await fetchData(route, "get");
    return data;
};

// Function to get amiibos of a character
const getCharacterAmiibo = async (character) => {
    const route = `https://amiiboapi.com/api/amiibo/?character=${character}`;
    const data = await fetchData(route, "get");
    return data;
}

// Function to get a single amiibo by name
const getSingleAmiibo = async (name) => {
    const route = `https://amiiboapi.com/api/amiibo/?name=${name}`;
    const data = await fetchData(route, "get");
    return data;
}

export {
    getAmiibos,
    getCharacterAmiibo,
    getSingleAmiibo
};
