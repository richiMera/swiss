
import React, { useEffect, useState } from 'react';




const Chip = ({ text, onClick }) => {


    const [selected, setSelected] = useState(false);

    return (
        <>
            <div onClick={() => { setSelected(true); onClick }} className={selected ? 'filter-chip selected' : 'filter-chip'}>
                <p>{text} {selected && <span onClick={(e) => { e.stopPropagation(); setSelected(false) }}>X</span>}</p>
            </div>

        </>
    );
}


export default Chip
