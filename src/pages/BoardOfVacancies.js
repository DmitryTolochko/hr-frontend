import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';

const BoardOfVacancies = () => {
    return (
        <div>
            <SearchString/>
            <VacancyCard/>
            <VacancyCard/>
            <VacancyCard/>
        </div>
    );
};

export default BoardOfVacancies ;
