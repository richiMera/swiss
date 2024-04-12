
import React, { useEffect, useState } from 'react';

import './style.css'
import { Drawer } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';






const FilterDrawer = ({ open, setOpenFilters, darkMode, data, setFilteredData, isMobile }) => {

    const [filtersData, setFiltersData] = useState({});
    const [innerFilters, setInnerFilters] = useState({});
    const drawerPaperStyle = {
        top: '61px',
        width: isMobile ? '100%' : '427px'// Sovrascrive la proprietà top del Drawer
    };



    console.log(isMobile);








    useEffect(() => {

        const countByTypeface = data.reduce((acc, curr) => {
            acc[curr.typeface] = (acc[curr.typeface] || 0) + 1;
            return acc;
        }, {});

        const countByDecade = data.reduce((acc, curr) => {
            const decade = Math.ceil(curr.year / 10) * 10; // Arrotonda l'anno alla decade successiva
            acc[decade] = (acc[decade] || 0) + 1;
            return acc;
        }, {});

        const countByGenre = data.reduce((acc, curr) => {
            acc[curr.genre] = (acc[curr.genre] || 0) + 1;
            return acc;
        }, {});


        const fData = {
            classifications: countByTypeface,
            decade: countByDecade,
            genres: countByGenre,

        }

        const newData = Object.fromEntries(
            Object.entries(fData).map(([key, value]) => {
                const updatedValue = Object.fromEntries(
                    Object.entries(value).map(([innerKey, innerValue]) => [innerKey, false])
                );
                return [key, updatedValue];
            })
        );


        setFiltersData(fData);
        setInnerFilters(newData)




    }, []);



    const handleChange = (category, option) => (event) => {
        const checked = event.target.checked;
        console.log('checked', checked);
        setInnerFilters(prevOptions => ({
            ...prevOptions,
            [category]: {
                ...prevOptions[category],
                [option]: checked ? checked : false
            }
        }));


    };


    const clickFilter = () => {
        const trueKeys = [];
        const copyArray = [...data]

        // Ciclo attraverso ogni chiave dell'oggetto data
        for (const category in innerFilters) {
            // Verifica se il valore della categoria corrente è un oggetto
            if (typeof innerFilters[category] === 'object') {
                // Cicla attraverso ogni chiave all'interno della categoria corrente
                for (const key in innerFilters[category]) {
                    // Se il valore della chiave corrente è true e la categoria è 'decade'
                    if (innerFilters[category][key] === true && category === 'decade') {
                        // Estrai l'inizio e la fine della decade
                        const decadeEnd = parseInt(key); // Fine della decade
                        const decadeStart = decadeEnd - 9; // Inizio della decade (10 anni prima)

                        // Aggiungi tutte le chiavi comprese tra l'inizio e la fine della decade
                        for (let i = decadeStart; i <= decadeEnd; i++) {
                            trueKeys.push(i.toString()); // Converti in stringa se necessario
                        }
                    } else if (innerFilters[category][key] === true) {
                        // Se il valore della chiave corrente è true, pushalo nell'array trueKeys
                        trueKeys.push(key);
                    }
                }
            }
        }

        const filteredDataX = copyArray.filter(item =>
            // Verificare se almeno una delle proprietà dell'elemento corrente è presente in trueKeys
            Object.keys(item).some(key => trueKeys.includes(item[key]))
        );

        console.log('trueKeys', trueKeys, filteredDataX);

        setFilteredData(filteredDataX);
        setOpenFilters(false);

    };


    return (
        <>
            <Drawer style={{ width: isMobile ? '100%' : '427px', }} transitionDuration={{ enter: 500, exit: 1000 }} sx={{
                '& .MuiDrawer-paper': drawerPaperStyle,
            }} onClose={() => { setOpenFilters(false) }} open={open}>
                <div style={{ overflow: 'hidden', width: isMobile ? '100%' : '427px', height: '100%', padding: '24px', backgroundColor: darkMode ? 'black' : '', color: darkMode ? '#ECECEC' : '', borderRight: darkMode ? '1px solid #ECECEC' : '1px solid black' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '76px' }}>
                        <p onClick={clickFilter} className='p-big pointer'>Filter</p>
                        <p onClick={() => { setOpenFilters(false) }} className='p-big pointer'>Close</p>
                    </div>
                    <div style={{ overflowY: 'auto', height: 'calc(100% - 110px)' }}>
                        <div style={{ marginBottom: '40px' }} >
                            <p style={{ marginBottom: '16px' }} className='p-big'>Classification</p>
                            <FormGroup>
                                {(filtersData.classifications) && Object.entries(filtersData.classifications).map(([typeface, count]) => {
                                    console.log(innerFilters['classifications'][typeface]); return (
                                        <div key={typeface} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '1px solid rgba(22, 22, 22, 0.16)', padding: '8px 0' }}>
                                            <FormControlLabel control={<Checkbox sx={{
                                                '& .MuiSvgIcon-root path': {
                                                    stroke: 'white', // Imposta il colore del bordo bianco intorno al path
                                                    strokeWidth: '0.5px', // Imposta lo spessore del bordo
                                                },
                                            }} checked={innerFilters['classifications'][typeface]} onChange={handleChange('classifications', typeface)} />} label={typeface} />
                                            {/* <p className='p-regular'>{typeface}</p> */}
                                            <p className='p-regular'>{count}</p>
                                        </div>
                                    )
                                })}


                            </FormGroup>


                        </div>
                        <div style={{ marginBottom: '40px' }} >
                            <p style={{ marginBottom: '16px' }} className='p-big'>Decade</p>
                            <FormGroup>
                                {filtersData.decade && Object.entries(filtersData.decade).map(([year, count]) => (
                                    <div key={year} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '1px solid rgba(22, 22, 22, 0.16)', padding: '8px 0' }}>
                                        <FormControlLabel control={<Checkbox sx={{
                                            '& .MuiSvgIcon-root path': {
                                                stroke: 'white', // Imposta il colore del bordo bianco intorno al path
                                                strokeWidth: '0.5px', // Imposta lo spessore del bordo
                                            },
                                        }} checked={innerFilters['decade'][year]} onChange={handleChange('decade', year)} />} label={year} />
                                        <p className='p-regular'>{count}</p>
                                    </div>
                                ))}
                            </FormGroup>
                        </div>
                        <div style={{ marginBottom: '40px' }} >
                            <p style={{ marginBottom: '16px' }} className='p-big'>Film genre</p>
                            <FormGroup>
                                {filtersData.genres && Object.entries(filtersData.genres).map(([genre, count]) => (
                                    <div key={genre} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '1px solid rgba(22, 22, 22, 0.16)', padding: '8px 0' }}>
                                        <FormControlLabel control={<Checkbox sx={{
                                            '& .MuiSvgIcon-root path': {
                                                stroke: 'white', // Imposta il colore del bordo bianco intorno al path
                                                strokeWidth: '0.5px', // Imposta lo spessore del bordo
                                            },
                                        }} checked={innerFilters['genres'][genre]} onChange={handleChange('genres', genre)} />} label={genre} />
                                        <p className='p-regular'>{count}</p>
                                    </div>
                                ))}
                            </FormGroup>


                        </div>
                    </div>

                </div>
            </Drawer>





        </>
    );
}


export default FilterDrawer
