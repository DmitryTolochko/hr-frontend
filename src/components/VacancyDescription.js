import React from 'react';
const VacancyDescription = (props) => {       
    return (
            <div className='vacancy-description'>
                <span className='h2-span'>
                    <h2>Требования</h2>
                </span>
                <ul className='aquirements'>
                    <li>Опыт работы <p>{props.cardInfo.workExperience} года</p></li>
                    {/* <li>Занятость <p>Полная</p></li>
                    <li>Условия <p>Офис</p></li> */}
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