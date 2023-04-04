import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';
import FiltersPanel from '../components/FiltersPanel';

const FeaturedVacancies= () => {
    return (
        <div className='board-of-vacancies'>
            <FiltersPanel/>
            <div className='board'>
                <SearchString width='703px'/>
                <VacancyCard/>
                <VacancyCard/>
                <VacancyCard/>
            </div>
        </div>
    );
};

export default FeaturedVacancies;
