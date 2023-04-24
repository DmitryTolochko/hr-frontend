import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';
import FiltersPanel from '../components/FiltersPanel';
import axios from 'axios'

class BoardOfVacancies extends React.Component {
    constructor(props) {
        super(props)

        axios.get('http://89.108.103.70/api/Vacancy/get-all').then((response) => {
            this.setState({data: response.data.vacancyList})
        })

        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel/>
                <div className='board'>
                    <SearchString width='703px'/>
                    
                    {this.state.data.map((el) => (<div key={el.id}><VacancyCard animatedClass='animated-card' cardInfo={el} departmentId={el.departmentId}/></div>))}
                </div>
            </div>
        );
    }
};

export default BoardOfVacancies ;
