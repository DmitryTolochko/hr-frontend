import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Registration extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            fullName: null,
            email: null,
            phone: null,
            password: null,
            passwordConfirm: null
        }

        this.createNewUser = this.createNewUser.bind(this)
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
            passwordConfirm: this.state.password
        })
        .then(setTimeout(() => {window.location.replace("/Login")}, 300));
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
                    <input className = 'registrationPan_four_input' placeholder='Пароль' onChange={(e) => this.setState({password: e.target.value})}>
                    </input>
                    <button className='registrationPan_button' onClick={this.createNewUser}>
                        Зарегистрироваться
                    </button>
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