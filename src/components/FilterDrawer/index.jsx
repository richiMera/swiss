
import React, { useEffect, useState } from 'react';

import './style.css'
import { Drawer, Grid } from '@mui/material';
import Chip from '../Chip';
import closeS from '../../assets/close-s.svg';








const FilterDrawer = ({ open, setOpenFilters, data, setFilteredData, isMobile }) => {

    const [filtersData, setFiltersData] = useState({});
    const [innerFilters, setInnerFilters] = useState({});
    const [clearAll, setClearAll] = useState(false);


    const drawerPaperStyle = {
        width: '100%',
        height: isMobile ? '90%' : 'auto',
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

    const [myFilter, setMyFilter] = useState([{
        type: 'fontStyle',
        values: [],
        data: []
    }, {
        type: 'dedace',
        values: [],
        data: []
    },
    {
        type: 'genre',
        values: [],
        data: []
    },
    {
        type: 'country',
        values: [],
        data: []
    }
    ]);

    // clicco du uno, si riempie a quel punto cerco tutti gli elementi che hanno quello, 
    console.log('myFilter', myFilter);
    const fillMyFilter = (type, value) => {
        const lozz = [...myFilter];

        const obj = lozz.find((f) => f.type === type);
        const filtered = data.filter((f) => f[type] === value);
        if (!obj.values.includes(value)) {
            obj.values.push(value);
            obj.data = [...obj.data, ...filtered];

        } else {
            obj.values = obj.values.filter((v) => v !== value);
        }
        setMyFilter(lozz);

    }

    Object.compare = function (obj1, obj2) {
        // Loop attraverso le proprietà dell'oggetto 1
        for (var p in obj1) {
            // Verifica se la proprietà esiste in entrambi gli oggetti
            if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

            // Confronta il tipo di proprietà
            switch (typeof (obj1[p])) {
                // Confronto profondo degli oggetti
                case 'object':
                    if (!Object.compare(obj1[p], obj2[p])) return false;
                    break;
                // Confronto del codice della funzione
                case 'function':
                    if (typeof (obj2[p]) == 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false;
                    break;
                // Confronto dei valori
                default:
                    if (obj1[p] !== obj2[p]) return false;
            }
        }

        // Verifica se ci sono proprietà extra nell'oggetto 2
        for (var p in obj2) {
            if (typeof (obj1[p]) === 'undefined') return false;
        }
        return true;
    };

    useEffect(() => {

        let count = 0;

        for (const item of myFilter) {
            if (item.values.length > 0) {
                count++;
            }
        }

        if (count >= 2) {

            console.log("Almeno due values.length sono maggiori di 0");


            const allDataObjects = [];

            // Concateniamo tutti gli oggetti presenti negli array data
            for (const item of myFilter) {
                allDataObjects.push(...item.data);
            }

            console.log('filteredMyFilterALL', allDataObjects);
            // Filtriamo gli oggetti identici
            const filteredIdenticalObjects = allDataObjects.filter((obj, index, self) => {
                // Cerchiamo se ci sono altri oggetti identici a quello corrente
                return self.findIndex((o) => Object.compare(o, obj)) !== index;
            });

            if (filteredIdenticalObjects.length === 0) {
                // Se non ci sono duplicati, restituisci un array vuoto

                setFilteredData([]);
                return [];
            } else {
                // Altrimenti, restituisci l'array di oggetti duplicati

                setFilteredData(filteredIdenticalObjects);

            }







        } else if (count === 1) {
            console.log("Solo uno values.length è maggiore di 0");
            const allDataObjects = [];
            for (const item of myFilter) {
                allDataObjects.push(...item.data);
            }
            setFilteredData(allDataObjects);
            setClearAll(true);
        } else {
            console.log("Nessun values.length è maggiore di 0");
            setFilteredData(data);
            setClearAll(false);
        }


    }, [myFilter]);

    //fare filtro || su stesso type, am && con altri type




    //transitionDuration={{ enter: 500, exit: 1000 }}
    return (
        <>
            <Drawer style={{ width: '100%' }} sx={{
                '& .MuiDrawer-paper': drawerPaperStyle,
            }} anchor={'bottom'} onClose={() => { setOpenFilters(false) }} open={open}>
                <div style={{ backgroundColor: '#1E1E1E', overflow: 'hidden', width: '100%', height: '100%', padding: isMobile ? '24px' : '24px 24px 160px 24px', color: '#ECECEC' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                        <p className='p-regular'>Filter</p>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <p style={{ opacity: !clearAll ? '0.16' : '1', cursor: 'pointer' }}> Clear all</p>
                            <p style={{ cursor: 'pointer' }} onClick={() => { setOpenFilters(false) }} > Close</p>
                        </div>

                    </div>
                    <div style={{ overflowY: 'auto', height: 'calc(100% - 30px)' }}>
                        <Grid container>
                            <Grid xs={12} md={6} item>
                                <div style={{ marginBottom: '40px' }} >
                                    <p style={{ marginBottom: '16px' }} className='p-regular'>Font style</p>
                                    <div className='chip-container'>
                                        {(filtersData.classifications) && Object.entries(filtersData.classifications).map(([font, count]) => {
                                            console.log(innerFilters['classifications'][font]); return (
                                                <Chip onClick={() => { fillMyFilter('fontStyle', font) }} key={font} text={font} />
                                            )
                                        })}


                                    </div>


                                </div>
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <div style={{ marginBottom: '40px' }} >
                                    <p style={{ marginBottom: '16px' }} className='p-regular'>Film genre</p>
                                    <div className='chip-container'>
                                        {filtersData.genres && Object.entries(filtersData.genres).map(([genre, count]) => (
                                            <Chip onClick={() => { fillMyFilter('genre', genre) }} key={genre} text={genre} />
                                        ))}
                                    </div>


                                </div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid xs={12} md={6} item>
                                <div style={{ marginBottom: '40px' }} >
                                    <p style={{ marginBottom: '16px' }} className='p-regular'>Film period</p>
                                    <div className='chip-container'>
                                        {filtersData.decade && Object.entries(filtersData.decade).map(([year, count]) => (
                                            <Chip key={year} text={year + 's'} />
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Country</p>
                                <div className='chip-container'>
                                    {filtersData.countries && Object.entries(filtersData.countries).map(([country, count]) => (
                                        <Chip onClick={() => { fillMyFilter('country', country) }} key={country} text={country} />
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
                        {/* <div style={{ width: isMobile ? '100%' : '50%' }}>
                            <div style={{ marginBottom: '40px' }} >
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Font style</p>
                                <div className='chip-container'>
                                    {(filtersData.classifications) && Object.entries(filtersData.classifications).map(([font, count]) => {
                                        console.log(innerFilters['classifications'][font]); return (
                                            <Chip onClick={() => { fillMyFilter('fontStyle', font) }} key={font} text={font} />
                                        )
                                    })}


                                </div>


                            </div>
                            <div style={{ marginBottom: '40px' }} >
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Film period</p>
                                <div className='chip-container'>
                                    {filtersData.decade && Object.entries(filtersData.decade).map(([year, count]) => (
                                        <Chip key={year} text={year + 's'} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: isMobile ? '100%' : '50%' }}>
                            <div style={{ marginBottom: '40px' }} >
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Film genre</p>
                                <div className='chip-container'>
                                    {filtersData.genres && Object.entries(filtersData.genres).map(([genre, count]) => (
                                        <Chip onClick={() => { fillMyFilter('genre', genre) }} key={genre} text={genre} />
                                    ))}
                                </div>


                            </div>
                            <div style={{ marginBottom: '40px' }} >
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Country</p>
                                <div className='chip-container'>
                                    {filtersData.countries && Object.entries(filtersData.countries).map(([country, count]) => (
                                        <Chip onClick={() => { fillMyFilter('country', country) }} key={country} text={country} />
                                    ))}
                                </div>


                            </div>
                        </div> */}
                    </div>
                </div >
            </Drawer >





        </>
    );
}


export default FilterDrawer
