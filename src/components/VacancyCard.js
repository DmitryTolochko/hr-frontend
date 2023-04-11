import React from 'react';
import { Link } from 'react-router-dom';

const VacancyCard = (props) => {
    return (
        <div className={`vacancy-card ${props.animatedClass}`}>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1><Link to="/Vacancy">Frontend-разработчик</Link></h1>
                    <h2>50 000 руб.</h2>
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
