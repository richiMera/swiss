
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css';
import Info from '../Info';
import { motion } from "framer-motion"





const Header = ({ isMobile, openFilters, scrollDirection, setIsOpenInfo, isOpenInfo }) => {






    const variants = {
        hidden: { top: "-50px" },
        visible: {
            top: "16px", transition: {
                delay: 0.1,
                type: "tween",
                duration: 0.5,
                // type: "spring",
                // stiffness: 400,
                // damping: 40,
            }
        }
    };



    return (
        <div style={{ width: '100%', marginTop: '0', marginLeft: '0', zIndex: openFilters ? '' : '9001', display: 'flex', justifyContent: !isMobile ? 'center' : 'start', color: ' #ECECEC' }}>
            <motion.div initial="hidden" animate={scrollDirection === 'down' && !isOpenInfo ? "hidden" : "visible"} variants={variants} style={{ position: 'fixed', left: '16px', zIndex: '9001' }}>
                <h1 style={{ fontWeight: '200' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema<span style={{ color: isOpenInfo ? '#0D0D0D' : '#E72A00', fontWeight: '400' }}>Typography</span></h1>
            </motion.div>
            <motion.div initial="hidden" animate={scrollDirection === 'down' && !isOpenInfo ? "hidden" : "visible"} variants={variants} style={{ position: 'fixed', right: '16px', zIndex: '9001' }}>
                <p onClick={() => { setIsOpenInfo(!isOpenInfo) }} style={{ opacity: isOpenInfo ? '' : ' 0.64' }} className='p-regular pointer hover-transition'>{isOpenInfo ? 'Close' : 'Info'}</p>
            </motion.div>
        </div>
    );
}


export default Header
