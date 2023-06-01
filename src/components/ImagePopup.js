import React from 'react';

const ImagePopup = ({card, onClose}) => {

    return (
    <div className={`popup popup_overlook ${ card && 'popup_opened'}`}>
        <div className="popup__wrapper">
            <button onClick={onClose} type="button"
                    className="popup__button popup__button_close popup__button_close-overlook"></button>
            <img src={card && card.link} alt={card?.name} className="popup__image"/>
            <p className="popup__name">{card?.name}</p>
        </div>
    </div>
    );
};

export default ImagePopup;