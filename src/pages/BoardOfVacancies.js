import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCard from '../components/VacancyCard';
import FiltersPanel from '../components/FiltersPanel';
import Loader from '../components/Loader';
import axios from 'axios'

export class BoardOfVacancies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            vacancies: [],
            copyVacancies: [],
            featuredVacancies: [],
            isAuthorized: false,
            options: JSON.parse(localStorage.getItem('FILTER_OPTIONS')) ?? {}
        }
        if (localStorage.getItem('user') !== null) {
            this.refreshToken();
        }
        document.title = 'Доска вакансий Intra'
        this.loading = true;
        this.getVacancies(this.state.options);
        this.stateUpdater = this.stateUpdater.bind(this)
        this.searchVacancy = this.searchVacancy.bind(this)
    }

    async refreshToken() {
        if (localStorage.getItem('tokens') !== null) {
            let date = new Date(JSON.parse(localStorage.getItem('tokens')).expirationTime)
            let now = new Date();
            let diffInMinutes = Math.floor((date - now) / 60000);
            if (diffInMinutes <= 5) {
                await axios.post('http://89.108.103.70/api/Auth/update-token', {
                    'accessToken': JSON.parse(localStorage.getItem('tokens')).accessToken,
                    'refreshToken': JSON.parse(localStorage.getItem('tokens')).refreshToken,
                })
                .then((response) => {
                    localStorage.setItem('tokens',JSON.stringify(response.data))
                })
                .catch( function (error) {
                    if (error.response) {
                        localStorage.removeItem('tokens')
                        localStorage.removeItem('user')
                        localStorage.removeItem('role')
                        window.location.replace("/Login")
                    }
                })
            }
        } 
        else {
            window.location.replace("/Login")
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.options !== prevState.options) {
            localStorage.setItem('FILTER_OPTIONS', JSON.stringify(this.state.options))
            this.getVacancies(this.state.options);
        }
    }

    componentWillUnmount() {
        localStorage.removeItem('FILTER_OPTIONS');
        localStorage.removeItem('FILTERS');
    }

    async stateUpdater(newOptions) {
        if (localStorage.getItem('user') !== null) {
            await this.refreshToken();
        }
        this.loading = true;
        this.setState({
            options:  Object.assign({}, newOptions)
        })
    }

    async getVacancies(options = {}) {
        if (localStorage.getItem('user') !== null) {
            await axios.get('http://89.108.103.70/api/vacancy/favorite', {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
                },
            }).then((response) => {
                this.setState({featuredVacancies: response.data.vacancyList})
            })
            this.setState({isAuthorized: true})
        }

        await axios.post('http://89.108.103.70/api/Vacancy/get-all-filter', options)
            .then((response) => {
                this.setState({
                    vacancies: response.data.filteredVacancyList,
                    copyVacancies: response.data.filteredVacancyList
                })
                this.loading = false;
        })
    }

    searchVacancy(title) {
        this.loading = false;
        if (title !== null) {
            let newVacancies = this.state.copyVacancies.filter(el => el.title.includes(title))
            this.setState({vacancies: newVacancies})
        }
    }

    render() {
        if (!this.state.vacancies.length) {
            return (
                <div className='board-of-vacancies'>
                <FiltersPanel stateUpdater={this.stateUpdater} options={this.state.options}/>
                <div className='board'>
                    <SearchString/>
                    <div className='loader-wrapper'>
                        <Loader isLoading={this.loading}/>
                        {!this.loading && <p>Ничего не найдено :(</p>}
                    </div>
                </div>
            </div>
            );
        }
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel stateUpdater={this.stateUpdater} options={this.state.options}/>
                <div className='board'>
                    <SearchString method={this.searchVacancy}/>
                    {
                        this.loading && 
                        <div className='board__loader'>
                            <Loader isLoading={this.loading}/>
                        </div>
                    }
                    {this.state.vacancies.map((el) => (<VacancyCard key={el.id} isAuthorized={this.state.isAuthorized} animatedClass='animated-card' isFeatured={this.state.featuredVacancies.filter(vac => vac.id === el.id).length !== 0} cardInfo={el} departmentId={el.departmentId}/>))}
                </div>
            </div>
        );
    }
};

export default BoardOfVacancies ;
