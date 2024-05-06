
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css';
import { motion } from "framer-motion"




const Card = ({ item, width, isMobile, setItem, index }) => {
    const variantsCardsContainer = {
        open: {
            opacity: 1, y: '0', transition: {
                delay: index * 0.1,
                type: "tween",
                duration: 1,
                // type: "spring",
                // stiffness: 400,
                // damping: 40,
            }
        },

    }

    const [divWidthPx, setDivWidthPx] = useState(0);
    const [divPercentage, setDivPercentage] = useState(0);
    const [xs, setXs] = useState(4);
    const [isHovered, setIsHovered] = useState(false);


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
            {/* {isHovered && <div
                style={{
                    position: 'absolute',
                    left: position.x - 10, // Posiziona il div al centro del cursore
                    top: position.y + 30,
                    padding: '10px 16px',
                    borderRadius: '30px',
                    zIndex: '200',
                    color: '#ECECEC',
                    backgroundColor: '#E72A00',
                    transition: 'all 0.2 ease',
                    fontWeight: '200',
                    pointerEvents: 'none',
                    display: 'inline-block', // Utilizzato per mantenere il div nella stessa riga del testo
                }}
            >
                More
            </div>} */}
            <Grid onMouseEnter={() => { setIsHovered(true) }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => { setItem(item) }}
                style={{ cursor: 'pointer' }} item xs={xs}>
                <motion.div initial={{ opacity: '0', y: '50px' }}
                    animate={"open"}
                    variants={variantsCardsContainer} style={{ outline: '1px solid #272727', backgroundColor: isHovered ? item.bgColor : '#0D0D0D', height: divWidthPx / 1.85 + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10% 12%', position: 'relative', overflow: 'hidden' }} >

                    <img style={{ transform: isHovered ? 'scale(0.95)' : 'scale(1)', width: '100%', filter: isHovered ? item?.filter : '', transition: 'transform 0.5s' }} src={item.img} />
                    <div style={{ position: 'absolute', bottom: isHovered ? '16px' : '-50px', left: '24px', transition: 'bottom 0.5s' }}>
                        <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Typeface</p>
                        <p className='p-small' style={{ color: item?.textColor }}>{item?.typeface}</p>
                    </div>
                </motion.div>

            </Grid >





        </>
    );
}


export default Card
