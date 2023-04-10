import React from 'react';

const Registration = () => {
    return (
        <div className='glav_registrationPan'>
            <div className='registrationPan'>
                <h1 className='registrationPan_h1'>
                    Регистрация 
                </h1>
                <div className = 'circle2'>
                </div>
                <input className = 'registrationPan_first_input' placeholder='ФИО'>
                </input>
                <input className = 'registrationPan_second_input' placeholder='Почта'>
                </input>
                <input className = 'registrationPan_third_input' placeholder='Телефон'>
                </input>
                <input className = 'registrationPan_four_input' placeholder='Пароль'>
                </input>
                <button className='registrationPan_button'>
                    Зарегестрироваться
                </button>
                <div className='registrationPan_div'>
                    Уже есть аккаунт?&nbsp;
                    <a className='registrationPan_a' href = ''> 
                        Вход
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Registration;