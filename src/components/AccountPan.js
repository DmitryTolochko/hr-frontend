import React from 'react';

const AccountPan = () => {
    return (
        <div className='glav_accountPan'>
            <div className='accountPan'>
                <h1 className='accountPan_h1'>
                    Личный кабинет
                </h1>
                <h2 className='accountPan_h2'>
                    Настройки
                </h2>
                <h3 className='accountPan_h3'>
                    ФИО
                </h3>
                <input className = 'accountPan_input' placeholder='ФИО'/>
                <h3 className='accountPan_h3'>
                    Почта
                </h3>
                <input className = 'accountPan_input' placeholder='Почта'/>
                <h3 className='accountPan_h3'>
                    Телефон
                </h3>
                <input className = 'accountPan_input' placeholder='Телефон'/>
                <h3 className='accountPan_h3'>
                    Ссылки
                </h3>
                <input className = 'accountPan_title_input' placeholder='Название'/>
                <input className = 'accountPan_link_input' placeholder='Ссылка'/>
                <input className = 'accountPan_title_input' placeholder='Название'/>
                <input className = 'accountPan_link_input' placeholder='Ссылка'/>
                <input className = 'accountPan_title_input' placeholder='Название'/>
                <input className = 'accountPan_link_input' placeholder='Ссылка'/>
                <button className='accountPan_save_button'>
                    <img src={require('./images/save.svg').default} alt='save'></img>
                    &nbsp;Сохранить
                </button>
                <button className='accountPan_password_button'>
                    Сменить пароль
                </button>
            </div>
            <div className='photodiv'>
                <a href=''><img className='img_ac'></img></a>
                <a className='photodiv_a' href = ''> 
                    <img src={require('./images/pencil-small.svg').default} alt='save'></img>
                    &nbsp;Изменить фото профиля
                </a>
            </div>
            <div className='director_div'>
                <h1 className='director_div_h1'>Глава департамента</h1>
                <h3 className='director_div_h3'>Название</h3>
                <h2 className='director_div_h2'>IT-departament</h2>
                <h3 className='director_div_h3'>География</h3>
            </div>
        </div>
    );
};

export default AccountPan;