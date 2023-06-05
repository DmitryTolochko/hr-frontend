import React from 'react';
import SearchString from '../components/SearchString';
import FiltersPanel from '../components/FiltersPanel';
import CVCard from '../components/CVCard';
import CVResponse from '../components/CVResponse';
import axios from 'axios';

class CVResponses extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            responses: null,
            vacancies: null
        }
        document.title = 'Отклики'
        this.getVacancies = this.getVacancies.bind(this)
    }

    async componentDidMount() {
        if (JSON.parse(localStorage.getItem('role'))?.roleList[0] === 'user') {
            window.location.replace("/BoardOfVacancies")
        }
        await this.refreshToken()
        await this.getVacancies()
    }

    async getVacancies() {
        await axios.post(`http://89.108.103.70/api/Vacancy/get-all-filter`, {
            "containsQueryList": [
                {
                  "fieldName": "authorId",
                  "values": [JSON.parse(localStorage.getItem('user')).id]
                }
              ],
        }).then((response) => {
            if (response.data.filteredVacancyList) {
                this.setState({vacancies: response.data.filteredVacancyList}, () => {
                    this.state.vacancies.forEach(vacancy => {
                        this.getResponses(vacancy)
                    })
                })
            }
        })
    }

    async getResponses(vacancy) {
        axios.get(`http://89.108.103.70/api/vacancy/response/${vacancy.id}`, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        }).then((resp) => {
            if (resp.data.resumeList.length !== 0) {
                let newResponses = this.state.responses === null ? [{resumeList: resp.data.resumeList, vacancy: vacancy}] : [...this.state.responses, {resumeList: resp.data.resumeList, vacancy: vacancy}]
                this.setState({responses: newResponses})
            }
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

    render() {
        if (this.state.responses === null) {
            return (
                <div className='loader-wrapper'>
                        <div className='loader'></div>
                </div>
            )
        }
        return (
            <div className='board-of-vacancies'>
                <div className='board'>
                    <SearchString/>
                    {console.log(this.state.responses)}
                    {this.state.responses.map((vacancies) => (vacancies.resumeList.map((resume) =>
                        (<div><CVResponse data={resume} vacancy={vacancies.vacancy} animatedClass='animated-card'/></div> )
                    )))}
                </div>
            </div>
        );
    }
};

export default CVResponses;
