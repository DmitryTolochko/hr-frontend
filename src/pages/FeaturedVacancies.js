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
            copyVacancies: [],
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
        this.searchVacancy = this.searchVacancy.bind(this)
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

    async getVacancies() {
        await this.refreshToken()
        await axios.get('http://89.108.103.70/api/vacancy/favorite', {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        }).then((response) => {
            this.setState({
                vacancies: response.data.vacancyList,
                copyVacancies: response.data.vacancyList,
            })
            this.loading = false;
        })
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

    searchVacancy(title) {
        this.loading = false;
        if (title !== null) {
            let newVacancies = this.state.copyVacancies.filter(el => el.title.includes(title))
            this.setState({vacancies: newVacancies})
        }
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
                    <SearchString width='703px' method={this.searchVacancy}/>
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
