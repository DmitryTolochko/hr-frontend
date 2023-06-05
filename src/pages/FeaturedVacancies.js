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

        document.title = 'Избранные вакансии'
        this.getVacancies();
        this.getVacancies = this.getVacancies.bind(this)
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

    getVacancies() {
        axios.get('http://89.108.103.70/api/vacancy/favorite', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        }).then((response) => {
            this.setState({vacancies: response.data.vacancyList})
            this.loading = false;
        })
    }

    render() {
        if (this.state.vacancies.length === 0) {
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
        return (
            <div className='board-of-vacancies'>
                {/* <FiltersPanel/> */}
                <div className='board'>
                    <SearchString width='703px'/>
                    <div className='loader-wrapper'>
                        <Loader isLoading={this.loading}/>
                        {this.state.vacancies?.map((el) => (<VacancyCard key={el.id} isFeatured={true} cardInfo={el} departmentId={el.departmentId} animatedClass='animated-card'/>))}
                    </div>
                    {/* <VacancyCard animatedClass='animated-card'/> */}
                </div>
            </div>
        );
    }
};

export default FeaturedVacancies;
