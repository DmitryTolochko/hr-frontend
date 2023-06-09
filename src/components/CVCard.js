import React from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from './ImageComponent';

function get_current_age(date) {
    var d = date.split('-');
    if( typeof d[2] !== "undefined" ) {
        date = d[0]+'.'+d[1]+'.'+d[2];
        let age = ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0
        if (age == 0) { return ''; }
        else if (age % 10 == 1) { return ', ' + age + ' год'; }
        else if (age % 10 <= 4 && age % 10 !== 0) { return ', '+ age + ' года'; }
        else { return ', ' + age + ' лет';}
    }
    return '';
}

const CVCard= (props) => {
    return (
        <div className={`vacancy-card ${props.animatedClass}`}>
            <div className='first-half'>
                <span className='vacancy-card-head'>
                    <h1><Link to={'/CV/' + props.cardInfo.id}>{props.cardInfo.title}</Link></h1>
                    <h2>{props.cardInfo.desiredSalary} руб.</h2>
                </span>
                <ImageComponent id={props.cardInfo.author.id} tag='card-avatar'/>
            </div>

            <div className='second-half-CV'>
                <p className='card-name'>{props.cardInfo.author.name + ' ' +
                props.cardInfo.author.surname}<b className='card-age'>{get_current_age(props.cardInfo.birthDate)}</b></p>
                <ul className='skills'>
                    {props.cardInfo.skillList?.map((el) => (<li key={el.id}>{el.name}</li>)).slice(0, 3)}
                </ul>
            </div>
        </div>
    );
};

export default CVCard;
