import React from 'react';

const CVResponse= (props) => {
    return (
        <div className={`vacancy-card ${props.animatedClass}`}>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1>Иван Иван <b className='card-age cv-response-age-size'>33 года</b></h1>
                    <h2>50 000 руб.</h2>
                </span>
                <img className='card-avatar cv-response-indent' src={require('./images/deafult-avatar.png')}></img>
            </div>

            <p className='location'>Вакансия:</p>
            <div className='second-half'>
                <p className='department'>Frontend-разработчик</p> 
                <div className='cv-response-buttons'>
                    <button className='respond-button cv-response-button-size'>
                        <img src={require('./images/arrow-up-right.svg').default}></img>
                        Посмотреть
                    </button>
                    <button className='editor-button cv-response-button-size'>
                        <img src={require('./images/crossing.svg').default}></img>
                        Отклонить
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CVResponse;
