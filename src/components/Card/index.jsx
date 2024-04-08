
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css'



const Card = ({ item, width, moreInfo, darkMode }) => {

    const [divWidthPx, setDivWidthPx] = useState(0);
    const [xs, setXs] = useState(4);

    useEffect(() => {
        // Calcola la larghezza del div in pixel basandosi sulla larghezza della viewport
        const viewportWidth = window.innerWidth;
        const divWidthPercentage = 33; // 33% della viewport
        const divWidthInPx = (viewportWidth * divWidthPercentage) / 100;

        // Imposta lo stato con la larghezza calcolata in pixel
        setDivWidthPx(divWidthInPx);

        // Aggiungi un listener per aggiornare la larghezza del div quando la finestra viene ridimensionata
        const handleResize = () => {
            const newViewportWidth = window.innerWidth;
            const newDivWidthInPx = (newViewportWidth * divWidthPercentage) / 100;
            setDivWidthPx(newDivWidthInPx);
        };
        window.addEventListener('resize', handleResize);

        // Pulisci il listener dell'evento quando il componente viene smontato
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (width === 1) {
            setXs(12)
        }
        if (width === 2) {
            setXs(6)
        }
        if (width === 3) {
            setXs(4)
        }
        if (width === 4) {
            setXs(3)
        }
        if (width === 5) {
            setXs(2)
        }
    }, [width]);





    return (
        <>
            <Grid item xs={xs}>
                <div style={{ borderBottom: '1px solid black', height: divWidthPx / 1.85 + 'px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }} >

                    <img style={{ height: '100%', width: '100%', filter: darkMode ? 'invert(99%) sepia(0%) saturate(3892%) hue-rotate(194deg) brightness(119%) contrast(85%)' : '' }} src={item.img} />

                </div>
                {moreInfo ? <div style={{ color: darkMode ? '#ECECEC' : '' }}>
                    <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.4)' : '' }} className='card-info-box' >
                        <p className='p-regular'>Typeface</p>
                        <p className='p-regular'>{item.typeface}</p>
                    </div>
                    <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.4)' : '' }} className='card-info-box' >
                        <p className='p-regular'>Title designer</p>
                        <p className='p-regular'>{item.designer}</p>
                    </div>
                    <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.4)' : '' }} className='card-info-box' >
                        <p className='p-regular'>Film Director</p>
                        <p className='p-regular'>{item.film_director}</p>
                    </div>
                    <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.3)' : '' }} className='card-info-box' >
                        <p className='p-regular'>Year</p>
                        <p className='p-regular'>{item.year}</p>
                    </div>
                    <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.4)' : '' }} className='card-info-box' >
                        <p className='p-regular'>Genre</p>
                        <p className='p-regular'>{item.genre}</p>
                    </div>
                    <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.4)' : '' }} className='card-info-box' >
                        <p className='p-regular'>Country</p>
                        <p className='p-regular'>{item.country}</p>
                    </div>

                </div> : <div style={{ borderBottom: 'none', color: darkMode ? 'white' : '' }} className='card-info-box' >
                    <p className='p-regular'>Typeface</p>
                    <p className='p-regular'>{item.typeface}</p>
                </div>}

            </Grid >





        </>
    );
}


export default Card
