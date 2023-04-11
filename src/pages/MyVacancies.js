import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCardEdit from '../components/VacancyCardEdit';

const MyVacancies = () => {
    return (
        <div>
            <div className='board'>
                <div className='search-box'>
                    <SearchString width='470px'/>
                    <button className='search-button'>
                        <img src={require('../components/images/plus.svg').default} style={{width: "17px", height: "17px"}}></img>Добавить
                    </button>
                </div>
                <VacancyCardEdit animatedClass='animated-card'/>
                <VacancyCardEdit animatedClass='animated-card'/>
                <VacancyCardEdit animatedClass='animated-card'/>
            </div>
        </div>
    );
};

export default MyVacancies;
