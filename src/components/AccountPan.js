import React from 'react';
import axios from 'axios'

class AccountPan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            phone: '',
            github: 'Ссылка',
            telegram: 'Ссылка',
            vk: 'Ссылка',
        }
        this.refreshToken()
        this.getUserInfo = this.getUserInfo.bind(this)
        this.refreshToken = this.refreshToken.bind(this)
        this.updateUserInfo = this.updateUserInfo.bind(this)
    }

    refreshToken() {
        if (localStorage.getItem('tokens') !== null) {
            let date = new Date(JSON.parse(localStorage.getItem('tokens')).expirationTime)
            let now = new Date();
            let diffInMinutes = Math.floor((date - now) / 60000);
            if (diffInMinutes <= 5) {
                axios.post('http://89.108.103.70/api/Auth/update-token', {
                    'accessToken': JSON.parse(localStorage.getItem('tokens')).accessToken,
                    'refreshToken': JSON.parse(localStorage.getItem('tokens')).refreshToken,
                })
                .then((response) => {
                    localStorage.setItem('tokens',JSON.stringify(response.data))
                    this.getUserInfo()
                })
                .catch( function (error) {
                    if (error.response) {
                        localStorage.removeItem('tokens')
                        localStorage.removeItem('user')
                        window.location.replace("/Login")
                    }
                })
            }
            else {
                this.getUserInfo()
            }
        } 
        else {
            window.location.replace("/Login")
        }
    }

    getUserInfo() {
        axios.get(`http://89.108.103.70/api/user/${JSON.parse(localStorage.getItem('user')).id}`).then((response) => {
            this.setState({
                fullName: response.data.surname + ' ' + response.data.name + ' ' + response.data.patronymic,
                email: response.data.email,
                phone: response.data.phone,
                github: response.data.github !== null ? response.data.github : 'Ссылка',
                telegram: response.data.telegram !== null ? response.data.telegram : 'Ссылка',
                vk: response.data.telegram !== null ? response.data.vk : 'Ссылка',
            })
        })
    }

    updateUserInfo() {
        axios.put(`http://89.108.103.70/api/user`, {
            id: JSON.parse(localStorage.getItem('user')).id,
            surname: this.state.fullName.split(' ')[0],
            name: this.state.fullName.split(' ')[1],
            patronymic: this.state.fullName.split(' ')[2],
            email: this.state.email,
            phone: this.state.phone,
            github: this.state.github === 'Ссылка' ? null : this.state.github,
            telegram: this.state.telegram === 'Ссылка' ? null : this.state.telegram,
        })
    }

    render() {
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
                    <input className = 'accountPan_input' placeholder={this.state.fullName} onChange={(e) => this.setState({fullName: e.target.value})}/>
                    <h3 className='accountPan_h3'>
                        Почта
                    </h3>
                    <input className = 'accountPan_input' placeholder={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                    <h3 className='accountPan_h3'>
                        Телефон
                    </h3>
                    <input className = 'accountPan_input' placeholder={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})}/>
                    <h3 className='accountPan_h3'>
                        Ссылки
                    </h3>
                    <p className = 'accountPan_title_input'>GitHub</p>
                    <input className = 'accountPan_link_input' placeholder={this.state.github} onChange={(e) => this.setState({github: e.target.value})}/>
                    <p className = 'accountPan_title_input'>Telegram</p>
                    <input className = 'accountPan_link_input' placeholder={this.state.telegram} onChange={(e) => this.setState({telegram: e.target.value})}/>
                    {/* <p className = 'accountPan_title_input'>Вконтакте</p>
                    <input className = 'accountPan_link_input' placeholder={this.state.vk} onChange={(e) => this.setState({vk: e.target.value})}/> */}
                    <button className='accountPan_save_button' onClick={this.updateUserInfo}>
                        <img src={require('./images/save.svg').default} alt='save'></img>
                        &nbsp;Сохранить
                    </button>
                    <button className='accountPan_password_button'>
                        Сменить пароль
                    </button>
                </div>
                <div className='photodiv'>
                    <img className='img_ac' src={require('./images/deafult-avatar.png')} alt='avatar'></img>
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
    }
};

export default AccountPan;