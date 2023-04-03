import React from 'react';

const VacancyCard = () => {
    return (
        <div className='vacancy-card'>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1>Frontend-разработчик</h1>
                    <h2>40 000 - 60 000 руб.</h2>
                </span>
                <a><img src={require('./images/star-1.svg').default} alt='star'></img></a>
            </div>
            
            <p className='location'>Екатеринбург</p>
            <div className='second-half'>
                <p className='department'>IT-департамент</p>
                <button className='respond-button'>Откликнуться</button>
            </div>
        </div>
    );
};

export default VacancyCard;
