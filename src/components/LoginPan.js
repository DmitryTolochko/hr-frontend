import axios from 'axios';
import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

class LoginPan extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null,
            isButtonHidden: true,
            token: null
        }

        document.title = 'Вход Intra'
        this.getToken = this.getToken.bind(this)
        this.logInUser = this.logInUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    getToken() {
        if (this.state.email && this.state.password) {
            axios.post(`http://89.108.103.70/api/Auth/login`, {
                email: this.state.email,
                password: this.state.password,
                captchaToken: this.state.token
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

            await axios.get(`http://89.108.103.70/api/user/role/${dataUser.id}`).then((resp) => {
                localStorage.setItem('role', JSON.stringify(resp.data))
            })

            await localStorage.setItem('user', JSON.stringify(dataUser))
            window.location.replace("/Account")
            // setTimeout(() => {}, 200)
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
                    localStorage.removeItem('role')
                    window.location.replace("/Login")
                }
            })
        } 
        else {
            localStorage.removeItem('tokens')
            localStorage.removeItem('user')
            localStorage.removeItem('role')
            window.location.replace("/Login")
        }
    }

    handleChange = value => {
        this.setState({
            isButtonHidden: false,
            token: value
        })
        this.recaptcha.current.reset();
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
                    <input className = 'loginPan_second_input' type="password" placeholder='Пароль' onChange={(e) => this.setState({password: e.target.value})}/>
                    <ReCAPTCHA
                        sitekey='6LesJYMmAAAAAHSj9DdtLYjMlv-iEWEwtBE-aL5a'
                        asyncScriptOnLoad={this.asyncScriptOnLoad}
                        className='captcha'
                        onChange={this.handleChange}
                        ref={(el) => {
                            this.recaptcha = el;
                        }}
                    />
                    {this.state.isButtonHidden ? 
                    (<></>) : 
                    (<button className='loginPan_button' onClick={this.getToken}>
                        Войти
                    </button>)}
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