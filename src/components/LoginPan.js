import React from 'react';

const LoginPan = () => {
    return (
        <div className='glav_loginPan'>
            <div className='loginPan'>
                <h1 className='loginPan_h1'>
                        Вход 
                </h1>
                <div id = 'circle'>
                </div>
                <input className = 'loginPan_first_input' placeholder='Почта или телефон'/>
                <input className = 'loginPan_second_input' placeholder='Пароль'/>
                <button className='loginPan_button'>
                    Войти
                </button>
                <div className='loginPan_div'>
                    Еще нет аккаунта?&nbsp;
                    <a className='loginPan_a' href = ''> 
                        Регистрация
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPan;