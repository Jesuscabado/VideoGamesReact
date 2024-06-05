import React, { useState, useEffect } from "react";
import { getAmiibos } from "../../utils/fetchAmiibo";
import "./AllAmiibos.css";

function AllAmiibos() {
    const [amiibos, setAmiibos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAmiibos = async () => {
            try {
                const data = await getAmiibos();
                if (data.amiibo) {
                    setAmiibos(data.amiibo);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('Error fetching amiibos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAmiibos();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Amiibos</h1>
            <div className="amiibo-grid">
                {amiibos.map((amiibo) => (
                    <div key={amiibo.tail} className="amiibo-card">
                        <h1> Saga: {amiibo.gameSeries}</h1>
                        <h2>{amiibo.character}</h2>
                        <img className="amiibo-img" src={amiibo.image} alt={amiibo.name} />
                        <p>Tipo de Amiibo: {amiibo.type}</p>
                        <p>Fecha de Lanzamiento en Europa: {amiibo.release.eu}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllAmiibos;
