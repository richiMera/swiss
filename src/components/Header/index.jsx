
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';




const Header = ({ onClickMoreInfo, moreInfo, onClickDarkMode, darkMode, setColumnWidth, setOpenFilters, isMobile }) => {



    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', padding: '0 16px', zIndex: '200' }}>
            <Grid padding={{ width: '100%', marginTop: '0', marginLeft: '0', color: darkMode ? '#ECECEC' : '', borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.6)' : '1px solid rgba(22, 22, 22, 0.6)', backgroundColor: darkMode ? '#080808' : 'white', alignItems: 'center', paddingBottom: '16px' }} container spacing={2}>
                <Grid style={{ paddingLeft: '0' }} item xs={4}>
                    <div>
                        <h1 style={{ fontWeight: '400' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema Typography</h1>

                    </div>
                </Grid >
                <Grid style={{ display: 'flex', alignItems: 'center' }} item xs={6}>

                    <p onClick={onClickMoreInfo} style={{ marginRight: '16px' }} className='p-regular pointer'>{moreInfo ? 'Less info' : 'More info'}</p>
                    <p onClick={() => { setOpenFilters(true) }} style={{ marginRight: '16px' }} className='p-regular pointer'>Filters</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        {!isMobile && <>
                            <p style={{ marginRight: '16px' }} className='p-regular pointer'>Size:</p>
                            <Slider
                                style={{ width: '88px' }}
                                aria-label="Size"
                                defaultValue={3}
                                // valueLabelDisplay="auto"
                                shiftStep={5}
                                step={1}
                                marks
                                size='small'
                                min={1}
                                max={5}
                                onChange={(e) => { setColumnWidth(e.target.value) }}
                            />
                        </>}
                    </div>
                </Grid >
                <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={2}>


                    <p onClick={onClickDarkMode} className='p-regular pointer'>switch</p>

                </Grid >
            </Grid>





        </div >
    );
}


export default Header
