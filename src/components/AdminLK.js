const PeopleCard = () => {
    return (
        <div className='adminlk'>
            <a href=''><img className='img_adm2'src={require('./images/deafult-avatar.png')} alt='avatar' ></img></a>
            <h1 className='admin_h1'>Иванов Иван Иванович</h1>
            <h2 className='admin_h2'>Почта</h2>
            <p className='admin_a_text'>jndjasjas@mail.ru</p>
            <h2 className='admin_h2'>Телефон</h2>
            <p className='admin_a_text'>8950509059</p>
            <h2 className='admin_h2'>Роль</h2>
            <p className='admin_a_text'>admin</p>
            <button className='adminPan_change_button'>
            <img src={require('./images/pencil-small.svg').default} alt='change'></img>
            &nbsp;Изменить
            </button>
            <button className='adminPan_delete_button'>
            <img src={require('./images/trash-small.svg').default} alt='delete'></img>
            &nbsp;Удалить
            </button>
        </div>
    );
};
        
export default PeopleCard;         