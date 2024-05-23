
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from "framer-motion"


const Reveal = ({ children, width = 'fit-content' }) => {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });



    return (
        <div ref={ref} style={{ position: 'relative', overflow: '', width }}>
            <motion.div variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0 }
            }} initial={'hidden'} animate={'visible'} transition={{ duration: 1.5, ease: [0, 0.2, 0.2, 1], delay: 0.25 }} >
                {children}
            </motion.div>
        </div>
    );
}


export default Reveal




