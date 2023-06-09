import React from 'react';
import axios from 'axios'
import AccoutDepartmentCard from './AccountDepartmentCard';
import ImageComponent from './ImageComponent';
import Adminmodal1 from './Adminmodal1';

class AccountPan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            phone: '',
            github: null,
            telegram: null,
            vk: null,

            selectedFile: null,
            changeFile: false,
            photo: null,

            changePassword: false
        }
        this.refreshToken()
        this.getUserInfo = this.getUserInfo.bind(this)
        this.refreshToken = this.refreshToken.bind(this)
        this.updateUserInfo = this.updateUserInfo.bind(this)
        this.changePassword = this.changePassword.bind(this)
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
                        localStorage.removeItem('role')
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

    async getUserInfo() {
        await axios.get(`http://89.108.103.70/api/user/${JSON.parse(localStorage.getItem('user')).id}`).then((response) => {
            this.setState({
                fullName: response.data.surname + ' ' + response.data.name + ' ' + response.data.patronymic,
                email: response.data.email,
                phone: response.data.phone,
                github: response.data.github,
                telegram: response.data.telegram,
                vk: response.data.vk,
            })
            document.title = 'Личный кабинет'
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
            github: this.state.github === 'Ссылка' || this.state.github === '' ? null : this.state.github,
            telegram: this.state.telegram === 'Ссылка' || this.state.telegram === '' ? null : this.state.telegram,
            vk: this.state.vk === 'Ссылка' || this.state.vk === '' ? null : this.state.vk,
        })
    }

    handleFileUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        axios.post('http://89.108.103.70/api/file', formData , {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        })
          .then(response => {
            window.location.replace('/Account')
        })
          .catch(error => {
            axios.delete(`http://89.108.103.70/api/file/${JSON.parse(localStorage.getItem('user')).id}`, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
                },
            })
            .then(() => {
                axios.post('http://89.108.103.70/api/file', formData , {
                    headers: {
                        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
                    },
                }).then(() => {
                    window.location.replace('/Account')
                })
            })
        });
    }

    handleFileSelect = (event) => {
        this.setState({
          selectedFile: event.target.files[0]
        })
    }

    changePassword() {
        this.setState({
            changePassword: !this.state.changePassword
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
                    <input className = 'accountPan_input' value={this.state.fullName} onChange={(e) => this.setState({fullName: e.target.value})}/>
                    <h3 className='accountPan_h3'>
                        Почта
                    </h3>
                    <input className = 'accountPan_input' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                    <h3 className='accountPan_h3'>
                        Телефон
                    </h3>
                    <input className = 'accountPan_input' value={this.state.phone} onChange={(e) => this.setState({phone: e.target.value})}/>
                    <h3 className='accountPan_h3'>
                        Ссылки
                    </h3>
                    <p className = 'accountPan_title_input'>GitHub</p>
                    <input className = 'accountPan_link_input' placeholder='Ссылка' value={this.state.github} onChange={(e) => this.setState({github: e.target.value})}/>
                    <p className = 'accountPan_title_input'>Telegram</p>
                    <input className = 'accountPan_link_input' placeholder='Ссылка' value={this.state.telegram} onChange={(e) => this.setState({telegram: e.target.value})}/>
                    <p className = 'accountPan_title_input'>Вконтакте</p>
                    <input className = 'accountPan_link_input' placeholder='Ссылка' value={this.state.vk} onChange={(e) => this.setState({vk: e.target.value})}/>
                    <button className='accountPan_save_button' onClick={this.updateUserInfo}>
                        <img src={require('./images/save.svg').default} alt='save'></img>
                        &nbsp;Сохранить
                    </button>
                    <button className='accountPan_password_button' onClick={() => this.changePassword()}>
                        Сменить пароль
                    </button>
                </div>
                <div className='photodiv'>
                    {console.log(this.state.photo)}
                    <ImageComponent id={JSON.parse(localStorage.getItem('user')).id} tag='img_ac'/>
                    <a className='photodiv_a' onClick={() => this.setState({changeFile: true})}> 
                        <img src={require('./images/pencil-small.svg').default} alt='save' ></img>
                        &nbsp;Изменить фото профиля
                    </a>
                    
                </div>
                {this.state.changeFile ? (
                    <>
                        <div className="dark-overlay"></div>
                        <form onSubmit={this.handleFileUpload} className='file-uploader'>
                                <input type="file" onChange={this.handleFileSelect} />
                                <p>Максимальное разрешение: 500x500</p>
                                <p>Допустимые форматы: jpeg, png, jpg</p>
                                <p>Максимальный размер файла: 1 Мб</p>
                                <button className='CVPan_up_button' type="submit">Сохранить</button>
                        </form>
                    </>
                ) : (<></>)}
                {this.state.changePassword ? (
                    <>
                        <div className="dark-overlay"></div>
                        <Adminmodal1 changePassword={this.changePassword}/>
                    </>
                ) : (<></>)}
                {JSON.parse(localStorage.getItem('role')).roleList[0] !== 'user' ? (
                    <AccoutDepartmentCard/>
                ) : (<></>)}
            </div>
        );
    }
};

export default AccountPan;