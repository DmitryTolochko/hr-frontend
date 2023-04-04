import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCardEdit from '../components/VacancyCardEdit';

const MyVacancies = () => {
    return (
        <div>
            <div className='board'>
                <div className='search-box'>
                    <SearchString width='470px'/>
                    <button className='search-button'>Добавить</button>
                </div>
                <VacancyCardEdit/>
                <VacancyCardEdit/>
                <VacancyCardEdit/>
            </div>
        </div>
    );
};

export default MyVacancies;
