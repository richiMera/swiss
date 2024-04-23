
import React, { useEffect, useState } from 'react';
import './style.css';





const FixedFilters = ({ children }) => {



    return (
        <div className='fixed-end-filter'>


            {children}

            {/* <p onClick={onClickMoreInfo} style={{ marginRight: '16px' }} className='p-regular pointer'>{moreInfo ? 'Less info' : 'More info'}</p>
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
            </div> */}
        </div>
    );
}


export default FixedFilters



