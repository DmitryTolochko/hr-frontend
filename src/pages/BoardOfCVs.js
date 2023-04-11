import React from 'react';
import SearchString from '../components/SearchString';
import FiltersPanel from '../components/FiltersPanel';
import CVCard from '../components/CVCard';

const BoardOfCVs = () => {
    return (
        <div className='board-of-vacancies'>
            <FiltersPanel/>
            <div className='board'>
                <SearchString width='703px'/>
                <CVCard animatedClass='animated-card'/>
                <CVCard animatedClass='animated-card'/>
                <CVCard animatedClass='animated-card'/>
            </div>
        </div>
    );
};

export default BoardOfCVs;
