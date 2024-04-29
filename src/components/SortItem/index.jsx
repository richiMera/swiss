
import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import arrowRed from '../../assets/arrow-down-red.svg'




const SortItem = ({ active, text, onClick }) => {





    return (

        <div onClick={onClick} className='sort-item'>
            {active && <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#E72A00', marginRight: '10px' }}></div>}
            <p>{text}</p>
        </div>


    );
}


export default SortItem



