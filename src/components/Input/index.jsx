
import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import arrowRed from '../../assets/arrow-down-red.svg'
import closeXs from '../../assets/close-xs.svg'
import SortItem from '../SortItem';




const Input = ({ isMobile, placeholder, style, data, setData, type, realData }) => {


    const [value, setValue] = useState('');
    const [sort, setSort] = useState('Featured');
    const [openSort, setOpenSort] = useState(false)
    const dataSort = [
        {
            text: 'Featured',
            onClick: () => { setData(data) }

        },
        {
            text: 'Year (ASC)',
            onClick: () => { setData(realData.slice().sort((a, b) => parseInt(a.year) - parseInt(b.year))) }
        },
        {
            text: 'Year (DESC)',
            onClick: () => { setData(realData.slice().sort((a, b) => parseInt(b.year) - parseInt(a.year))) }
        },
        {
            text: 'Movie title (A-Z)',
            onClick: () => { setData(realData.slice().sort((a, b) => a.title.localeCompare(b.title))) }
        },
        {
            text: 'Movie title (Z-A)',
            onClick: () => { setData(realData.slice().sort((a, b) => b.title.localeCompare(a.title))) }
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
        <div className='input-container' style={{ position: 'relative', zIndex: '200' }}>
            {type === 'search' && <>


                <img id={'search-icon'} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: '0.4' }} src={searchIcon} />

                <input style={{ paddingLeft: '45px', fontSize: '16px', letterSpacing: '.1px', ...style }} className='input-box' type='text' value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} />
                {value && <img onClick={() => { setValue(''); }} id={'search-icon'} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }} src={closeXs} />}</>}

            {type === 'sort' && <>
                {openSort && <div id='sort-menu'>
                    {dataSort.map((e, index) => {
                        return (
                            <SortItem key={index} text={e.text} active={e.text === sort} onClick={() => { setSort(e.text); setOpenSort(false); e.onClick() }} />
                        )
                    })}
                </div>}


                <div id='sort-toggle-button' style={{ display: 'flex', alignItems: 'center', position: 'realtive', cursor: 'pointer' }} onClick={() => { setOpenSort(!openSort) }} >
                    <p className='p-regular' style={{ color: '#ececec', marginRight: '8px' }}>{sort}</p>
                    <img id={'arrow-sort'} style={{ transition: ' all 0.3s ease-out', transform: openSort ? 'rotate(180deg)' : '' }} src={arrowRed} />
                </div>
            </>}
        </div>
    );
}


export default Input



