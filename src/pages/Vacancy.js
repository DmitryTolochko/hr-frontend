import React from 'react';
import VacancyCard from '../components/VacancyCard';
import VacancyDescription from '../components/VacancyDescription';
import { Link } from 'react-router-dom';

class Vacancy extends React.Component {
    render () {
        return (
            <div className='vacancy'>
                <a><img src={require('../components/images/arrow.svg').default}></img><Link to="/BoardOfVacancies">Назад</Link></a>
                <VacancyCard/>
                <VacancyDescription/>
            </div>
        )
    }
}

export default Vacancy;