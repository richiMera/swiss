
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Grid } from '@mui/material';
import closeSvg from '../../assets/close.svg';









const Detail = ({ isMobile, item, setItem
}) => {


    const variantsScale = {
        open: {
            scale: '1',

            transition: {
                delay: 0.1,
                type: "spring", stiffness: 100,
                duration: 0.5,
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
                type: "spring", stiffness: 100,
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
                type: "spring", stiffness: 100,
                duration: 0.5,
            }
        },
        closed: {
            y: '-100px',
        },

    }

    console.log(item);
    return (
        <div style={{
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
            transformStyle: 'preserve-3d'
        }} >
            {item && <div onClick={(e) => { e.stopPropagation(); setItem(null); }} style={{ zIndex: '6000', position: isMobile ? 'fixed' : 'absolute', top: isMobile ? '' : '24px', bottom: isMobile ? '24px' : '', right: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                <motion.img initial={"closed"} animate={item ? "open" : "closed"} variants={isMobile ? variantsYTop : variantsYButtom} src={closeSvg} />
            </div>}
            <motion.img initial={"closed"} animate={item ? "open" : "closed"} variants={variantsScale} style={{
                width: '100%', filter: item?.filter
            }} src={item?.img} />
            {!isMobile ? <motion.div initial={"closed"} animate={item ? "open" : "closed"} variants={variantsYTop} style={{ position: 'absolute', bottom: '24px', left: '0', transition: 'bottom 0.5s', transform: 'translateX(-50%)', display: 'flex', gap: '3%', justifyContent: 'center', width: '100%' }}>

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

            }
        </div>
    );
}


export default Detail



