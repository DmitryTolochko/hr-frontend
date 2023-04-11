import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';
import FiltersPanel from '../components/FiltersPanel';

const BoardOfVacancies = () => {
    return (
        <div className='board-of-vacancies'>
            <FiltersPanel/>
            <div className='board'>
                <SearchString width='703px'/>
                <VacancyCard animatedClass='animated-card'/>
                <VacancyCard animatedClass='animated-card'/>
                <VacancyCard animatedClass='animated-card'/>
                <VacancyCard animatedClass='animated-card'/>
                <VacancyCard animatedClass='animated-card'/>
            </div>
        </div>
    );
};

export default BoardOfVacancies ;
