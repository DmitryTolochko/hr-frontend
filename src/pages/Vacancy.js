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
            axios.get(`http://89.108.103.70/api/Department/${response.data.departmentId}`).then((t) => {
            this.setState({departmentName: t.data.name})
        })
        })

        this.state = {
            data: [],
            departmentName: '',
        }
    }
    render () {
        return (
            <div className='vacancy'>
                <a><img src={require('../components/images/arrow.svg').default}></img><Link to="/BoardOfVacancies">К доске вакансий</Link></a>
                {/* <div key={this.state.data.id}><VacancyCard cardInfo={this.state.data}/></div> */}
                <div className={`vacancy-card`}>
                    <div className='first-half'>
                        <span className='vacancy-card-head'>
                            <h1>{this.state.data.title}</h1>
                            <h2>{this.state.data.salary} руб.</h2>
                        </span>
                        <a><img src={require('../components/images/star-1.svg').default} alt='star'></img></a>
                    </div>
                    
                    <p className='location'>{this.state.data.city}</p>
                    <div className='second-half'>
                        <p className='department'>{this.state.departmentName}</p>
                        <button className='respond-button'>Откликнуться</button>
                    </div>
                </div>
                <VacancyDescription cardInfo={this.state.data}/>
            </div>
        )
    }
}

export default Vacancy;