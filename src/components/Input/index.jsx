
import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg'




const Input = ({ isMobile, setFilter, placeholder, style, data, setData }) => {


    const [value, setValue] = useState('');


    useEffect(() => {
        const result = data.filter(item => {
            return Object.values(item).some(val => {
                if (typeof val === 'string') { // Controlla solo le stringhe
                    return val.toLowerCase().includes(value.toLowerCase());
                }
                return false; // Ignora altri tipi di valore
            });
        });
        setData(result)
    }, [value]);


    return (
        <div className='input-container' style={{ position: 'relative' }}>
            <img id={'search-icon'} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} src={searchIcon} />
            <input style={{ paddingLeft: '45px', ...style }} className='input-box' type='text' value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} />
        </div>
    );
}


export default Input



