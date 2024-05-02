
import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import arrowRed from '../../assets/arrow-down-red.svg'
import closeXs from '../../assets/close-xs.svg'
import SortItem from '../SortItem';




const Input = ({ isMobile, setFilter, placeholder, style, data, setData, type }) => {


    const [value, setValue] = useState('');
    const [sort, setSort] = useState('Featured');
    const [closeInput, setCloseInput] = useState(true);
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            const sortMenu = document.getElementById('sort-menu');
            const arrowSort = document.getElementById('arrow-sort');
            const toggleButton = document.getElementById('sort-toggle-button'); // Aggiunto ID al div che apre il menu
            if (sortMenu && !sortMenu.contains(event.target) && !arrowSort.contains(event.target) && !toggleButton.contains(event.target)) {
                setOpenSort(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openSort]);


    return (
        <div className='input-container' style={{ position: 'relative', }}>
            {type === 'search' && <>


                <img onClick={() => { if (isMobile) { setCloseInput(false) } }} id={'search-icon'} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: '0.4' }} src={searchIcon} />

                <input style={{ paddingLeft: '45px', fontSize: '16px', letterSpacing: '.1px', ...style }} className='input-box' type='text' value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} />
                {value && <img onClick={() => { setValue(''); if (isMobile) { setCloseInput(true) } }} id={'search-icon'} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }} src={closeXs} />}</>}

            {type === 'sort' && <>
                {openSort && <div id='sort-menu'>
                    {dataSort.map((e, index) => {
                        return (
                            <SortItem key={index} text={e.text} active={e.text === sort} onClick={() => { setSort(e.text); setOpenSort(false) }} />
                        )
                    })}
                </div>}


                <div id='sort-toggle-button' style={{ width: '240px', backgroundColor: openSort ? '#161616' : '', position: 'relative' }} onClick={() => { setOpenSort(!openSort) }} className="input-box">
                    <img id={'arrow-sort'} style={{ position: 'absolute', right: '20px', top: '50%', transition: ' all 0.3s ease-out', transform: openSort ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)' }} src={arrowRed} />
                    Sort by: {sort}
                </div>
            </>}
        </div>
    );
}


export default Input



