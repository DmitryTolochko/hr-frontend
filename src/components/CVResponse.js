import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function get_current_age(date) {
    var d = date.split('-');
    if( typeof d[2] !== "undefined" ) {
        date = d[0]+'.'+d[1]+'.'+d[2];
        let age = ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0
        if (age == 0) { return ''; }
        else if (age % 10 == 1) { return ', ' + age + ' год'; }
        else if (age % 10 <= 4 && age % 10 !== 0) { return ', '+ age + ' года'; }
        else { return ', ' + age + ' лет';}
    }
    return '';
}

class CVResponse extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data: this.props.data,
            vacancy: this.props.vacancy
        }
    }

    async deleteResponse() {
        console.log(this.state)
        await axios.delete(`http://89.108.103.70/api/vacancy/response/${this.state.vacancy.id}`, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        })

        window.location.replace(`/CVResponses`)
    }

    render() {
        if (this.state.vacancy === null || this.state.data === null || this.state.data === []) {
            return;
        }
        if (this.state.vacancy !== null && this.state.data !== null && this.state.data !== []) {
        return (
            <div className={`vacancy-card animated-card`}>
                <div className='first-half'>
                    <span className='vacancy-card-head'>
                            <h1>
                                <Link to={`/CV/${this.state.data?.id}`} target="_blank">
                                    {this.state.data?.author?.surname + ' ' + this.state.data?.author?.name}
                                </Link>
                                <b className='card-age cv-response-age-size'>{get_current_age(this.state.data?.birthDate)}</b>
                            </h1>
                        
                        <h2>{this.state.data?.desiredSalary} руб.</h2>
                    </span>
                    <img className='card-avatar cv-response-indent' src={require('./images/deafult-avatar.png')}></img>
                </div>

                <p className='location'>Вакансия:</p>
                <div className='second-half'>
                    <p className='department'>{this.state.vacancy.title}</p> 
                    <div className='cv-response-buttons'>
                        <Link to={`/CV/${this.state.data?.id}`} target="_blank">
                        <button className='respond-button cv-response-button-size'>
                            <img src={require('./images/arrow-up-right.svg').default}></img>
                            Посмотреть
                        </button>
                        </Link>
                        <button className='editor-button cv-response-button-size' onClick={() => this.deleteResponse()}>
                            <img src={require('./images/crossing.svg').default}></img>
                            Отклонить
                        </button>
                    </div>

                </div>
            </div>
        );
        }
    }
};

export default CVResponse;
