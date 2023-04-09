import React from 'react';

const Registration = () => {
    return (
        <div className='login-pan'>
            <div id = 'circle'>
                <h1 className='header-1'>
                    Регистрация 
                </h1>
            </div>
            <input className = 'input' placeholder='ФИО'>
            </input>
            <input className = 'input' placeholder='Почта'>
            </input>
            <input className = 'input' placeholder='Телефон'>
            </input>
            <input className = 'input' placeholder='Пароль'>
            </input>
            <button className='input-button'>
                Зарегестрироваться
            </button>
            <p>
                Уже есть аккаунт?
                <a> 
                    Вход
                </a>
            </p>
        </div>
    );
};

export default Registration;