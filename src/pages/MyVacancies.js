import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCardEdit from '../components/VacancyCardEdit';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MyVacancies extends React.Component {
    constructor(props) {
        super(props)
        this.refreshToken()
        this.state = {
            data: []
        }
        this.getVacancies = this.getVacancies.bind(this)
    }

    refreshToken() {
        if (localStorage.getItem('tokens') !== null) {
            let date = new Date(JSON.parse(localStorage.getItem('tokens')).expirationTime)
            let now = new Date();
            let diffInMinutes = Math.floor((date - now) / 60000);
            if (diffInMinutes <= 5) {
                axios.post('http://89.108.103.70/api/Auth/update-token', {
                    'accessToken': JSON.parse(localStorage.getItem('tokens')).accessToken,
                    'refreshToken': JSON.parse(localStorage.getItem('tokens')).refreshToken,
                })
                .then((response) => {
                    localStorage.setItem('tokens',JSON.stringify(response.data))
                    this.getVacancies()
                })
                .catch( function (error) {
                    if (error.response) {
                        localStorage.removeItem('tokens')
                        localStorage.removeItem('user')
                        window.location.replace("/Login")
                    }
                })
            }
            else {
                this.getVacancies()
            }
        } 
        else {
            window.location.replace("/Login")
        }
    }

    getVacancies() {
        axios.post(`http://89.108.103.70/api/Vacancy/get-all-filter`, {
            "containsQueryList": [
                {
                  "fieldName": "authorId",
                  "values": [JSON.parse(localStorage.getItem('user')).id]
                }
              ],
        }).then((response) => this.setState({data: response.data.filteredVacancyList}))
    }

    render() {
        // if (!this.state.data.length) {
        //     return (
        //         <div className='loader-wrapper'>
        //                 <div className='loader'></div>
        //         </div>
        //     )
        // }
        return (
            <div>
                <div className='my-vacancies'>
                    <div className='my-vacancies__wrapper'>
                        <SearchString/>
                        <Link to="/VacancyEditor/0">
                            <button className='my-vacancies__button search-button'>
                                <img src={require('../components/images/plus.svg').default} style={{width: "17px", height: "17px"}}></img>Добавить
                            </button>
                        </Link>
                    </div>
                    {this.state.data.map((el) => (<div key={el.id}><VacancyCardEdit cardInfo={el} animatedClass='animated-card'/></div>))}
                </div>
            </div>
        );
    }
};

export default MyVacancies;
