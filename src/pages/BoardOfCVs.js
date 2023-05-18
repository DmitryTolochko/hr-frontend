import React from 'react';
import SearchString from '../components/SearchString';
import FiltersPanel from '../components/FiltersPanel';
import CVCard from '../components/CVCard';
import axios from 'axios'

class BoardOfCVs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [
            ]
        }

        this.getCVs = this.getCVs.bind(this)
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('role'))?.roleList[0] === 'user') {
            window.location.replace("/BoardOfVacancies")
        }
        this.refreshToken()
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
                    this.getCVs()
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
                this.getCVs()
            }
        } 
        else {
            window.location.replace("/Login")
        }
    }

    getCVs() {
        axios.get('http://89.108.103.70/api/Resume/get-all').then((response) => {
            this.setState({data: response.data.resumeList})
        })
    }

    render() {
        if (!this.state.data.length) {
            return (
                <div className='loader-wrapper'>
                        <div className='loader'></div>
                </div>
            )
        }
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel/>
                <div className='board'>
                    <SearchString width='703px'/>
                    {this.state.data.map((el) => (<div key={el.id}><CVCard animatedClass='animated-card' cardInfo={el}/></div>))}
                </div>
            </div>
        );
    }
};

export default BoardOfCVs;
