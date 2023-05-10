import React from 'react';

function get_current_age(date) {
    var d = date.split('-');
    if( typeof d[2] !== "undefined" ) {
        date = d[0]+'.'+d[1]+'.'+d[2];
        let age = ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0
        if (age == 0) { return 'Возраст не обозначен'; }
        else if (age % 10 == 1) { return age + ' год'; }
        else if (age % 10 <= 4) {return age + ' года'; }
        else { return age + ' лет';}
    }
    return 'Возраст не обозначен';
}

const CVCard= (props) => {
    return (
        <div className={`vacancy-card ${props.animatedClass}`}>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1>{props.cardInfo.title}</h1>
                    <h2>{props.cardInfo.desiredSalary} руб.</h2>
                </span>
                <img className='card-avatar' src={require('./images/deafult-avatar.png')}></img>
            </div>

            <div className='second-half-CV'>
                <p className='card-name'>{props.cardInfo.author.name + ' ' +
                props.cardInfo.author.surname}, <b className='card-age'>{get_current_age(props.cardInfo.birthDate)}</b></p>
                <ul className='skills'>
                    {props.cardInfo.skillList?.map((el) => (<li key={el.id}>{el.name}</li>)).slice(0, 3)}
                </ul>
            </div>
        </div>
    );
};

export default CVCard;
