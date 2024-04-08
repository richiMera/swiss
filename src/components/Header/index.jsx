
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';




const Header = ({ onClickMoreInfo, moreInfo, onClickDarkMode, darkMode, setColumnWidth }) => {



    return (
        <>
            <Grid padding={{ padding: '0 0 16px 0', marginTop: '0', color: darkMode ? '#ECECEC' : '' }} container spacing={2}>
                <Grid item xs={4}>
                    <p className='p-regular'>Cinema Typography</p>
                </Grid >
                <Grid item xs={4}>
                    <p onClick={onClickMoreInfo} className='p-regular pointer'>{moreInfo ? 'Less info' : 'More info'}</p>
                </Grid >
                <Grid style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }} item xs={4}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={3}
                        valueLabelDisplay="auto"
                        shiftStep={6}
                        step={1}
                        marks
                        min={1}
                        max={6}
                        onChange={(e) => { setColumnWidth(e.target.value) }}
                    />
                    <p onClick={onClickDarkMode} className='p-regular pointer'>switch</p>
                </Grid >
            </Grid>





        </>
    );
}


export default Header
