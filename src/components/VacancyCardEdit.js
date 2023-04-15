import React from 'react';
import { Link } from 'react-router-dom';

const VacancyCardEdit = (props) => {
    return (
        <div className={`vacancy-card ${props.animatedClass}`}>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1><Link to="/Vacancy">Frontend-разработчик</Link></h1>
                    <h2>40 000 - 60 000 руб.</h2>
                </span>
                <a><img src={require('./images/trash.svg').default} alt='delete vacancy'></img></a>
            </div>
            
            <p className='location'>Екатеринбург</p>
            <div className='second-half'>
                <p className='department'>IT-департамент</p>
                <Link to="/VacancyEditor">
                    <button className='respond-button'>
                        <img src={require('./images/pencil.svg').default}></img>
                        Изменить
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default VacancyCardEdit;
