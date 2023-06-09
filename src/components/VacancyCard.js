import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class VacancyCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            department: '',
            buttonText: 'Откликнуться',
            isFeatured: props.isFeatured
        }

        this.getDepartment = this.getDepartment.bind(this)
        this.getDepartment(props.departmentId)
        this.createResponse = this.createResponse.bind(this)
    }

    getDepartment(id) {
        fetch(`http://89.108.103.70/api/Department/${id}`)
        .then((resp) => resp.json())
        .then((data) => this.setState({department: data.name}));
    }

    createResponse(id) {
        axios.post(`http://89.108.103.70/api/vacancy/response`, {vacancyId: id}, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        }).then(this.setState({buttonText: 'Готово'}))
    }

    addToFeatured(id) {
        axios.post(`http://89.108.103.70/api/vacancy/favorite`, {vacancyId: id}, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        }).then(this.setState({isFeatured: true}))
    }

    async deleteFromFeatured(id) {
        await axios.delete(`http://89.108.103.70/api/vacancy/favorite/${id}`, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        })

        window.location.reload()
    }

    render() {
        return (
            <div className={`vacancy-card ${this.props.animatedClass}`}>
                <div className='first-half'>
                    <span className='vacancy-card-head'>
                        <h1><Link to={"/Vacancy/" + this.props.cardInfo.id} target="_blank">{this.props.cardInfo.title}</Link></h1>
                        <h2>{this.props.cardInfo.salary} руб.</h2>
                    </span>
                    {this.state.isFeatured ? 
                    (<a onClick={() =>this.deleteFromFeatured(this.props.cardInfo.id)}><img src={require('./images/star-2.svg').default} alt='star'></img></a>) : 
                    (<a onClick={() =>this.addToFeatured(this.props.cardInfo.id)}><img src={require('./images/star-1.svg').default} alt='star'></img></a>)}
                    
                </div>
                
                <p className='location'>{this.props.cardInfo.city}</p>
                <div className='second-half'>
                    <p className='department'>{this.state.department}</p>
                    <button className='respond-button' onClick={() => this.createResponse(this.props.cardInfo.id)}>{this.state.buttonText}</button>
                </div>
            </div>
        );
    }
};

export default VacancyCard;
