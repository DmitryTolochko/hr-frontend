import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';
import FiltersPanel from '../components/FiltersPanel';
import axios from 'axios'
import Loader from '../components/Loader';

class FeaturedVacancies extends React.Component {
    constructor(props) {
        super(props)
        this.loading = true;
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
            this.loading = false;
        })
    }

    render() {
        return (
            <div className='board-of-vacancies'>
                {/* <FiltersPanel/> */}
                <div className='board'>
                    <SearchString width='703px'/>
                    <div className='loader-wrapper'>
                        <Loader isLoading={this.loading}/>
                        {!this.loading && <p>Нет избранных вакансий :(</p>}
                    </div>
                    {/* <VacancyCard animatedClass='animated-card'/> */}
                </div>
            </div>
        );
    }
};

export default FeaturedVacancies;
