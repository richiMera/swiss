
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css';
import closeSvg from '../../assets/close.svg';
import { isMobile } from 'react-device-detect';



const Card = ({ item, width, isMobile }) => {

    const [divWidthPx, setDivWidthPx] = useState(0);
    const [divPercentage, setDivPercentage] = useState(0);
    const [xs, setXs] = useState(4);
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setPosition({ x: event.clientX, y: event.clientY + window.scrollY }); // Aggiungi lo scrollY
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };

    }, []);




    useEffect(() => {
        // Calcola la larghezza del div in pixel basandosi sulla larghezza della viewport
        const viewportWidth = window.innerWidth;
        const divWidthPercentage = divPercentage; // 33% della viewport
        const divWidthInPx = (viewportWidth * divWidthPercentage) / 100;

        // Imposta lo stato con la larghezza calcolata in pixel
        setDivWidthPx(divWidthInPx);

        // Aggiungi un listener per aggiornare la larghezza del div quando la finestra viene ridimensionata
        const handleResize = () => {
            const newViewportWidth = window.innerWidth;
            const newDivWidthInPx = (newViewportWidth * divWidthPercentage) / 100;
            setDivWidthPx(newDivWidthInPx);
        };
        window.addEventListener('resize', handleResize);

        // Pulisci il listener dell'evento quando il componente viene smontato
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [divPercentage]);

    useEffect(() => {
        if (width === 1) {
            setXs(2)
            setDivPercentage(20)

        }
        if (width === 2) {
            setXs(3)
            setDivPercentage(25)
        }
        if (width === 3) {
            setXs(4)
            setDivPercentage(33)
        }
        if (width === 4) {
            setXs(6)
            setDivPercentage(50)
        }
        if (width === 5) {
            setXs(12)
            setDivPercentage(100)
        }
    }, [width]);


    useEffect(() => {

        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''; // Ripristina lo scroll
        }

    }, [open]);




    return (
        <>
            {isHovered && <div
                style={{
                    position: 'absolute',
                    left: position.x - 10, // Posiziona il div al centro del cursore
                    top: position.y + 30,
                    padding: '10px 16px',
                    borderRadius: '30px',
                    zIndex: '200',
                    color: '#ECECEC',
                    backgroundColor: '#E72A00',
                    transition: 'all 0.2 ease',
                    fontWeight: '200',
                    pointerEvents: 'none',
                    display: 'inline-block', // Utilizzato per mantenere il div nella stessa riga del testo
                }}
            >
                More
            </div>}
            <Grid onMouseEnter={() => { setIsHovered(true) }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => { setOpen(true) }}
                style={{ position: open ? 'fixed' : '', top: open ? '0%' : '', left: '0', cursor: 'pointer', maxWidth: open ? '100%' : '', height: open ? '100vh' : '', zIndex: open ? '70000' : '', width: open ? '100%' : '' }} item xs={xs}>
                <div style={{ outline: '1px solid #272727', backgroundColor: isHovered || open ? item.bgColor : '#0D0D0D', width: open ? '100%' : '', zIndex: open ? '6000' : '', height: open ? '100vh' : divWidthPx / 1.85 + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10% 12%', position: 'relative', overflow: 'hidden', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '20%' : '' }} >
                    {open && <div onClick={(e) => { e.stopPropagation(); setOpen(false); setIsHovered(false); }} style={{ zIndex: '6000', position: 'absolute', top: isMobile ? '80%' : '24px', right: isMobile ? '' : '24px', left: isMobile ? '50%' : '', transform: isMobile ? 'translateX(-50%)' : '', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <img src={closeSvg} />
                    </div>}
                    <img style={{ transform: isHovered && !open ? 'scale(0.95)' : 'scale(1)', width: '100%', filter: isHovered || open ? item?.filter : '', transition: 'transform 0.5s' }} src={item.img} />
                    {!open ? <div style={{ position: 'absolute', bottom: isHovered ? '16px' : '-50px', left: '24px', transition: 'bottom 0.5s' }}>
                        <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Typeface</p>
                        <p className='p-small' style={{ color: item?.textColor }}>{item?.typeface}</p>
                    </div> : !isMobile ? <div style={{ position: 'absolute', bottom: '24px', left: '50%', transition: 'bottom 0.5s', transform: 'translateX(-50%)', display: 'flex', gap: '3%', justifyContent: 'center', width: '200%' }}>
                        <div>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Typeface</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.typeface}</p>
                        </div>
                        <div>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Title Designer / Studio</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.designer}</p>
                        </div>
                        <div>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Film Director</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.film_director}</p>
                        </div>
                        <div>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Year</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.year}</p>
                        </div>
                        <div>
                            <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Genre</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.genre}</p>
                        </div>
                        <div>
                            <p className='p-smalls' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Country</p>
                            <p className='p-big' style={{ color: item?.textColor }}>{item?.country}</p>
                        </div>
                    </div> : <Grid container>
                        <Grid item container xs={6}>
                            <Grid item xs={12}>
                                <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Typeface</p>
                                <p className='p-big' style={{ color: item?.textColor }}>{item?.typeface}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Title Designer / Studio</p>
                                <p className='p-big' style={{ color: item?.textColor }}>{item?.designer}</p>
                            </Grid>
                        </Grid>
                        <Grid item container xs={6}>
                            <Grid item xs={12}>
                                <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Film Director</p>
                                <p className='p-big' style={{ color: item?.textColor }}>{item?.film_director}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Year</p>
                                <p className='p-big' style={{ color: item?.textColor }}>{item?.year}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className='p-small' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Genre</p>
                                <p className='p-big' style={{ color: item?.textColor }}>{item?.genre}</p>
                            </Grid>
                            <Grid item xs={12}>
                                <p className='p-smalls' style={{ opacity: '0.5', marginBottom: '4px', color: item?.textColor }}>Country</p>
                                <p className='p-big' style={{ color: item?.textColor }}>{item?.country}</p>
                            </Grid>

                        </Grid>
                    </Grid>

                    }
                </div>

                {/* <div style={{ color: darkMode ? '#ECECEC' : '' }}>
                    <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                        <p className='p-small'>Typeface</p>
                        <p className='p-small'>{item.typeface}</p>
                    </div>
                    <div id={'more-info-box'} className={moreInfo ? 'open' : ''}>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Title designer</p>
                            <p className='p-small'>{item.designer}</p>
                        </div>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Film Director</p>
                            <p className='p-small'>{item.film_director}</p>
                        </div>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Year</p>
                            <p className='p-small'>{item.year}</p>
                        </div>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Genre</p>
                            <p className='p-small'>{item.genre}</p>
                        </div>
                        <div style={{ borderBottom: darkMode ? '1px solid rgba(236, 236, 236, 0.16)' : '' }} className='card-info-box' >
                            <p className='p-small'>Country</p>
                            <p className='p-small'>{item.country}</p>
                        </div>

                    </div>

                </div> */}

            </Grid >





        </>
    );
}


export default Card
