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

    logInUser = async (response) => {
        if (response.status === 200) {
            localStorage.setItem('tokens', JSON.stringify(response.data))

            let getUser = await fetch('http://89.108.103.70/api/Auth/user-info', {
                headers: {
                    'Authorization': `Bearer ${response.data.accessToken}`
                }
            })

            let dataUser = await getUser.json()

            localStorage.setItem('user', JSON.stringify(dataUser))
            this.getVacancies()
            setTimeout(this.refreshToken, 900000);
        }
    }

    refreshToken() {
        if (localStorage.getItem('tokens') !== null) {
            axios.post('http://89.108.103.70/api/Auth/update-token', {
                'accessToken': JSON.parse(localStorage.getItem('tokens')).accessToken,
                'refreshToken': JSON.parse(localStorage.getItem('tokens')).refreshToken,
            }).then((response) => this.logInUser(response)).catch( function (error) {
                if (error.response) {
                    localStorage.removeItem('tokens')
                    localStorage.removeItem('user')
                    window.location.replace("/Login")
                }
            })
        } 
        else {
            localStorage.removeItem('tokens')
            localStorage.removeItem('user')
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
        return (
            <div>
                <div className='board'>
                    <div className='search-box'>
                        <SearchString width='470px'/>
                        <Link to="/VacancyEditor/0">
                            <button className='search-button'>
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
