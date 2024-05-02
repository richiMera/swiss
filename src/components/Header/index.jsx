
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css';
import Info from '../Info';




const Header = ({ isMobile, openFilters, scrollDirection }) => {

    const [openInfo, setOpenInfo] = useState(false);

    // useEffect(() => {

    //     if (openInfo) {
    //         function preventDefault(event) {
    //             event.preventDefault();
    //         }
    //         window.addEventListener('wheel', preventDefault, { passive: false });
    //         // Aggiungi un gestore per l'evento touchmove
    //         window.addEventListener('touchmove', preventDefault, { passive: false });
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = ''; // Ripristina lo scroll
    //     }

    // }, [openInfo]);
    // console.log(scrollDirection);


    return (
        // <header style={{ marginBottom: isMobile ? '0' : '', height: isMobile && openInfo ? '100vh' : 'auto', position: isMobile && openInfo ? 'fixed' : 'fixed', zIndex: isMobile && openInfo ? '9000' : '9000', transition: 'all .3s ease', top: scrollDirection === 'down' ? '-120px' : '0' }}>
        //     <Grid padding={{ width: '100%', marginTop: '0', marginLeft: '0', position: 'relative', zIndex: openFilters ? '' : '7000' }} container >
        //         <Grid style={{ paddingLeft: '0' }} item xs={!isMobile ? 4 : 6}>
        //             <div>
        //                 <h1 style={{ fontWeight: '200' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema<span style={{ color: openInfo ? '#0D0D0D' : '#E72A00', fontWeight: '400' }}>Typography</span></h1>

        //             </div>
        //         </Grid >
        //         {!isMobile && <Grid item xs={6}>

        //             <p style={{ opacity: openInfo ? '' : ' 0.64', fontSize: openInfo ? '40px' : '', marginBottom: openInfo ? '56px' : '', lineHeight: openInfo ? '120%' : '' }} className='p-regular'>{openInfo ? 'Lorem ipsum dolor sit amet consectetur. Sit nisl ipsum aliquet condimentum amet elementum sagittis ac. Purus potenti tincidunt consectetur vitae sed proin. Neque sed orci sed lectus vulputate luctus. Laoreet aliquet massa phasellus ut tincidunt.' : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium'} </p>
        //             {openInfo && <div style={{ display: 'flex' }}>
        //                 <div style={{ marginRight: '125px' }}>
        //                     <p style={{ opacity: '0.8' }} className='p-small'>Design</p>
        //                     <p className='p-big'>andrea dominici</p>
        //                     <p className='p-big'>andreadominici.com</p>
        //                 </div>
        //                 <div>
        //                     <p style={{ opacity: '0.8' }} className='p-small'>Web development</p>
        //                     <p className='p-big'>riccardo ferrari</p>
        //                 </div>
        //             </div>}
        //         </Grid >}
        //         <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={!isMobile ? 2 : 6}>
        //             <p onClick={() => { setOpenInfo(!openInfo) }} style={{ opacity: openInfo ? '' : ' 0.64' }} className='p-regular pointer hover-transition'>{openInfo ? 'Close' : 'Info'}</p>

        //         </Grid >
        //         {isMobile && <Grid item xs={12}>

        //             <p style={{ opacity: openInfo ? '' : ' 0.64', fontSize: '24px', padding: '56px 0 51px 0', lineHeight: openInfo ? '120%' : '' }} className='p-regular'>{openInfo ? 'Lorem ipsum dolor sit amet consectetur. Sit nisl ipsum aliquet condimentum amet elementum sagittis ac. Purus potenti tincidunt consectetur vitae sed proin. Neque sed orci sed lectus vulputate luctus. Laoreet aliquet massa phasellus ut tincidunt.' : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium'} </p>
        //             {openInfo && <div style={{ display: 'flex' }}>
        //                 <div style={{ marginRight: '55px' }}>
        //                     <p style={{ opacity: '0.8' }} className='p-small'>Design</p>
        //                     <p className='p-big'>andrea dominici</p>
        //                     <p className='p-big'>andreadominici.com</p>
        //                 </div>
        //                 <div>
        //                     <p style={{ opacity: '0.8' }} className='p-small'>Web development</p>
        //                     <p className='p-big'>riccardo ferrari</p>
        //                 </div>
        //             </div>}
        //         </Grid >}
        //     </Grid>
        //     {openInfo && <Info isMobile={isMobile} />}




        // </header >

        <header >
            <div style={{ width: '100%', marginTop: '0', marginLeft: '0', position: 'relative', zIndex: openFilters ? '' : '9001', display: 'flex', justifyContent: !isMobile ? 'center' : 'start', paddingTop: isMobile ? '56px' : '' }}  >

                <div style={{ position: 'fixed', transition: 'all .3s ease', top: scrollDirection === 'down' && !openInfo ? '-120px' : '16px', left: '16px', zIndex: '9001' }}>
                    <h1 style={{ fontWeight: '200' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema<span style={{ color: openInfo ? '#0D0D0D' : '#E72A00', fontWeight: '400' }}>Typography</span></h1>

                </div>

                {!openInfo && <p style={{ opacity: '0.64' }} className='p-regular'>Lorem ipsum dolor sit amet consectetur.</p>}
                <div style={{ position: 'fixed', right: '16px', transition: 'all .3s ease', top: scrollDirection === 'down' && !openInfo ? '-120px' : '16px' }} >
                    <p onClick={() => { setOpenInfo(!openInfo) }} style={{ opacity: openInfo ? '' : ' 0.64' }} className='p-regular pointer hover-transition'>{openInfo ? 'Close' : 'Info'}</p>

                </div >
                {/* {isMobile && <Grid item xs={12}>

                    <p style={{ opacity: openInfo ? '' : ' 0.64', fontSize: '24px', padding: '56px 0 51px 0', lineHeight: openInfo ? '120%' : '' }} className='p-regular'>{openInfo ? 'Lorem ipsum dolor sit amet consectetur. Sit nisl ipsum aliquet condimentum amet elementum sagittis ac. Purus potenti tincidunt consectetur vitae sed proin. Neque sed orci sed lectus vulputate luctus. Laoreet aliquet massa phasellus ut tincidunt.' : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium'} </p>
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
                </Grid >} */}
            </div>
            {/* {openInfo && <Info isMobile={isMobile} />} */}
            <div style={{ height: !openInfo ? '0px' : '100vh', transition: 'all .5s ease-out', width: '100%', backgroundColor: '#E72A00', position: 'fixed', top: '0', left: '0', zIndex: '9000', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {openInfo && <>
                    <div style={{ paddingTop: isMobile ? '56px' : '', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                        <p style={{ opacity: openInfo ? '' : ' 0.64', fontSize: openInfo && !isMobile ? '40px' : '24px', marginBottom: openInfo ? '56px' : '', lineHeight: openInfo ? '120%' : '', width: isMobile ? '100%' : '60%', padding: '15px' }} className='p-regular'>{openInfo ? 'Lorem ipsum dolor sit amet consectetur. Sit nisl ipsum aliquet condimentum amet elementum sagittis ac. Purus potenti tincidunt consectetur vitae sed proin. Neque sed orci sed lectus vulputate luctus. Laoreet aliquet massa phasellus ut tincidunt.' : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi laudantium'} </p>
                        {openInfo && <div style={{ display: 'flex', width: isMobile ? '100%' : '60%', padding: '16px' }}>
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
                    </div >
                    <p className='p-small' style={{ color: '#0D0D0D', padding: '16px', paddingBottom: isMobile ? '100px' : '16px' }}>All material for educational and non-profit purposes only. Any copyright material mirrored on this site is intended for private personal study. All original photographs and articles are copyright to their respective owners. Copyright owners may, if they wish, request to have material removed by leaving a comment on the relevant page. The materials archived, stored, and presented here, are copyrighted by their respective contributors, and may not be saved, re-transmitted, republished, or reformatted by any means, electronic or mechanical. This site offers broad public access to these materials exclusively as a contribution to education and scholarship, and for the private, non-profit use of the academic community.</p>
                </>}
            </div>





        </header >
    );
}


export default Header
