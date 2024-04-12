
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css'



const Card = ({ item, width, moreInfo, darkMode }) => {

    const [divWidthPx, setDivWidthPx] = useState(0);
    const [divPercentage, setDivPercentage] = useState(0);
    const [xs, setXs] = useState(4);

    useEffect(() => {
        // Calcola la larghezza del div in pixel basandosi sulla larghezza della viewport
        const viewportWidth = window.innerWidth;
        const divWidthPercentage = divPercentage; // 33% della viewport
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
    }, [divPercentage]);

    useEffect(() => {
        if (width === 1) {
            setXs(2)
            setDivPercentage(20)

        }
        if (width === 2) {
            setXs(3)
            setDivPercentage(25)
        }
        if (width === 3) {
            setXs(4)
            setDivPercentage(33)
        }
        if (width === 4) {
            setXs(6)
            setDivPercentage(50)
        }
        if (width === 5) {
            setXs(12)
            setDivPercentage(100)
        }
    }, [width]);





    return (
        <>
            <Grid item xs={xs}>
                <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.6)' : '1px solid rgba(22, 22, 22, 0.6)', height: divWidthPx / 1.85 + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10% 7%' }} >

                    <img style={{ height: '100%', width: '100%', filter: darkMode ? 'invert(99%) sepia(0%) saturate(3892%) hue-rotate(194deg) brightness(119%) contrast(85%)' : '' }} src={item.img} />

                </div>
                <div style={{ color: darkMode ? '#ECECEC' : '' }}>
                    <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                        <p className='p-small'>Typeface</p>
                        <p className='p-small'>{item.typeface}</p>
                    </div>
                    <div id={'more-info-box'} className={moreInfo ? 'open' : ''}>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Title designer</p>
                            <p className='p-small'>{item.designer}</p>
                        </div>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Film Director</p>
                            <p className='p-small'>{item.film_director}</p>
                        </div>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Year</p>
                            <p className='p-small'>{item.year}</p>
                        </div>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Genre</p>
                            <p className='p-small'>{item.genre}</p>
                        </div>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Country</p>
                            <p className='p-small'>{item.country}</p>
                        </div>

                    </div>

                </div>

            </Grid >





        </>
    );
}


export default Card
