import React from 'react';
import PeoplecardwithPhoto from '../components/PeoplecardwithPhoto';
import CVcardCVPan from './CVcardCVPan';
import PeoplecardCVPan from '../components/PeoplecardCVPan';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CVpan2 extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            data: [],
            departmentName: '',
        }

        this.getCV = this.getCV.bind(this)
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
                    this.getCV()
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
                this.getCV()
            }
        } 
        else {
            window.location.replace("/Login")
        }
    }

    getCV() {
        axios.get(`http://89.108.103.70/api/resume/${window.location.href.split("/")[4]}`).then((response) => {
            this.setState({data: response.data})
        })
    }

    render() {
        if (this.state.data === null) {
            return (
                <div className='loader-wrapper'>
                        <div className='loader'></div>
                </div>
            )
        }
        return (
            <div className='glavCV'>
                <div className='card_Cv'>
                    <Link to={'/BoardOfCVs'}><text className='exitCV'><img src={require('./images/vector-left.svg').default} alt='exit'></img>&nbsp;Назад</text></Link>
                    <PeoplecardCVPan data={this.state.data}/>
                    <CVcardCVPan data={this.state.data}/>
                </div>
                <PeoplecardwithPhoto data={this.state.data}/>
            </div>
        );
    }
};
        
export default CVpan2;