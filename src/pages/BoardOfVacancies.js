import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';
import FiltersPanel from '../components/FiltersPanel';
import axios from 'axios'

export class BoardOfVacancies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getVacancies();
    }

    getVacancies(settings = {}) {
        axios.post('http://89.108.103.70/api/Vacancy/get-all-filter', {
            rangeQueryList: settings.rangeQueryList ?? [],
        }).then((response) => {
            this.setState({data: response.data.filteredVacancyList})
        })
    }

    render() {
        if (!this.state.data.length) {
            return;
        }
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel onFilterApplied={this.getVacancies.bind(this)}/>
                <div className='board'>
                    <SearchString width='703px'/>
                    
                    {this.state.data.map((el) => (<div key={el.id}><VacancyCard animatedClass='animated-card' cardInfo={el} departmentId={el.departmentId}/></div>))}
                </div>
            </div>
        );
    }
};

export default BoardOfVacancies ;
