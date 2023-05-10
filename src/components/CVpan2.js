import React from 'react';

const CVpan2 = () => {
    return (
        <div className='glavCV'>
            <a href=''><text className='exitCV'><img src={require('./images/vector-left.svg').default} alt='exit'></img>&nbsp;Назад</text></a>
            <div className='people_card'>
                <span className='people_card_span'><h1 className='people_card_h1'>Смирнов Дмитрий Дмитриевич</h1><p className='people_card_p'><a href=''>27 лет</a></p></span>
                <a href=''><h2 className='people_card_h2'>50000 руб.</h2></a>
                <h3 className='people_card_h3'>Вакансия:</h3>
                <a href=''><p className='people_people_vacancy'>Frontend-разработчик</p></a>
                <a href=''><p className='vacancy_time_data'>14:15</p></a>
                <a href=''><p className='vacancy_time_data'>14.03.2011</p></a>
            </div>
            <div className='CVcard'>
                <h2 className='CVPanglav_h2'>
                    Основная информация
                </h2>
                <h3 className='CVcard_h3'>Занятость</h3>
                <a href=''><p className='CVcard_p'></p></a>
                <h3 className='CVcard_h3'>Место проживания</h3>
                <a href=''><p className='CVcard_p'></p></a>
                <h3 className='CVcard_h3'>Желаемая география</h3>
                <a href=''><p className='CVcard_p'></p></a>
                <h2 className='CVPanglav_h2'>
                    О себе
                </h2>
                <a href=''><p className='CVcard_p'></p></a>
                <h2 className='CVPanglav_h2'>
                    Опыт работы
                </h2>
                <h3 className='CVcard_h3'>Текущая должность</h3>
                <a href=''><p className='CVcard_p'></p></a>
                <text className='CVcard_text'>c <a href=''>2021</a> по н.в</text>
                <h3 className='CVcard_h3'>Предыдущие места работы</h3>
                <a href=''></a>
                <h2 className='CVPanglav_h2'>
                    Образование
                </h2>
                <a href=''></a>
                <h2 className='CVPanglav_h2'>
                    Ключевые навыки
                </h2>
                <text className='vacancy_time_data'>Резюме опубликовано в <a href=''><text className='vacancy_time_data'>14:15</text></a><a href=''><text className='vacancy_time_data'>14.12.2011</text></a></text>
            </div>
            <a href=''><div></div></a>
        </div>
    );
};
        
    export default CVpan2;