
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css';




const Header = ({ onClickMoreInfo, moreInfo, onClickDarkMode, darkMode, setColumnWidth, setOpenFilters, isMobile }) => {



    return (
        <header>
            <Grid padding={{ width: '100%', marginTop: '0', marginLeft: '0', alignItems: 'center' }} container >
                <Grid style={{ paddingLeft: '0' }} item xs={4}>
                    <div>
                        <h1 style={{ fontWeight: '400' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema<span style={{ color: '#E72A00' }}>Typography</span></h1>

                    </div>
                </Grid >
                <Grid style={{ display: 'flex', alignItems: 'center' }} item xs={4}>

                    <p className='p-regular'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium </p>
                </Grid >
                <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={4}>


                    <p className='p-regular pointer'>info</p>

                </Grid >
            </Grid>





        </header >
    );
}


export default Header
