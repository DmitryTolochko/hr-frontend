const Adminmodal2 = () => {
    return (
        <div className='adminmodal2 modaloff'>
                <h2 className='adminmodal_h1'>Изменение пользователя</h2>
                <h3 className='adminmodal_h2'>ФИО</h3>
                <input className = 'adminPan_modal_input' placeholder='ФИО'/>
                <h3 className='adminmodal_h2'>Почта</h3>
                <input className = 'adminPan_modal_input' placeholder='Почта'/>
                <h3 className='adminmodal_h2'>Телефон</h3>
                <input className = 'adminPan_modal_input' placeholder='Телефон'/>
                <h3 className='adminmodal_h2'>Роль</h3>
                <select className='adminPan_select'>
                    <option className='CVPan_option'>Администратор</option>
                    <option className='CVPan_option'>Сотрудник</option>
                    <option className='CVPan_option'>Глава департамента</option>
                </select>
                <h3 className='adminmodal_h2'>Название департамента</h3>
                <input className = 'adminPan_modal_input' placeholder='Название департамента'/>
                <h3 className='adminmodal_h2'>География</h3>
                <button className='adminPan_save_button'>
                <img src={require('./images/save.svg').default} alt='save'></img>
                &nbsp;Сохранить
                </button>
                <button className='adminPan_otmena_button'>
                    Отменить
                </button>
        </div>
    );
};
        
export default Adminmodal2;    