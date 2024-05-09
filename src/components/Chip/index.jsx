
import React, { useEffect, useState } from 'react';
import closeXs from '../../assets/close-xs.svg'




const Chip = ({ text, onClick }) => {


    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        setSelected(!selected);
        if (onClick) {
            onClick(); // Chiamare la funzione onClick passata come props, se presente
        }
    };

    return (
        <>
            <div onClick={handleClick} className={selected ? 'filter-chip selected' : 'filter-chip'}>
                <p style={{ marginRight: selected ? '10px' : '', color: selected ? '#ececec' : '' }}>{text} </p>
                {selected && <img draggable={false} src={closeXs} />}
            </div>

        </>
    );
}


export default Chip
