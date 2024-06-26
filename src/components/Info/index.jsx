
import React, { useEffect, useState } from 'react';
import './style.css';
import { motion } from "framer-motion"
import { Grid } from '@mui/material';


const Info = ({ isMobile, isOpen }) => {


    const variantsC = {
        open: {
            height: isMobile ? '100dvh' : '100vh',
            transition: {
                ease: [0.5, 0.4, 0.2, 0.2], // Funzione di easing personalizzata
                duration: 0.3, // Durata dell'animazione in secondi
            }
        },
        closed: {
            height: '0px',
            transition: {
                type: 'tween', // Funzione di easing personalizzata
                duration: 0.3, // Durata dell'animazione in secondi
            }
        },
    }

    const variantsContainer = {
        close: { opacity: 0, y: '50px' },
        open: {
            opacity: 1,
            y: '0',
            transition: {
                ease: [0, 0.71, 0.2, 1.01],
                delayChildren: 0.3,
                staggerChildren: 0.2,
            }
        }
    }

    const variantsItem = {
        closed: { opacity: 0, y: '50px', },
        open: { opacity: 1, y: '0', transition: { duration: 0.5 } },
    }


    const variantsL = {
        open: {
            opacity: 0.64, y: '0', transition: {
                delay: 0.1,
                type: "tween",
                duration: 0.5,
                // type: "spring",
                // stiffness: 400,
                // damping: 40,
            }
        },

    }


    const [scrollPosition, setScrollPosition] = useState(0);
    useEffect(() => {
        // Cleanup function to reset transformation when component unmounts or item becomes null
        const metaThemeColor = document.querySelector("meta[name='theme-color']");

        if (isOpen) {
            setScrollPosition(window.scrollY);
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            metaThemeColor.setAttribute('content', '#e72a00');
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
            metaThemeColor.setAttribute('content', '#0d0d0d');
        }



    }, [isOpen]);


    return (
        <div data-lenis-prevent="true">
            {/* <Grid style={{ opacity: isOpen ? 0 : 1, color: '#ECECEC', paddingTop: !isOpen ? isMobile ? '48px' : '16px' : '', paddingLeft: !isOpen ? isMobile ? '16px' : '' : '', paddingBottom: isMobile ? '56px' : '', paddingRight: !isOpen ? isMobile ? '16px' : '' : '', }} container>
                <Grid item xs={isMobile ? 0 : 4}>
                </Grid>
                <Grid item xs={isMobile ? 12 : 7}>
                    <motion.p initial={{ opacity: '0', y: '-50px' }} animate={"open"}
                        variants={variantsL}
                        style={{
                            opacity: '0.64',
                            lineHeight: '130%'

                        }}
                        className='p-regular'




                    >
                        An independent archive to celebrate typography and its starring role in cinema opening titles.
                    </motion.p>
                </Grid>

            </Grid > */}
            <motion.div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                backgroundColor: ' #E72A00',
                zIndex: '6000',
                overflow: 'hidden',
                color: '#ECECEC',
                paddingTop: isMobile && isOpen ? '16px' : ''
            }}
                initial={{ height: '0px' }}
                animate={isOpen ? "open" : "closed"}
                variants={variantsC}>
                <motion.div
                    style={{ height: '100%' }}
                    initial={"close"}
                    animate={isOpen ? "open" : "closed"}
                    variants={variantsContainer}
                >
                    {/* //Titolo */}
                    <Grid style={{ paddingBottom: '56px', }} container>

                        <Grid item xs={12}>
                            <motion.p
                                variants={variantsItem}
                                style={{
                                    fontSize: isMobile ? '24px' : '56px',
                                    lineHeight: '120%',
                                    padding: '15px'
                                }}
                                className='p-regular'

                            >
                                Cinema Typography was born out of a passion for cinema and design. Our mission is to celebrate the art of typography in the cinematic context and to provide enthusiasts with a space to explore, learn, and share                            </motion.p>
                        </Grid>

                    </Grid>
                    {/* Creators */}
                    <Grid style={{ marginBottom: '56px', }} container>
                        <Grid item xs={isMobile ? 0 : 7}>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 5}>
                            <motion.div variants={variantsItem} style={{ display: 'flex', width: '100%', padding: '16px' }}>
                                <div style={{ marginRight: isMobile ? '36px' : '125px' }}>
                                    <p style={{ opacity: '0.8' }} className='p-small'>Design</p>
                                    <p className='p-big'>andrea dominici</p>
                                    <a style={{
                                        fontSize: '18px',
                                        fontWeight: '200',
                                        color: '#ececec', textDecoration: 'none'
                                    }} href='https://www.andreadominici.com' target='blank' className='p-big'>andreadominici.com</a>
                                </div>
                                <div>
                                    <p style={{ opacity: '0.8' }} className='p-small'>Web development</p>
                                    <p className='p-big'>riccardo ferrari</p>
                                </div>
                            </motion.div>
                            <motion.div variants={variantsItem} style={{ display: 'flex', width: isMobile ? '100%' : '60%', padding: '16px' }}>
                                <div style={{ marginRight: isMobile ? '36px' : '125px' }}>
                                    <p style={{ opacity: '0.8' }} className='p-small'>Contact</p>
                                    <a style={{
                                        fontSize: '18px',
                                        fontWeight: '200',
                                        color: '#ececec', textDecoration: 'none'
                                    }} href='mailto:hello@andreadominici.com' className='p-big'>hello@andreadominici.com</a>
                                </div>

                            </motion.div>
                        </Grid>

                    </Grid>
                    <motion.div style={{ position: 'fixed', width: isMobile ? '75%' : '95%', bottom: '16px', right: '16px', left: '16px', color: 'black' }} className='isChildren' variants={variantsItem}>
                        <p style={{ fontSize: isMobile ? '12px' : '14px' }}>All material for informational, entertainment and non-profit purposes only. Works appearing on this site are the property of their respective owners and may not be saved, re-transmitted, republished, or reformatted by any means, electronic or mechanical. This site offers broad public access to these materials exclusively for the private, informational and non-commercial use.</p>
                    </motion.div>
                </motion.div>



            </motion.div>
        </div>
    );
}


export default Info



