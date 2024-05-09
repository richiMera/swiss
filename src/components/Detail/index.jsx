
import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion"
import { Grid } from '@mui/material';
import closeSvg from '../../assets/close.svg';


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
            y: '0', transition: {
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
                duration: 0.5,
            }
        },
        closed: {
            y: '100px',
        },
    }

    const variantsYButtom = {
        open: {
            y: '0', transition: {
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
                duration: 0.5,
            }
        },
        closed: {
            y: '-100px',
        },

    }

    const imageRef = useRef(null);

    function transformImage(x, y) {
        const image = imageRef.current;
        if (!image) return;

        const box = image.getBoundingClientRect();
        const calcX = -(y - box.y - box.height / 2) / Multiple;
        const calcY = (x - box.x - box.width / 2) / Multiple;

        image.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
    }
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
            transformImage(e.clientX, e.clientY);
        }
    }


    useEffect(() => {
        // Cleanup function to reset transformation when component unmounts or item becomes null
        const image = imageRef.current;
        if (item) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            image.style.transform = "rotateX(0) rotateY(0)";
        }


        // Ripristina lo scroll quando il componente viene smontato
        return () => {
            document.body.style.overflow = 'auto';
        };

    }, [item]);

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
                padding: item ? isMobile ? '16px' : '10% 12%' : ' 0px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8%',
                transformStyle: "preserve-3d",
                perspective: '3000px'
            }} >
            {item && <motion.div initial={"closed"} animate={item ? "open" : "closed"} variants={variantsYButtom} onClick={(e) => { e.stopPropagation(); setItem(null); }} style={{ zIndex: '6000', position: isMobile ? 'fixed' : 'absolute', top: '24px', right: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                <img src={closeSvg} />
            </motion.div>}

            <motion.img
                ref={imageRef}
                initial={"closed"}
                animate={item ? "open" : "closed"}
                variants={variantsScale}
                style={{ width: '100%', filter: item?.filter }}
                src={item?.img}

            />

            {/* {!isMobile ? <motion.div initial={"closed"} animate={item ? "open" : "closed"} variants={variantsYTop} style={{ position: 'absolute', bottom: '40px', left: '0', transition: 'bottom 0.5s', transform: 'translateX(-50%)', display: 'flex', gap: '3%', justifyContent: 'center', width: '100%' }}>

                <div>
                    <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Typeface</p>
                    <p className='p-big' style={{ color: item?.textColor }}>{item?.typeface}</p>
                </div>
                <div>
                    <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Title Designer / Studio</p>
                    <p className='p-big' style={{ color: item?.textColor }}>{item?.designer}</p>
                </div>
                <div>
                    <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Film Director</p>
                    <p className='p-big' style={{ color: item?.textColor }}>{item?.film_director}</p>
                </div>
                <div>
                    <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Year</p>
                    <p className='p-big' style={{ color: item?.textColor }}>{item?.year}</p>
                </div>
                <div>
                    <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Genre</p>
                    <p className='p-big' style={{ color: item?.textColor }}>{item?.genre}</p>
                </div>
                <div>
                    <p className='p-smalls' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Country</p>
                    <p className='p-big' style={{ color: item?.textColor }}>{item?.country}</p>
                </div>

            </motion.div> : <motion.div initial={"closed"} animate={item ? "open" : "closed"} variants={variantsYTop} >
                <Grid container spacing={3}>
                    <Grid item container xs={6}>
                        <Grid style={{ marginBottom: '24px' }} item xs={12}>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Typeface</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.typeface}</p>
                        </Grid>
                        <Grid style={{ marginBottom: '24px' }} item xs={12}>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Title Designer / Studio</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.designer}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Film Director</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.film_director}</p>
                        </Grid>
                    </Grid>
                    <Grid item container xs={6}>

                        <Grid style={{ marginBottom: '24px' }} item xs={12}>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Year</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.year}</p>
                        </Grid>
                        <Grid style={{ marginBottom: '24px' }} item xs={12}>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Genre</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.genre}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <p className='p-smalls' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Country</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.country}</p>
                        </Grid>

                    </Grid>
                </Grid>
            </motion.div>

            } */}
            <motion.div initial={"closed"} animate={item ? "open" : "closed"} variants={variantsYTop} >
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
                            <p className='p-tiny' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Title Designer / Studio</p>

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
                            <p className='p-tiny' style={{ color: item?.textColor }}>{item?.genre}</p>
                        </Grid>
                    </Grid>
                    <Grid style={{ textTransform: 'uppercase' }} item container xs={12} spacing={1}>
                        <Grid style={{ textAlign: 'right' }} item xs={6}>
                            <p className='p-tiny' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Country</p>
                        </Grid>
                        <Grid style={{}} item xs={6}>
                            <p className='p-tiny' style={{ color: item?.textColor }}>{item?.country}</p>
                        </Grid>
                    </Grid>


                </Grid>


            </motion.div>


        </motion.div >
    );
}


export default Detail



