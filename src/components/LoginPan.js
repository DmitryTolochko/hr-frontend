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
        this.logInUser = this.logInUser.bind(this)
    }

    getToken() {
        if (this.state.email && this.state.password) {
            axios.post(`http://89.108.103.70/api/Auth/login`, {
                email: this.state.email,
                password: this.state.password
            }).then((response) => this.logInUser(response))
        }
    }

    logInUser = async (response) => {
        if (response.status === 200) {
            localStorage.setItem('tokens', JSON.stringify(response.data))

            let getUser = await fetch('http://89.108.103.70/api/Auth/user-info', {
                headers: {
                    'Authorization': `Bearer ${response.data.accessToken}`
                }
            })

            let dataUser = await getUser.json()
            console.log(dataUser)

            localStorage.setItem('user', JSON.stringify(dataUser))
            window.location.replace("/Account")
        }
    }

    refreshToken() {
        if (localStorage.getItem('tokens') !== null) {
            axios.post('http://89.108.103.70/api/Auth/update-token', {
                'accessToken': JSON.parse(localStorage.getItem('tokens')).accessToken,
                'refreshToken': JSON.parse(localStorage.getItem('tokens')).refreshToken,
            }).then((response) => this.logInUser(response)).catch( function (error) {
                if (error.response) {
                    localStorage.removeItem('tokens')
                    localStorage.removeItem('user')
                    window.location.replace("/Login")
                }
            })
        } 
        else {
            localStorage.removeItem('tokens')
            localStorage.removeItem('user')
            window.location.replace("/Login")
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
                    <button className='loginPan_button' onClick={this.getToken}>
                        Войти
                    </button>
                    <div className='loginPan_div'>
                        Еще нет аккаунта?&nbsp;
                        <a className='loginPan_a' href='/Registration'> 
                            Регистрация
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};

export default LoginPan;