import axios from 'axios';
import React from 'react';

class Adminmodal1 extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            newPass: null,
            oldPass: null,
            confirmPass: null
        }
    }

    async updatePassword() {
        await axios.post(`http://89.108.103.70/api/user/change-password`, {
            currentPassword: this.state.oldPass,
            password: this.state.newPass,
            passwordConfirm: this.state.confirmPass
        }, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken
            },
        })

        await this.props.changePassword()
    }

    render() {
        return (
            <div className='adminmodal1'>
                <h2 className='adminmodal_h1'>Изменение пароля</h2>

                <h3 className='adminmodal_h2'>Старый пароль</h3>
                <input className = 'adminPan_modal_input' placeholder='Начните вводить пароль...' 
                    onChange={(e) => this.setState({oldPass: e.target.value})}/>
                <h3 className='adminmodal_h2'>Новый пароль</h3>
                <input className = 'adminPan_modal_input' placeholder='Начните вводить пароль...' 
                    onChange={(e) => this.setState({newPass: e.target.value})}/>
                <h3 className='adminmodal_h2'>Подтверждение нового пароля</h3>
                <input className = 'adminPan_modal_input' placeholder='Начните вводить пароль...'
                    onChange={(e) => this.setState({confirmPass: e.target.value})}/>

                <div className='buttons'>
                    <button className='adminPan_save_button' onClick={() => this.updatePassword()}>
                        <img src={require('./images/save.svg').default} alt='save'></img>
                        &nbsp;Сохранить
                    </button>
                    <button className='adminPan_otmena_button' onClick={() => this.props.changePassword()}>
                        Отменить
                    </button>
                </div>
            </div>
        );
    }
};
        
export default Adminmodal1;         