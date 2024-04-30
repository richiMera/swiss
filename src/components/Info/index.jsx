
import React, { useEffect, useState } from 'react';
import './style.css';




const Info = ({ isMobile }) => {





    return (
        <div className='info-container'>
            <p className='p-small' style={{ color: '#0D0D0D', padding: '40px', paddingBottom: isMobile ? '100px' : '' }}>All material for educational and non-profit purposes only. Any copyright material mirrored on this site is intended for private personal study. All original photographs and articles are copyright to their respective owners. Copyright owners may, if they wish, request to have material removed by leaving a comment on the relevant page. The materials archived, stored, and presented here, are copyrighted by their respective contributors, and may not be saved, re-transmitted, republished, or reformatted by any means, electronic or mechanical. This site offers broad public access to these materials exclusively as a contribution to education and scholarship, and for the private, non-profit use of the academic community.</p>
        </div>
    );
}


export default Info



