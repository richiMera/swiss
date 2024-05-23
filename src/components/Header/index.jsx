
import React from 'react';
import './style.css';
import { motion } from "framer-motion"
import questionMark from '../../assets/question-mark.svg'
import closeIcon from '../../assets/close-xs.svg'





const Header = ({ isMobile, openFilters, setIsOpenInfo, isOpenInfo }) => {




    return (
        // ANIMAZIONE allo scoll back
        // <div style={{ width: '100%', marginTop: '0', marginLeft: '0', zIndex: openFilters ? '' : '9001', display: 'flex', justifyContent: !isMobile ? 'center' : 'start', color: ' #ECECEC' }}>
        //     <motion.div initial="hidden" animate={scrollDirection === 'down' && !isOpenInfo ? "hidden" : "visible"} variants={variants} style={{ position: 'fixed', left: '16px', zIndex: '9001' }}>
        //         <h1 style={{ fontWeight: '200' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema<span style={{ color: isOpenInfo ? '#0D0D0D' : '#E72A00', fontWeight: '400' }}>Typography</span></h1>
        //     </motion.div>
        //     <motion.div initial="hidden" animate={scrollDirection === 'down' && !isOpenInfo ? "hidden" : "visible"} variants={variants} style={{ position: 'fixed', right: '16px', zIndex: '9001' }}>
        //         <p onClick={() => { setIsOpenInfo(!isOpenInfo) }} style={{ opacity: isOpenInfo ? '' : ' 0.64' }} className='p-regular pointer hover-transition'>{isOpenInfo ? 'Close' : 'Info'}</p>
        //     </motion.div>
        // </div>
        <div style={{ width: '100%', marginTop: '0', marginLeft: '0', zIndex: openFilters ? '' : '9001', display: 'flex', justifyContent: !isMobile ? 'center' : 'start', color: ' #ECECEC' }}>
            {/* {isOpenInfo && <motion.div initial="hidden" animate={"visible"} variants={variants} style={{ position: 'absolute', left: '16px', zIndex: '9001' }}>
                <h1 style={{ fontWeight: '200' }} onClick={() => { window.location.reload(); }} className='p-regular pointer'>Cinema<span style={{ color: isOpenInfo ? '#0D0D0D' : '#E72A00', fontWeight: '400' }}>Typography</span></h1>
            </motion.div>} */}
            <motion.div onClick={() => { setIsOpenInfo(!isOpenInfo) }} className='input-box hover-transition' variants={{
                hidden: { opacity: 0, y: 64 },
                visible: { opacity: 1, y: 0 }
            }} initial={'hidden'} animate={'visible'} transition={{ duration: 1.5, ease: [0, 0.2, 0.2, 1], delay: 0.25 }} style={{ position: 'fixed', right: '16px', bottom: '24px', width: '64px', height: '64px', zIndex: isOpenInfo ? '9000' : '1000', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                <img src={isOpenInfo ? closeIcon : questionMark} />
            </motion.div>
        </div>
    );
}


export default Header
