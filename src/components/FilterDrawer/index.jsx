
import React, { useEffect, useState } from 'react';

import './style.css'
import { Drawer } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '../Chip';








const FilterDrawer = ({ open, setOpenFilters, data, setFilteredData, isMobile }) => {

    const [filtersData, setFiltersData] = useState({});
    const [innerFilters, setInnerFilters] = useState({});
    const drawerPaperStyle = {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        backgroundColor: 'transparent'
    };


    useEffect(() => {

        const countByFontStyle = data.reduce((acc, curr) => {
            acc[curr.fontStyle] = (acc[curr.fontStyle] || 0) + 1;
            return acc;
        }, {});

        const countByDecade = data.reduce((acc, curr) => {
            const decade = Math.floor(curr.year / 10) * 10; // Arrotonda l'anno alla decade precedente
            acc[decade] = (acc[decade] || 0) + 1;
            return acc;
        }, {});

        const countByGenre = data.reduce((acc, curr) => {
            acc[curr.genre] = (acc[curr.genre] || 0) + 1;
            return acc;
        }, {});

        const countByCountry = data.reduce((acc, curr) => {
            acc[curr.country] = (acc[curr.country] || 0) + 1;
            return acc;
        }, {});




        const fData = {
            classifications: countByFontStyle,
            decade: countByDecade,
            genres: countByGenre,
            countries: countByCountry

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
        for (const category in innerFilters) {
            // Verifica se il valore della categoria corrente è un oggetto
            if (typeof innerFilters[category] === 'object') {
                // Cicla attraverso ogni chiave all'interno della categoria corrente
                for (const key in innerFilters[category]) {
                    // Se il valore della chiave corrente è true e la categoria è 'decade'
                    if (innerFilters[category][key] === true && category === 'decade') {
                        // Estrai l'inizio e la fine della decade
                        const decadeStart = parseInt(key.substring(0, 3) + '0');
                        const decadeEnd = decadeStart + 9;

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

    //transitionDuration={{ enter: 500, exit: 1000 }}
    return (
        <>
            <Drawer style={{ width: '100%' }} sx={{
                '& .MuiDrawer-paper': drawerPaperStyle,
            }} anchor='bottom' onClose={() => { setOpenFilters(false) }} open={open}>
                <div style={{ backgroundColor: '#1E1E1E', overflow: 'hidden', width: '100%', height: '100%', padding: '24px', color: '#ECECEC' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                        <p className='p-regular'>Filter</p>
                    </div>
                    <div style={{ overflowY: 'auto', height: 'calc(100% - 110px)', display: 'flex' }}>
                        <div style={{ width: '50%' }}>
                            <div style={{ marginBottom: '40px' }} >
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Font style</p>
                                <div className='chip-container'>
                                    {(filtersData.classifications) && Object.entries(filtersData.classifications).map(([font, count]) => {
                                        console.log(innerFilters['classifications'][font]); return (
                                            <Chip key={font} text={font} />
                                        )
                                    })}


                                </div>


                            </div>
                            <div style={{ marginBottom: '40px' }} >
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Film period</p>
                                <div className='chip-container'>
                                    {filtersData.decade && Object.entries(filtersData.decade).map(([year, count]) => (
                                        <Chip key={year} text={year} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '50%' }}>
                            <div style={{ marginBottom: '40px' }} >
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Film genre</p>
                                <div className='chip-container'>
                                    {filtersData.genres && Object.entries(filtersData.genres).map(([genre, count]) => (
                                        <Chip key={genre} text={genre} />
                                    ))}
                                </div>


                            </div>
                            <div style={{ marginBottom: '40px' }} >
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Country</p>
                                <div className='chip-container'>
                                    {filtersData.countries && Object.entries(filtersData.countries).map(([country, count]) => (
                                        <Chip key={country} text={country} />
                                    ))}
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </Drawer>





        </>
    );
}


export default FilterDrawer
