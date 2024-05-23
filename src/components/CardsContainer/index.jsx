
import React, { useEffect, useState, useRef } from 'react';
import Reveal from '../Reveal';




const CardContainer = ({ children, isHovered, font }) => {


    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const contentRef = useRef(null);

    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };


    return (
        <div style={{ height: '100%' }} onMouseMove={handleMouseMove}>
            {isHovered && <div
                style={{
                    position: 'absolute',
                    left: position.x - 10 - (dimensions.width / 2) + window.scrollX, // Posiziona il div al centro del cursore
                    top: position.y + 30 + window.scrollY,
                    padding: '10px 16px',
                    borderRadius: '30px',
                    zIndex: '200',
                    color: '#E72A00',
                    backgroundColor: '#ECECEC',
                    // transition: 'all 0.1s ease-out',
                    fontWeight: '200',
                    pointerEvents: 'none',
                    display: 'inline-block', // Utilizzato per mantenere il div nella stessa riga del testo
                }}
                ref={contentRef}
            >
                Font: <span style={{ fontWeight: 'bold' }}>{font}</span>
            </div >}

            {children}



        </div>
    );
}


export default CardContainer
