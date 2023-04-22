import React from 'react';
import VacancyCard from '../components/VacancyCard';
import VacancyDescription from '../components/VacancyDescription';
import axios from 'axios'
import { Link } from 'react-router-dom'; 

class Vacancy extends React.Component {
    constructor(props) {
        super(props)

        axios.get(`http://89.108.103.70/api/Vacancy/${window.location.href.split("/")[4]}`).then((response) => {
            this.setState({data: response.data})
        })

        this.state = {
            data: [],
        }
    }
    render () {
        return (
            <div className='vacancy'>
                <a><img src={require('../components/images/arrow.svg').default}></img><Link to="/BoardOfVacancies">Назад</Link></a>
                <VacancyCard cardInfo={this.state.data}/>
                <VacancyDescription cardInfo={this.state.data}/>
            </div>
        )
    }
}

export default Vacancy;