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
            document.title = response.data.title
            axios.get(`http://89.108.103.70/api/Department/${response.data.departmentId}`).then((t) => {
                this.setState({departmentName: t.data.name})
            })
        })

        this.state = {
            data: [],
            departmentName: '',
            buttonText: 'Откликнуться',
            isFeatured: props.isFeatured,
            isAuthorized: localStorage.getItem('user') !== null
        }
        this.createResponse = this.createResponse.bind(this)
        this.addToFeatured = this.addToFeatured.bind(this)
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
                        {this.state.isFeatured ? 
                    (<a onClick={() =>this.deleteFromFeatured(this.props.cardInfo.id)}>{this.state.isAuthorized ? <img src={require('../components/images/star-2.svg').default} alt='star'></img> : <></>}</a>) : 
                    (<a onClick={() =>this.addToFeatured(this.props.cardInfo.id)}>{this.state.isAuthorized ? <img src={require('../components/images/star-1.svg').default} alt='star'></img> : <></>}</a>)}
                    </div>
                    
                    <p className='location'>{this.state.data.city}</p>
                    <div className='second-half'>
                        <p className='department'>{this.state.departmentName}</p>
                        {this.state.isAuthorized ? <button className='respond-button' onClick={() => this.createResponse(this.state.data.id)}>{this.state.buttonText}</button> : <></>}
                        
                    </div>
                </div>
                <VacancyDescription cardInfo={this.state.data}/>
            </div>
        )
    }
}

export default Vacancy;