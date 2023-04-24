import React from 'react';
const VacancyDescription = (props) => {    
    let employmentTypes = ['Не указано', 'Полная занятость', 'Частичная занятость', 'Вахта', 'Удаленная работа', 'Стажировка']   
    let workExperience = ['Не важно', 'От 1 до 3 лет', 'От 4 до 6 лет', 'Более 6 лет']
    return (
            <div className='vacancy-description'>
                <span className='h2-span'>
                    <h2>Требования</h2>
                </span>
                <ul className='aquirements'>
                    <li>Опыт работы: <p>{workExperience[props.cardInfo.workExperience]}</p></li>
                    <li>Занятость: <p>{employmentTypes[props.cardInfo.employmentType]}</p></li>
                </ul>
                <span className='h2-span'>
                    <h2>Описание</h2>
                </span>
                <p className='description'>{props.cardInfo.description}</p>
                <span className='h2-span'>
                    <h2>Требуемые навыки</h2>
                </span>
                <ul className='skills vacancy-skills'>
                    {props.cardInfo.skillList == undefined ? 'Не указаны' : props.cardInfo.skillList.map((skill) => (<li key={props.cardInfo.id}>{skill.name}</li>))}
                </ul>
                <p className='upload-date'>Вакансия опубликована 18:22 26.03.2023</p>
            </div>
    )
}

export default VacancyDescription;