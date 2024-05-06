
import React, { useEffect, useState } from 'react';
import './style.css';





const FixedFilters = ({ children, isMobile }) => {


    return (
        <div style={{ bottom: isMobile ? '16px' : '', overflowX: isMobile ? 'scroll' : '', justifyContent: isMobile ? 'flex-start' : '', padding: isMobile ? '0 16px' : '' }} className='fixed-end-filter'>


            {children}


        </div>
    );
}


export default FixedFilters



