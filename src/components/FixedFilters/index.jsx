
import React, { useEffect, useState } from 'react';
import './style.css';
import { motion } from 'framer-motion';





const FixedFilters = ({ children, isMobile }) => {
    const variantsL = {
        open: {
            opacity: 1, y: '0', transition: {
                delay: 1,
                type: "tween",
                duration: 0.5,
            }
        },

    }

    return (
        <motion.div initial={{ opacity: '0', y: '50px' }} animate={"open"}
            variants={variantsL} style={{ bottom: isMobile ? '16px' : '', overflowX: isMobile ? 'scroll' : '', justifyContent: isMobile ? 'flex-start' : '', padding: isMobile ? '0 16px' : '' }} className='fixed-end-filter'>


            {children}


        </motion.div>
    );
}


export default FixedFilters



