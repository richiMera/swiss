
import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import arrowRed from '../../assets/arrow-down-red.svg'
import closeS from '../../assets/close-s.svg';
import SortItem from '../SortItem';
import { motion } from 'framer-motion';




const Input = ({ isMobile, placeholder, style, data, setData, type, realData, numberOfFilters, scrollDirection }) => {




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
        const delay = 300; // Ritardo di debounce
        let timeoutId;

        const debounceSetData = (result) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                setData(result);
            }, delay);
        };
        const result = data.filter(item => {
            const { img, filter, bgColor, textColor, ...rest } = item;
            // Rimuovi le proprietà "img" e "filter" dall'oggetto
            return Object.entries(rest).some(([key, val]) => { // Utilizza solo le proprietà rimanenti per la ricerca
                if (typeof val === 'string') { // Controlla solo le stringhe
                    return val.toLowerCase().includes(value.toLowerCase());
                }
                return false; // Ignora altri tipi di valore
            });
        });

        debounceSetData(result);
        return () => clearTimeout(timeoutId); // Pulizia
    }, [value, data]);

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
        <>
            {type === 'search' && <>

                {isMobile && <div id='search-container' className={`input-container `} style={{ position: 'relative', zIndex: '200', width: numberOfFilters > 0 ? '65%' : '80%', borderRadius: '30px', overflow: 'hidden', transition: 'all 0.3s ease', height: '49.6px' }}>
                    <img draggable={false} id={'search-icon'} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translate(0 , -50%)', opacity: '0.4', }} src={searchIcon} />

                    <input style={{ paddingLeft: '45px', paddingRight: '40px', fontSize: '16px', height: '100%', letterSpacing: '.1px', ...style }} className='input-box search' type='text' value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} />
                    {value && <img draggable={false} onClick={(e) => { e.stopPropagation(); setValue(''); }} id={'search-icon'} style={{ position: 'absolute', padding: '17px', right: '0', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', height: '100%', zIndex: '3000' }} src={closeS} />}
                </div>}

                {!isMobile && <div className={`input-container `} style={{ position: 'relative', zIndex: '200', width: '334px', overflow: 'hidden', }}>
                    <img draggable={false} id={'search-icon'} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: '0.4', }} src={searchIcon} />

                    <input style={{ paddingLeft: '45px', paddingRight: '40px', fontSize: '16px', height: '100%', letterSpacing: '.1px', ...style }} className='input-box search' type='text' value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} />
                    {value && <img draggable={false} onClick={(e) => { setValue(''); }} id={'search-icon'} style={{ position: 'absolute', padding: '18px', right: '0', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', height: '100%', zIndex: '3000' }} src={closeS} />}
                </div>}
            </>}

            {
                type === 'sort' && <>
                    <div style={{ position: 'relative', zIndex: '200', }}>
                        {openSort && <div id='sort-menu'>
                            {dataSort.map((e, index) => {
                                return (
                                    <SortItem key={index} text={e.text} active={e.text === sort} onClick={() => { setSort(e.text); setOpenSort(false); e.onClick() }} />
                                )
                            })}
                        </div>}


                        <div id='sort-toggle-button' style={{ display: 'flex', alignItems: 'center', position: 'realtive', cursor: 'pointer' }} onClick={() => { setOpenSort(!openSort) }} >
                            <p className='p-regular' style={{ color: '#bbbbbb', marginRight: '8px' }}>{sort}</p>
                            <img draggable={false} id={'arrow-sort'} style={{ transition: ' all 0.3s ease-out', transform: openSort ? 'rotate(180deg)' : '' }} src={arrowRed} />
                        </div>
                    </div>
                </>
            }


        </>



    );
}


export default Input



