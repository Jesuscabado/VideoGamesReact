import { useState, useEffect } from "react";
import { getAmiibos } from "../../utils/fetchAmiibo";


function AllAmiibos() {
    const [amiibos, setAmiibos] = useState([]);

    useEffect(() => {
        const fetchAmiibos = async () => {
            try {
                const data = await getAmiibos();
                setAmiibos(data.amiibo);
            } catch (error) {
                console.error('Error fetching amiibos:', error);
            }
        };

        fetchAmiibos();
    }, []);

    return (
        <div>
            <h1>Amiibos</h1>
            <ul>
                {amiibos.map((amiibo) => (
                    <li key={amiibo.amiiboSeries}>
                        {amiibo.character} - {amiibo.amiiboSeries}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllAmiibos;