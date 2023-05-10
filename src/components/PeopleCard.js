const PeopleCard = () => {
    return (
        <a href=''><div className='people'>
            <img className='img_adm' src={require('./images/deafult-avatar.png')} alt='avatar'></img>
            <text className='peopletext'>Иванов Иван Иванович</text>
            <text className='peopletext'>пнрпцпцг@mail.ru</text>
            <text className='peopletext peoplerole'>Глава департамента</text>
        </div>
        </a>
    );
};
    
export default PeopleCard;
