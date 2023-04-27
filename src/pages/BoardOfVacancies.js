import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';
import FiltersPanel from '../components/FiltersPanel';
import axios from 'axios'

export class BoardOfVacancies extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vacancies: [],
            options: {
                containsQueryList: [],
                equalsQueryList: [],
                rangeQueryList: []
            }
        }
        this.getVacancies();
        this.stateUpdater = this.stateUpdater.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.options !== prevState.options) {
            this.getVacancies(this.state.options);
        }
    }

    stateUpdater(newRangeQueryList) {
        this.setState({
            options: {
                containsQueryList: [],
                equalsQueryList: [],
                rangeQueryList: newRangeQueryList,
            }
        })
    }

    getVacancies(settings = {}) {
        axios.post('http://89.108.103.70/api/Vacancy/get-all-filter', {
            rangeQueryList: settings.rangeQueryList ?? [],
        }).then((response) => {
            this.setState({vacancies: response.data.filteredVacancyList})
        })
    }

    render() {
        if (!this.state.vacancies.length) {
            return;
        }
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel stateUpdater={this.stateUpdater} options={this.state.options}/>
                <div className='board'>
                    <SearchString width='703px'/>
                    {this.state.vacancies.map((el) => (<div key={el.id}><VacancyCard animatedClass='animated-card' cardInfo={el} departmentId={el.departmentId}/></div>))}
                </div>
            </div>
        );
    }
};

export default BoardOfVacancies ;
