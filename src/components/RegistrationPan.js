import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

class Registration extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            fullName: null,
            email: null,
            phone: null,
            password: null,
            passwordConfirm: null,
            isButtonHidden: true,
            token: null
        }
        document.title = 'Регистрация Intra'
        this.createNewUser = this.createNewUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    createNewUser() {
        if (!this.state.fullName) {
            return;
        }

        let [surname, name, patronymic] = this.state.fullName.split(' ')
        console.log(this.state)
        axios.post(`http://89.108.103.70/api/Auth/register`, {
            surname: surname,
            name: name,
            patronymic: patronymic,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            passwordConfirm: this.state.password,
            captchaToken: this.state.token
        })
        .then(setTimeout(() => {window.location.replace("/Login")}, 300));
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
            <div className='glav_registrationPan'>
                <div className='registrationPan'>
                    <h1 className='registrationPan_h1'>
                        Регистрация 
                    </h1>
                    <div className = 'circle2'>
                    </div>
                    <input className = 'registrationPan_first_input' placeholder='ФИО' onChange={(e) => this.setState({fullName: e.target.value})}>
                    </input>
                    <input className = 'registrationPan_second_input' placeholder='Почта' onChange={(e) => this.setState({email: e.target.value})}>
                    </input>
                    <input className = 'registrationPan_third_input' placeholder='Телефон (+7)' onChange={(e) => this.setState({phone: e.target.value})}>
                    </input>
                    <input className = 'registrationPan_four_input' type="password" placeholder='Пароль' onChange={(e) => this.setState({password: e.target.value})}>
                    </input>
                    <ReCAPTCHA
                        ref={(el) => {
                            this.recaptcha = el;
                        }}
                        sitekey='6LesJYMmAAAAAHSj9DdtLYjMlv-iEWEwtBE-aL5a'
                        asyncScriptOnLoad={this.asyncScriptOnLoad}
                        className='captcha captcha2'
                        onChange={this.handleChange}
                    />
                    {this.state.isButtonHidden ? 
                    (<></>) : 
                    (<button className='registrationPan_button' onClick={this.createNewUser}>
                        Зарегистрироваться
                    </button>)}
                    <div className='registrationPan_div'>
                        Уже есть аккаунт?&nbsp;
                        <Link to='/Login'>
                        <a className='registrationPan_a' href = ''> 
                            Вход
                        </a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Registration;