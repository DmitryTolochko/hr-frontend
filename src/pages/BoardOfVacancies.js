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
            options: JSON.parse(localStorage.getItem('FILTER_OPTIONS')) ?? {}
        }
        this.getVacancies(this.state.options);
        this.stateUpdater = this.stateUpdater.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.options !== prevState.options) {
            console.log(this.state.options)
            localStorage.setItem('FILTER_OPTIONS', JSON.stringify(this.state.options))
            this.getVacancies(this.state.options);
        }
    }

    componentWillUnmount() {
        localStorage.removeItem('FILTER_OPTIONS');
        localStorage.removeItem('FILTERS');
    }

    stateUpdater(newOptions) {
        this.setState({
            options:  Object.assign({}, newOptions)
        })
    }

    getVacancies(options = {}) {
        axios.post('http://89.108.103.70/api/Vacancy/get-all-filter', options)
            .then((response) => {
                this.setState({vacancies: response.data.filteredVacancyList})
        })
    }

    render() {
        if (!this.state.vacancies.length) {
            return (
                <div className='board-of-vacancies'>
                <FiltersPanel stateUpdater={this.stateUpdater} options={this.state.options}/>
                <div className='board'>
                    <SearchString width='703px'/>
                    <div className='loader-wrapper'>
                        <div className='loader'></div>
                    </div>
                </div>
            </div>
            );
        }
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel stateUpdater={this.stateUpdater} options={this.state.options}/>
                <div className='board'>
                    <SearchString/>
                    {this.state.vacancies.map((el) => (<div key={el.id}><VacancyCard animatedClass='animated-card' cardInfo={el} departmentId={el.departmentId}/></div>))}
                </div>
            </div>
        );
    }
};

export default BoardOfVacancies ;
