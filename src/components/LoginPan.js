import axios from 'axios';
import React from 'react';

class LoginPan extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null
        }

        this.getToken = this.getToken.bind(this)
    }

    getToken() {
        if (this.state.email && this.state.password) {
            axios.post(`http://89.108.103.70/api/Auth/login`, {
                email: this.state.email,
                password: this.state.password
            })
        } else {
            return
        }
    }
    
    render() {
        return (
            <div className='glav_loginPan'>
                <div className='loginPan'>
                    <h1 className='loginPan_h1'>
                            Вход 
                    </h1>
                    <div id = 'circle'>
                    </div>
                    <input className = 'loginPan_first_input' placeholder='Почта' onChange={(e) => this.setState({email: e.target.value})}/>
                    <input className = 'loginPan_second_input' placeholder='Пароль' onChange={(e) => this.setState({password: e.target.value})}/>
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
    }
};

export default LoginPan;