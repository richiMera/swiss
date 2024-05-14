
import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion"
import { Grid } from '@mui/material';
import closeXs from '../../assets/close-xs.svg';
import './style.css'


// fare nuvi detail
//bloccare scroll



const Detail = ({ isMobile, item, setItem
}) => {


    const Multiple = 150;

    const variantsScale = {
        open: {
            scale: '1',
            transition: {
                delay: 0.1,
                type: "spring",
                stiffness: 80, // Riduci lo stiffness per rendere l'effetto meno pronunciato
                damping: 15, // Aumenta il damping per ridurre l'effetto di rimbalzo
                duration: 0.5,
                // ease: "easeInOut",
            }
        },
        closed: {
            scale: '1.1',

        },

    }

    const variantsYTop = {
        open: {
            y: '0', opacity: '1', transition: {
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
                duration: 0.7,
            }
        },
        closed: {
            y: '100px',
            opacity: '0'
        },
    }

    const variantsYButtom = {
        open: {
            y: '0', transition: {
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
                duration: 0.7,
            }
        },
        closed: {
            y: '-100px',
        },

    }

    const imageRef = useRef(null);
    const infoRef = useRef(null);

    function transformImage(x, y) {
        const image = imageRef.current;
        const info = infoRef.current;

        if (!image) return;

        const box = image.getBoundingClientRect();
        const calcX = -(y - box.y - box.height / 2) / Multiple;
        const calcY = (x - box.x - box.width / 2) / Multiple;

        image.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
        info.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;

        image.style.transition = 'transform 0.2s';
        info.style.transition = 'all 0.2s';
    }

    useEffect(() => {
        // Aggiungi un gestore degli eventi per l'evento "keydown" sulla finestra
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setItem(null); // Chiudi il dettaglio quando viene premuto "Esc"
            }
        };

        window.addEventListener('keydown', handleKeyDown); // Aggiungi il gestore degli eventi

        // Pulizia del gestore degli eventi quando il componente viene smontato
        return () => {
            window.removeEventListener('keydown', handleKeyDown); // Rimuovi il gestore degli eventi
        };
    }, [setItem]);

    useEffect(() => {
        let timeoutId;
        if (item) {
            // Delay the initialization of handleMouseMove after one second
            timeoutId = setTimeout(() => {
                setMouseMoveInitialized(true);
            }, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [item]);

    const [mouseMoveInitialized, setMouseMoveInitialized] = useState(false);

    function handleMouseMove(e) {
        if (mouseMoveInitialized) {
            // setPopCorsList(prevList => [...prevList, { x: e.clientX, y: e.clientY }]);
            transformImage(e.clientX, e.clientY);
        }
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        // Cleanup function to reset transformation when component unmounts or item becomes null
        const image = imageRef.current;
        const metaThemeColor = document.querySelector("meta[name='theme-color']");

        // Se il tag meta esiste, imposta il suo contenuto sul colore del tema attuale


        if (item) {
            setScrollPosition(window.scrollY);
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            metaThemeColor.setAttribute('content', item.bgColor);
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
            image.style.transform = "rotateX(0) rotateY(0)";
            metaThemeColor.setAttribute('content', '#0d0d0d');
        }



    }, [item]);


    const changeThemeColor = (newColor) => {
        setThemeColor(newColor);
    };



    return (
        <motion.div
            data-lenis-prevent="true"
            onMouseMove={handleMouseMove} style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                backgroundColor: item?.bgColor,
                zIndex: '90000',
                overflow: 'hidden',
                height: item ? '100vh' : '0px',
                padding: item ? isMobile ? '16px' : '8%' : ' 0px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8%',
                transformStyle: "preserve-3d",
                perspective: '1000px',
            }} >

            {item && <motion.div className='close-circle-div' initial={"closed"} animate={item ? "open" : "closed"} variants={variantsYButtom} onClick={(e) => { e.stopPropagation(); setItem(null); }} style={{ zIndex: '6000', position: isMobile ? 'fixed' : 'absolute', top: '24px', right: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', height: '64px', width: '64px' }}>
                <img draggable={false} src={closeXs} />
            </motion.div>}

            <motion.img
                draggable={false}
                ref={imageRef}
                initial={"closed"}
                animate={item ? "open" : "closed"}
                variants={variantsScale}
                style={{ width: '100%', filter: item?.filter }}
                src={item?.img}

            />

            <motion.div ref={infoRef} initial={"closed"} animate={item ? "open" : "closed"} variants={variantsYTop} >
                <Grid container spacing={0}>
                    <Grid style={{ textTransform: 'uppercase' }} item container xs={12} spacing={1}>
                        <Grid style={{ textAlign: 'right' }} item xs={6}>
                            <p className='p-tiny' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Typeface</p>

                        </Grid>
                        <Grid style={{}} item xs={6}>
                            <p className='p-tiny' style={{ color: item?.textColor }}>{item?.typeface}</p>
                        </Grid>
                    </Grid>
                    <Grid style={{ textTransform: 'uppercase' }} item container xs={12} spacing={1}>
                        <Grid style={{ textAlign: 'right' }} item xs={6}>
                            <p className='p-tiny' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Title Design</p>

                        </Grid>
                        <Grid style={{}} item xs={6}>
                            <p className='p-tiny' style={{ color: item?.textColor }}>{item?.designer}</p>
                        </Grid>
                    </Grid>
                    <Grid style={{ textTransform: 'uppercase' }} item container xs={12} spacing={1}>
                        <Grid style={{ textAlign: 'right' }} item xs={6}>
                            <p className='p-tiny' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Film Director</p>

                        </Grid>
                        <Grid style={{}} item xs={6}>
                            <p className='p-tiny' style={{ color: item?.textColor }}>{item?.film_director}</p>
                        </Grid>
                    </Grid>
                    <Grid style={{ textTransform: 'uppercase' }} item container xs={12} spacing={1}>
                        <Grid style={{ textAlign: 'right' }} item xs={6}>
                            <p className='p-tiny' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Year</p>


                        </Grid>
                        <Grid style={{}} item xs={6}>
                            <p className='p-tiny' style={{ color: item?.textColor }}>{item?.year}</p>
                        </Grid>
                    </Grid>
                    <Grid style={{ textTransform: 'uppercase' }} item container xs={12} spacing={1}>
                        <Grid style={{ textAlign: 'right' }} item xs={6}>
                            <p className='p-tiny' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Genre</p>
                        </Grid>
                        <Grid style={{}} item xs={6}>
                            {item?.genre.map((g, index) => {
                                return (
                                    <p key={index} className='p-tiny' style={{ color: item?.textColor }}>{g}</p>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid style={{ textTransform: 'uppercase' }} item container xs={12} spacing={1}>
                        <Grid style={{ textAlign: 'right' }} item xs={6}>
                            <p className='p-tiny' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Country</p>
                        </Grid>
                        <Grid style={{}} item xs={6}>
                            {item?.country.map((c, index) => {
                                return (
                                    <p key={index} className='p-tiny' style={{ color: item?.textColor }}>{c}</p>
                                )
                            })}

                        </Grid>
                    </Grid>


                </Grid>


            </motion.div>


        </motion.div >
    );
}


export default Detail



