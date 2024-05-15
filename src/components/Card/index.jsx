
import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import './style.css';
import { motion } from "framer-motion"




const Card = ({ item, width, isMobile, setItem, index, setIsHovered, setFont, setIndex }) => {


    const variantsCardsContainer = {
        hidden: {
            opacity: 0, // Valore iniziale per l'opacity
            y: '50px',
        },
        visible: {
            opacity: 1,
            y: '0',
        },
    };


    const [divWidthPx, setDivWidthPx] = useState(0);
    const [divPercentage, setDivPercentage] = useState(0);
    const [xs, setXs] = useState(4);
    const [innerIsHovered, setInnerIsHovered] = useState(false);
    // const [innerIsHovered, innerSetIsHovered] = useState(false);
    // const contentRef = useRef(null);

    // const handleMouseMove = (e) => {
    //     setPosition({ x: e.clientX, y: e.clientY });
    // };

    // const handleScroll = () => {
    //     // Calcoliamo la nuova posizione durante lo scroll
    //     if (isHovered && contentRef.current) {
    //         const { width, height } = contentRef.current.getBoundingClientRect();
    //         setDimensions({ width, height });
    //     }
    // };

    // useEffect(() => {
    //     // Aggiungiamo un listener per l'evento scroll al documento
    //     window.addEventListener('scroll', handleScroll);

    //     // Pulizia del listener quando il componente si smonta
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);


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
            {/* <div
                style={{
                    position: 'absolute',
                    left: position.x - 10 - (dimensions.width / 2) + window.scrollX, // Posiziona il div al centro del cursore
                    top: position.y + 30 + window.scrollY,
                    padding: '10px 16px',
                    borderRadius: '30px',
                    zIndex: '200',
                    color: '#E72A00',
                    backgroundColor: '#ECECEC',
                    transition: 'all 0.2 ease',
                    fontWeight: '200',
                    pointerEvents: 'none',
                    display: 'inline-block', // Utilizzato per mantenere il div nella stessa riga del testo
                }}
                ref={contentRef}
            >
                Font: <span style={{ fontWeight: 'bold' }}>{item?.typeface}</span>
            </div > */}
            <Grid onContextMenu={(e) => { e.preventDefault() }} onMouseEnter={() => { if (!isMobile) { setIsHovered(true); setInnerIsHovered(true); setFont(item.typeface) } }}
                onMouseLeave={() => { if (!isMobile) { setIsHovered(false); setInnerIsHovered(false); setFont('') } }}
                // onMouseMove={handleMouseMove}
                onClick={() => { setItem(item); setIndex(index) }}
                style={{ cursor: 'pointer' }} item xs={xs}>
                <motion.div initial={"hidden"}
                    animate={"visible"}
                    transition={{
                        opacity: {
                            delay: 0.1,
                            duration: 0.5,
                        },
                        y: {
                            delay: index === 0 || index === 3 || index === 6 ? 0.1 : index === 1 || index === 4 || index === 7 ? 0.2 : 0.3,
                            duration: 0.5,
                            type: "tween",
                        },
                    }}
                    variants={variantsCardsContainer} style={{ outline: '1px solid #272727', backgroundColor: innerIsHovered ? item.bgColor : '#0D0D0D', height: divWidthPx / 1.85 + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10% 12%', position: 'relative', overflow: 'hidden' }} >

                    <img draggable={false} style={{ transform: innerIsHovered ? 'scale(0.95)' : 'scale(1)', width: '100%', filter: innerIsHovered ? item?.filter : '', transition: 'transform 0.5s' }} src={item.img} />
                    {!isMobile && <div style={{ position: 'absolute', bottom: innerIsHovered ? '16px' : '-50px', left: '24px', transition: 'bottom 0.5s' }}>
                        <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Director</p>
                        <p className='p-small' style={{ color: item?.textColor }}>{item?.film_director}</p>
                    </div>}
                </motion.div>

            </Grid >





        </>
    );
}


export default Card
