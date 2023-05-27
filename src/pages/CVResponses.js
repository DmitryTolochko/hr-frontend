import React from 'react';
import SearchString from '../components/SearchString';
import FiltersPanel from '../components/FiltersPanel';
import CVCard from '../components/CVCard';
import CVResponse from '../components/CVResponse';

const CVResponses = () => {
    return (
        <div className='board-of-vacancies'>
            <div className='board'>
                <SearchString/>
                <CVResponse animatedClass='animated-card'/>
                <CVResponse animatedClass='animated-card'/>
                <CVResponse animatedClass='animated-card'/>
            </div>
        </div>
    );
};

export default CVResponses;
