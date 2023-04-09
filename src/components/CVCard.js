import React from 'react';

const CVCard= () => {
    return (
        <div className='vacancy-card'>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1>Frontend-разработчик</h1>
                    <h2>50 000 руб.</h2>
                </span>
                <img className='card-avatar' src={require('./images/deafult-avatar.png')}></img>
            </div>

            <div className='second-half-CV'>
                <p className='card-name'>Иванов Иван, <b className='card-age'>33 года</b></p>
                <ul className='skills'>
                    <li>JavaScript</li>
                    <li>HTML</li>
                    <li>CSS</li>
                </ul>
            </div>
        </div>
    );
};

export default CVCard;
