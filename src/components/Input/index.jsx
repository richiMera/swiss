
import React, { useEffect, useState } from 'react';
import searchIcon from '../../assets/search.svg';
import arrowRed from '../../assets/arrow-down-red.svg'
import closeS from '../../assets/close-s.svg';
import SortItem from '../SortItem';
import { motion } from 'framer-motion';




const Input = ({ isMobile, placeholder, style, data, setData, type, realData }) => {




    const [value, setValue] = useState('');
    const [sort, setSort] = useState('Featured');
    const [openSort, setOpenSort] = useState(false)
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        // Se il valore è vuoto, impostiamo isActive su false e la larghezza al 50%

        setIsFocused(false);

        if (value === '') {
            setIsActive(false)

        }
    };








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

    useEffect(() => {
        const fixedContainer = document.getElementById('fixed-end-container');

        const handleClickOutside = (event) => {
            const searchCont = document.getElementById('search-container');

            if (searchCont && !searchCont.contains(event.target)) {
                setIsFocused(false);

            }
        };
        if (isMobile && isFocused) {
            fixedContainer.style.bottom = '200px';
            // if (value === '') {
            //     console.log('entro');
            //     setIsActive(false);
            // }
        }
        if (isMobile && !isFocused) {
            fixedContainer.style.bottom = '16px';
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFocused]);


    useEffect(() => {

        const handleScroll = () => {
            setIsFocused(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);





    return (
        <>
            {type === 'search' && <>

                {isMobile && <div id='search-container' onClick={() => { setIsActive(true); setIsFocused(true) }} className={`input-container ${isActive ? 'active' : ''}`} style={{ position: 'relative', zIndex: '200', width: isActive ? !isFocused ? '30%' : '45%' : '49.6px', height: '49.6px', borderRadius: isActive ? '0' : '30px', overflow: 'hidden', transition: 'all 0.3s ease', border: isActive ? '' : '1px solid #2D2D2D' }}>
                    <img draggable={false} id={'search-icon'} style={{ position: 'absolute', left: isActive ? '20px' : '16px', top: '50%', transform: 'translate(0 , -50%)', opacity: '0.4', }} src={searchIcon} />

                    <input onFocus={handleFocus} onBlur={handleBlur} style={{ paddingLeft: '45px', paddingRight: '40px', fontSize: '16px', height: '100%', letterSpacing: '.1px', border: isActive ? '' : 'none', ...style }} className='input-box search' type='text' value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} />
                    {value && <img draggable={false} onClick={(e) => { e.stopPropagation(); setValue(''); setIsActive(false) }} id={'search-icon'} style={{ position: 'absolute', padding: '17px', right: '0', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', height: '100%', zIndex: '3000' }} src={closeS} />}
                </div>}

                {!isMobile && <div className={`input-container `} style={{ position: 'relative', zIndex: '200', width: '334px', overflow: 'hidden', }}>
                    <img draggable={false} id={'search-icon'} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: '0.4', }} src={searchIcon} />

                    <input style={{ paddingLeft: '45px', paddingRight: '40px', fontSize: '16px', height: '100%', letterSpacing: '.1px', ...style }} className='input-box search' type='text' value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} />
                    {value && <img draggable={false} onClick={(e) => { setValue(''); setIsActive(false) }} id={'search-icon'} style={{ position: 'absolute', padding: '18px', right: '0', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', height: '100%', zIndex: '3000' }} src={closeS} />}
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
                            <p className='p-regular' style={{ color: '#ececec', marginRight: '8px' }}>{sort}</p>
                            <img draggable={false} id={'arrow-sort'} style={{ transition: ' all 0.3s ease-out', transform: openSort ? 'rotate(180deg)' : '' }} src={arrowRed} />
                        </div>
                    </div>
                </>
            }


        </>



    );
}


export default Input



