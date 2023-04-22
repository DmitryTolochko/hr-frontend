import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class VacancyCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            department: ''
        }
        this.getDepartment(props.departmentId)
        console.log(props)
        console.log(this.state)
    }

    getDepartment(id) {
        fetch(`http://89.108.103.70/api/Department/${id}`)
        .then((resp) => resp.json())
        .then((data) => this.setState({department: data.name}));
    }
    getDepartment = this.getDepartment.bind(this)

    render() {
        return (
            <div className={`vacancy-card ${this.props.animatedClass}`}>
                <div className='first-half'>
                    <span className='vacancy-card-head'>
                        <h1><Link to={"/Vacancy/" + this.props.cardInfo.id}>{this.props.cardInfo.title}</Link></h1>
                        <h2>{this.props.cardInfo.salary} руб.</h2>
                    </span>
                    <a><img src={require('./images/star-1.svg').default} alt='star'></img></a>
                </div>
                
                <p className='location'>{this.props.cardInfo.city}</p>
                <div className='second-half'>
                    <p className='department'>{this.state.department}</p>
                    <button className='respond-button'>Откликнуться</button>
                </div>
            </div>
        );
    }
};

export default VacancyCard;
