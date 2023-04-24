import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const deleteVacancy = (id) => {
    axios.delete(`http://89.108.103.70/api/Vacancy/${id}`).then(redirectToMyVacancies)
}

const redirectToMyVacancies = () => {
    setTimeout(() => {
      window.location.replace("/MyVacancies");
    }, 100);
}

const VacancyCardEdit = (props) => {
    let [departmentName, setDepartmentName] = useState('Не указан')

    axios.get(`http://89.108.103.70/api/Department/${props.cardInfo.departmentId}`).then((response) => {
        setDepartmentName(departmentName = response.data.name)
    })

    console.log(departmentName)
    return (
        <div className={`vacancy-card ${props.animatedClass}`}>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1><Link to={"/Vacancy/" + props.cardInfo.id}>{props.cardInfo.title}</Link></h1>
                    <h2>{props.cardInfo.salary} руб.</h2>
                </span>
                <a onClick={() => deleteVacancy(props.cardInfo.id)}><img src={require('./images/trash.svg').default} alt='delete vacancy'></img></a>
            </div>
            
            <p className='location'>{props.cardInfo.city}</p>
            <div className='second-half'>
                <p className='department'>{departmentName}</p>
                <Link to={"/VacancyEditor/" + props.cardInfo.id}>
                    <button className='respond-button'>
                        <img src={require('./images/pencil.svg').default}></img>
                        Изменить
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default VacancyCardEdit;
