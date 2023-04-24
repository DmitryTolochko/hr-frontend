import React from 'react';

function get_current_age(date) {
    var d = date.split('-');
    if( typeof d[2] !== "undefined" ) {
        date = d[0]+'.'+d[1]+'.'+d[2];
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
    return 0;
}

const CVCard= (props) => {
    return (
        <div className={`vacancy-card ${props.animatedClass}`}>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1>{props.cardInfo.author.userName}</h1>
                    <h2>{props.cardInfo.salary} руб.</h2>
                </span>
                <img className='card-avatar' src={require('./images/deafult-avatar.png')}></img>
            </div>

            <div className='second-half-CV'>
                <p className='card-name'>{props.cardInfo.author.userName}, <b className='card-age'>{get_current_age(props.cardInfo.birthDate)} года</b></p>
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
