import React from 'react';
import PeoplecardwithPhoto from '../components/PeoplecardwithPhoto';
import CVcardCVPan from './CVcardCVPan';
import PeoplecardCVPan from '../components/PeoplecardCVPan';

const CVpan2 = () => {
    return (
        <div className='glavCV'>
            <div className='card_Cv'>
                <a href=''><text className='exitCV'><img src={require('./images/vector-left.svg').default} alt='exit'></img>&nbsp;Назад</text></a>
                <PeoplecardCVPan/>
                <CVcardCVPan/>
            </div>
            <PeoplecardwithPhoto/>
        </div>
    );
};
        
    export default CVpan2;