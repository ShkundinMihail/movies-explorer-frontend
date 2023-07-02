import React from 'react';
import './InfoToolTip.css';

const InfoToolTip = ({ infoToolTipVisible, messageText }) => {
    return (
        <div className={`info-tool-tip ${infoToolTipVisible ? 'info-tool-tip_opened' : ''}`}>
            <div className='info-tool-tip__container'>
                <h2 className='info-tool-tip__title'>{messageText}</h2>
            </div>
        </div>
    )
};

export default InfoToolTip;