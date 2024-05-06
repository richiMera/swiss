
import React, { useEffect, useState } from 'react';
import './style.css';
import { motion } from "framer-motion"
import { Grid } from '@mui/material';








const Info = ({ isMobile, isOpen }) => {


    const variants = {
        open: {
            height: '100vh', transition: {

                type: "spring",
                stiffness: 400,
                damping: 40,
            }
        },
        closed: {
            height: '0px', transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
            }
        },
    }

    const variantsTitle = {
        open: {
            opacity: 1, y: '0', transition: {
                delay: 0.2,
                type: "tween",
                duration: 0.5,
                // type: "spring",
                // stiffness: 400,
                // damping: 40,
            }
        },
        closed: {
            opacity: 0,
            y: '50px',
            transition: {
                type: "tween",
                duration: 0.5,
            }

        },
    }

    return (
        <>
            <Grid style={{ marginBottom: isMobile ? '' : '56px', paddingTop: isMobile ? '36px' : '', opacity: isOpen ? 0 : 1 }} container>
                <Grid item xs={isMobile ? 0 : 4}>
                </Grid>
                <Grid item xs={isMobile ? 12 : 7}>
                    <p
                        style={{
                            opacity: '0.64'
                        }}
                        className='p-regular'




                    >
                        Lorem ipsum dolor sit amet consectetur...
                    </p>
                </Grid>

            </Grid >
            <motion.div style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                backgroundColor: ' #E72A00',
                zIndex: '6000',
                overflow: 'hidden'
            }}
                initial={{ height: '0px' }}
                animate={isOpen ? "open" : "closed"}
                variants={variants}>
                <motion.div
                    style={{ paddingTop: isMobile ? '56px' : '' }}
                    initial={{ opacity: '0', y: '100px' }}
                    animate={isOpen ? "open" : "closed"}
                    variants={variantsTitle}
                >
                    {/* //Titolo */}
                    <Grid style={{ marginBottom: '56px', }} container>
                        <Grid item xs={isMobile ? 0 : 4}>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 7}>
                            <p
                                style={{
                                    fontSize: isMobile ? '24px' : '40px',
                                    lineHeight: '120%',
                                    padding: '15px'
                                }}
                                className='p-regular'




                            >
                                Lorem ipsum dolor sit amet consectetur. Sit nisl ipsum aliquet condimentum amet elementum sagittis ac. Purus potenti tincidunt consectetur vitae sed proin. Neque sed orci sed lectus vulputate luctus. Laoreet aliquet massa phasellus ut tincidunt.' : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium
                            </p>
                        </Grid>

                    </Grid>
                    {/* Creators */}
                    <Grid style={{ marginBottom: '56px', }} container>
                        <Grid item xs={isMobile ? 0 : 4}>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 7}>
                            <div style={{ display: 'flex', width: isMobile ? '100%' : '60%', padding: '16px' }}>
                                <div style={{ marginRight: isMobile ? '36px' : '125px' }}>
                                    <p style={{ opacity: '0.8' }} className='p-small'>Design</p>
                                    <p className='p-big'>andrea dominici</p>
                                    <p className='p-big'>andreadominici.com</p>
                                </div>
                                <div>
                                    <p style={{ opacity: '0.8' }} className='p-small'>Web development</p>
                                    <p className='p-big'>riccardo ferrari</p>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </motion.div>



            </motion.div>
        </>
    );
}


export default Info



