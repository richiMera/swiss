
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css';
import Info from '../Info';




const Header = ({ isMobile, openFilters }) => {

    const [openInfo, setOpenInfo] = useState(false);
    useEffect(() => {

        if (openInfo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''; // Ripristina lo scroll
        }

    }, [openInfo]);


    return (
        <header style={{ marginBottom: isMobile ? '0' : '' }}>
            <Grid padding={{ width: '100%', marginTop: '0', marginLeft: '0', position: 'relative', zIndex: openFilters ? '' : '7000' }} container >
                <Grid style={{ paddingLeft: '0' }} item xs={!isMobile ? 4 : 6}>
                    <div>
                        <h1 style={{ fontWeight: '200' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema<span style={{ color: openInfo ? '#0D0D0D' : '#E72A00', fontWeight: '400' }}>Typography</span></h1>

                    </div>
                </Grid >
                {!isMobile && <Grid item xs={6}>

                    <p style={{ opacity: openInfo ? '' : ' 0.64', fontSize: openInfo ? '40px' : '', marginBottom: openInfo ? '56px' : '', lineHeight: openInfo ? '120%' : '' }} className='p-regular'>{openInfo ? 'Lorem ipsum dolor sit amet consectetur. Sit nisl ipsum aliquet condimentum amet elementum sagittis ac. Purus potenti tincidunt consectetur vitae sed proin. Neque sed orci sed lectus vulputate luctus. Laoreet aliquet massa phasellus ut tincidunt.' : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium'} </p>
                    {openInfo && <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '125px' }}>
                            <p style={{ opacity: '0.8' }} className='p-small'>Design</p>
                            <p className='p-big'>andrea dominici</p>
                            <p className='p-big'>andreadominici.com</p>
                        </div>
                        <div>
                            <p style={{ opacity: '0.8' }} className='p-small'>Web development</p>
                            <p className='p-big'>riccardo ferrari</p>
                        </div>
                    </div>}
                </Grid >}
                <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={!isMobile ? 2 : 6}>
                    <p onClick={() => { setOpenInfo(!openInfo) }} style={{ opacity: openInfo ? '' : ' 0.64' }} className='p-regular pointer hover-transition'>{openInfo ? 'Close' : 'Info'}</p>

                </Grid >
                {isMobile && <Grid item xs={12}>

                    <p style={{ opacity: openInfo ? '' : ' 0.64', fontSize: '24px', padding: '56px 0 51px 0' }} className='p-regular'>{openInfo ? 'Lorem ipsum dolor sit amet consectetur. Sit nisl ipsum aliquet condimentum amet elementum sagittis ac. Purus potenti tincidunt consectetur vitae sed proin. Neque sed orci sed lectus vulputate luctus. Laoreet aliquet massa phasellus ut tincidunt.' : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium'} </p>
                    {openInfo && <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '55px' }}>
                            <p style={{ opacity: '0.8' }} className='p-small'>Design</p>
                            <p className='p-big'>andrea dominici</p>
                            <p className='p-big'>andreadominici.com</p>
                        </div>
                        <div>
                            <p style={{ opacity: '0.8' }} className='p-small'>Web development</p>
                            <p className='p-big'>riccardo ferrari</p>
                        </div>
                    </div>}
                </Grid >}
            </Grid>
            {openInfo && <Info isMobile={isMobile} />}




        </header >
    );
}


export default Header
