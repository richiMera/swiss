
import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import arrowRed from '../../assets/arrow-down-red.svg'
import SortItem from '../SortItem';




const Input = ({ isMobile, setFilter, placeholder, style, data, setData, type }) => {


    const [value, setValue] = useState('');
    const [sort, setSort] = useState('Featured');
    const [openSort, setOpenSort] = useState(false)
    const dataSort = [
        {
            text: 'Featured'
        },
        {
            text: 'Year (ASC)'
        },
        {
            text: 'Year (DESC)'
        },
        {
            text: 'Movie title (A-Z)'
        },
        {
            text: 'Movie title (Z-A)'
        }
    ]


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
            {type === 'search' && <>
                <img id={'search-icon'} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: '0.4' }} src={searchIcon} />
                <input style={{ paddingLeft: '45px', fontSize: '16px', letterSpacing: '.1px', ...style }} className='input-box' type='text' value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} />
            </>}
            {type === 'sort' && <div>
                {openSort && <div id='sort-menu'>
                    {dataSort.map((e, index) => {
                        return (
                            <SortItem key={index} text={e.text} active={e.text === sort} onClick={() => { setSort(e.text); setOpenSort(false) }} />
                        )
                    })}
                </div>}
                <img id={'arrow-sort'} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }} src={arrowRed} />

                <div style={{ width: '240px' }} onClick={() => { setOpenSort(true) }} className="input-box">
                    Sort by: {sort}
                </div>
            </div>}
        </div>
    );
}


export default Input



