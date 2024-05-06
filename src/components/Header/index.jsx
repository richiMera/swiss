
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css';
import Info from '../Info';
import { motion } from "framer-motion"





const Header = ({ isMobile, openFilters, scrollDirection, setIsOpenInfo, isOpenInfo }) => {






    return (


        <div style={{ width: '100%', marginTop: '0', marginLeft: '0', position: 'relative', zIndex: openFilters ? '' : '9001', display: 'flex', justifyContent: !isMobile ? 'center' : 'start', color: ' #ECECEC' }}  >

            <div style={{ position: 'fixed', transition: 'all .3s ease', top: scrollDirection === 'down' && !isOpenInfo ? '-120px' : '16px', left: '16px', zIndex: '9001' }}>
                <h1 style={{ fontWeight: '200' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema<span style={{ color: isOpenInfo ? '#0D0D0D' : '#E72A00', fontWeight: '400' }}>Typography</span></h1>

            </div>


            <div style={{ position: 'fixed', right: '16px', transition: 'all .3s ease', top: scrollDirection === 'down' && !isOpenInfo ? '-120px' : '16px', zIndex: '9001' }} >
                <p onClick={() => { setIsOpenInfo(!isOpenInfo) }} style={{ opacity: isOpenInfo ? '' : ' 0.64' }} className='p-regular pointer hover-transition'>{isOpenInfo ? 'Close' : 'Info'}</p>

            </div >

        </div>


    );
}


export default Header
