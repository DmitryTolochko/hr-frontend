const PeopleCard = (props) => {
    return (
        <div className='people'>
            <img className='img_adm' src={require('./images/deafult-avatar.png')} alt='avatar'></img>
            <text className='peopletext'>{props.data.surname + ' ' + props.data.name + ' ' + props.data.patronymic}</text>
            <text className='peopletext'>{props.data.email}</text>
            <text className='peopletext peoplerole'>Глава департамента</text>
        </div>
    );
};
    
export default PeopleCard;
