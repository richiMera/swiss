
import React, { useEffect, useState } from 'react';

import './style.css'
import { Drawer, Grid } from '@mui/material';
import Chip from '../Chip';






//seleziono e filtra, deseleziono e resetta, riseleziono e aggiunge i filtri a quelli prima


const FilterDrawer = ({ open, setOpenFilters, data, setFilteredData, isMobile, setNumberOfFilter, numberOfFilters }) => {

    const [filtersData, setFiltersData] = useState({});
    const [innerFilters, setInnerFilters] = useState({});
    const [clearAll, setClearAll] = useState(false);
    const [arrayFontStyle, setArrayFontStyle] = useState([]);
    const [arrayCountry, setArrayCountry] = useState([]);
    const [arrayGenres, setArrayGenres] = useState([]);
    const [selectedDecades, setSelectedDecades] = useState([]);

    function filterFilmsByAttributes(fontStyles, countries, genres, decades) {
        // Inizializza la lista filtrata con tutti i film
        let filteredFilms = data;
        const innerNumberOfFilters = fontStyles.length + countries.length + genres.length + decades.length;
        setNumberOfFilter(innerNumberOfFilters)


        // Applica i filtri incrementali
        if (fontStyles.length > 0) {
            filteredFilms = filteredFilms.filter(film => fontStyles.some(style => film.fontStyle.includes(style)));
        }
        if (countries.length > 0) {
            filteredFilms = filteredFilms.filter(film => countries.some(country => film.country.includes(country)));
        }
        if (genres.length > 0) {
            filteredFilms = filteredFilms.filter(film => genres.some(genre => film.genre.includes(genre)));
        }
        if (decades.length > 0) {
            filteredFilms = filteredFilms.filter(film => decades.some(decade => {
                const filmDecade = Math.floor(parseInt(film.year) / 10) * 10;
                return filmDecade.toString() === decade;
            }));
        }

        // Restituisci la lista filtrata
        return filteredFilms;
    }

    // Esempio di utilizzo


    // Aggiungi ulteriori filtri


    const drawerPaperStyle = {
        width: '100%',
        height: isMobile ? '90%' : 'auto',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        backgroundColor: 'transparent'
    };


    useEffect(() => {



        const countByFontStyle = data.reduce((acc, curr) => {
            curr.fontStyle.forEach(fontStyle => {
                acc[fontStyle] = (acc[fontStyle] || 0) + 1;
            });
            return acc;
        }, {});

        const countByDecade = data.reduce((acc, curr) => {
            const decade = Math.floor(curr.year / 10) * 10; // Arrotonda l'anno alla decade precedente
            acc[decade] = (acc[decade] || 0) + 1;
            return acc;
        }, {});


        const countByGenre = data.reduce((acc, curr) => {
            curr.genre.forEach(genre => {
                acc[genre] = (acc[genre] || 0) + 1;
            });
            return acc;
        }, {});



        const countByCountry = data.reduce((acc, curr) => {
            curr.country.forEach(country => {
                acc[country] = (acc[country] || 0) + 1;
            });
            return acc;
        }, {});

        const countByFontStyleSorted = Object.fromEntries(
            Object.entries(countByFontStyle).sort((a, b) => a[0].localeCompare(b[0]))
        );

        // Ordina countByDecade in ordine alfabetico
        const countByDecadeSorted = Object.fromEntries(
            Object.entries(countByDecade).sort((a, b) => a[0] - b[0])
        );

        // Ordina countByGenre in ordine alfabetico
        const countByGenreSorted = Object.fromEntries(
            Object.entries(countByGenre).sort((a, b) => a[0].localeCompare(b[0]))
        );

        // Ordina countByCountry in ordine alfabetico
        const countByCountrySorted = Object.fromEntries(
            Object.entries(countByCountry).sort((a, b) => a[0].localeCompare(b[0]))
        );



        const fData = {
            classifications: countByFontStyleSorted,
            decade: countByDecadeSorted,
            genres: countByGenreSorted,
            countries: countByCountrySorted

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



    const fillMyFilter = (type, value) => {
        let updatedFontStyle = [...arrayFontStyle];
        let updatedCountry = [...arrayCountry];
        let updatedGenres = [...arrayGenres];
        let updatedDecades = [...selectedDecades];
        switch (type) {
            case 'fontStyle':
                // Aggiungi o rimuovi il valore selezionato dall'array degli stili di carattere
                if (updatedFontStyle.includes(value)) {
                    updatedFontStyle = updatedFontStyle.filter(style => style !== value);
                } else {
                    updatedFontStyle.push(value);
                }
                break;
            case 'country':
                // Aggiungi o rimuovi il valore selezionato dall'array dei paesi
                if (updatedCountry.includes(value)) {
                    updatedCountry = updatedCountry.filter(country => country !== value);
                } else {
                    updatedCountry.push(value);
                }
                break;
            case 'genre':
                // Aggiungi o rimuovi il valore selezionato dall'array dei generi
                if (updatedGenres.includes(value)) {
                    updatedGenres = updatedGenres.filter(genre => genre !== value);
                } else {
                    updatedGenres.push(value);
                }
                break;
            case 'decade':
                // Aggiungi o rimuovi la decade selezionata dall'array delle decadi
                if (updatedDecades.includes(value)) {
                    updatedDecades = updatedDecades.filter(decade => decade !== value);
                } else {
                    updatedDecades.push(value);
                }
                break;
            default:
                break;
        }

        // Aggiorna gli array dei filtri
        setArrayFontStyle(updatedFontStyle);
        setArrayCountry(updatedCountry);
        setArrayGenres(updatedGenres);
        setSelectedDecades(updatedDecades);

        // Applica il filtro
        const filteredArray = filterFilmsByAttributes(updatedFontStyle, updatedCountry, updatedGenres, updatedDecades);
        setFilteredData(filteredArray);

    }
    const clearFilter = () => {


        // Aggiorna gli array dei filtri
        setArrayFontStyle([]);
        setArrayCountry([]);
        setArrayGenres([]);
        setSelectedDecades([]);
        setNumberOfFilter(0);

        setFilteredData(data);

    }






    // const [scrollPosition, setScrollPosition] = useState(0);
    // useEffect(() => {
    //     // Cleanup function to reset transformation when component unmounts or item becomes null

    //     if (open) {
    //         setScrollPosition(window.scrollY);
    //         document.body.style.position = 'fixed';
    //         document.body.style.top = `-${scrollPosition}px`;
    //     } else {
    //         document.body.style.position = '';
    //         document.body.style.top = '';
    //         window.scrollTo(0, scrollPosition);

    //     }



    // }, [open]);



    //fare filtro || su stesso type, am && con altri type




    //transitionDuration={{ enter: 500, exit: 1000 }}
    return (
        <>
            <Drawer style={{ width: '100%' }} sx={{
                '& .MuiDrawer-paper': drawerPaperStyle,
            }} anchor={'bottom'} onClose={() => { setOpenFilters(false) }} open={open}>
                <div style={{ backgroundColor: '#1E1E1E', overflow: 'hidden', width: '100%', height: '100%', padding: isMobile ? '0' : '24px 24px 160px 24px', color: '#ECECEC' }}>

                    <div style={{ overflowY: 'auto', height: 'calc(100% - 1px)', padding: isMobile ? '24px' : '0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>

                            <div style={{ display: 'flex', gap: '24px' }}>
                                <p onClick={() => { setOpenFilters(false) }} className='p-regular'>Filter {numberOfFilters > 0 && '(' + numberOfFilters + ')'}</p>
                                {numberOfFilters > 0 && <p className='p-regular' onClick={() => { clearFilter() }} style={{ cursor: 'pointer' }}>Reset</p>}
                            </div>
                            <div style={{ display: 'flex', gap: '24px' }}>
                                <p className='p-regular' style={{ cursor: 'pointer' }} onClick={() => { setOpenFilters(false) }} > Close</p>
                            </div>

                        </div>
                        <Grid container>
                            <Grid xs={12} md={6} item>
                                <div style={{ marginBottom: '40px' }} >
                                    <p style={{ marginBottom: '16px' }} className='p-regular'>Font style</p>
                                    <div className='chip-container'>
                                        {(filtersData.classifications) && Object.entries(filtersData.classifications).map(([font, count]) => {
                                            return (
                                                <Chip isSelected={arrayFontStyle.includes(font)} onClick={() => { fillMyFilter('fontStyle', font) }} key={font} text={font} />
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
                                            <Chip isSelected={arrayGenres.includes(genre)} onClick={() => { fillMyFilter('genre', genre) }} key={genre} text={genre} />
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
                                            <Chip isSelected={selectedDecades.includes(year)} onClick={() => fillMyFilter('decade', year)} key={year} text={year + 's'} />
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={12} md={6} item>
                                <p style={{ marginBottom: '16px' }} className='p-regular'>Country</p>
                                <div className='chip-container'>
                                    {filtersData.countries && Object.entries(filtersData.countries).map(([country, count]) => (
                                        <Chip isSelected={arrayCountry.includes(country)} onClick={() => { fillMyFilter('country', country) }} key={country} text={country} />
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
