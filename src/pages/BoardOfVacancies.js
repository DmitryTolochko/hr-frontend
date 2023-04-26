import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';
import FiltersPanel from '../components/FiltersPanel';
import axios from 'axios'

export class BoardOfVacancies extends React.Component {
    constructor(props) {
        super(props)

        axios.get('http://89.108.103.70/api/Vacancy/get-all').then((response) => {
            this.setState({data: response.data.vacancyList})
        })

        this.state = {
            data: []
        }
        this.filterVacancies = this.filterVacancies.bind(this)
    }

    filterVacancies = (settings) => {
        axios.post('http://89.108.103.70/api/Vacancy/get-all-filter', {
            // containsQueryList: settings.containsQueryList,
            // equalsQueryList: settings.equalsQueryList,
            rangeQueryList: settings.rangeQueryList,
        }).then((response) => {
            this.setState({data: response.data.vacancyList})
        })
        console.log(this.state.data)
    }

    render() {
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel onFilterApplied={this.filterVacancies}/>
                <div className='board'>
                    <SearchString width='703px'/>
                    
                    {this.state.data.map((el) => (<div key={el.id}><VacancyCard animatedClass='animated-card' cardInfo={el} departmentId={el.departmentId}/></div>))}
                </div>
            </div>
        );
    }
};

export default BoardOfVacancies ;
