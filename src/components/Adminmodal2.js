import React from 'react';
import axios from 'axios';

class Adminmodal2 extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data: null,
            fullName: '',
            email: '',
            phone: '',
            departmentId: null,

            role: '',
            departmentName: null,
            description: null,
            headId: null
        }

        this.updateUserInfo = this.updateUserInfo.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            if (this.props.data !== null) {
                this.setState({ 
                    data: this.props.data,
                    fullName: this.props.data?.surname + ' ' + this.props.data?.name + ' ' + this.props.data?.patronymic,
                    email: this.props.data?.email,
                    phone: this.props.data?.phone,
                    role: this.props.role,
                    departmentId: this.props.data.departmentId
                });

                if (this.props.data.departmentId !== null) {
                    axios.get(`http://89.108.103.70/api/department/${this.props.data.departmentId}`).then((resp) => {
                        this.setState({
                            departmentName: resp.data.name,
                            description: resp.data.description,
                            headId: resp.data.headId
                        })
                    })
                } 
            }
            else {
                this.setState({ 
                    data: null,
                    fullName: '',
                    email: '',
                    phone: '',
                    departmentId: null,
        
                    role: '',
                    departmentName: null,
                    description: null,
                    headId: null
                });
            }
        }
        console.log(this.state)
    }

    updateUserInfo() {
        //обновление роли
        axios.put(`http://89.108.103.70/api/user/role`, {
                userId: this.state.data.id,
                roleName: this.state.role
        })

        let depId = this.state.departmentId
        //создание или обновление департамента или удаление
        if (this.state.departmentId !== null && this.state.role !== 'user') {
                //обновление
                axios.put(`http://89.108.103.70/api/department`, {
                    id: this.state.departmentId,
                    name: this.state.departmentName,
                    description: this.state.description,
                    headId: this.state.headId
                })
        }
        else if (this.state.departmentId === null && this.state.role !== 'user'){
                //создание
                axios.post(`http://89.108.103.70/api/department`, {
                    name: this.state.departmentName,
                    description: this.state.description,
                    headId: this.state.data.id
                }).then((resp) => {
                    depId = resp.data.id
                })
        }
        else if (this.state.departmentId !== null && this.state.role === 'user') {
                //удаление
                axios.delete(`http://89.108.103.70/api/department/${this.state.departmentId}`)
        }   
        console.log(depId)
        //обновление пользователя
        setTimeout(() => {
            console.log(depId)
            axios.put(`http://89.108.103.70/api/user`, {
                id: this.state.data.id,
                departmentId: depId,
                surname: this.state.fullName.split(' ')[0],
                name: this.state.fullName.split(' ')[1],
                patronymic: this.state.fullName.split(' ')[2],
                email: this.state.email,
                phone: this.state.phone,
                github: this.state.data.github,
                telegram: this.state.data.telegram,
                vk: this.state.data.vk
            }).then(() => {
                this.props.updateData(null)
                window.location.replace("/AdminPanel");
            })
        }, 400)
    }

    render() {
        if (this.state.data === null) {
            return;
        }
        return (
            <div className='adminmodal2'>
                    <h2 className='adminmodal_h1'>Изменение пользователя</h2>
                    <h3 className='adminmodal_h2'>ФИО</h3>
                    <input className = 'adminPan_modal_input' placeholder={this.state.fullName} onChange={
                        (e) => this.setState({fullName: e.target.value})}/>
                    <h3 className='adminmodal_h2'>Почта</h3>
                    <input className = 'adminPan_modal_input' placeholder={this.state.email} onChange={
                        (e) => this.setState({email: e.target.value})}/>
                    <h3 className='adminmodal_h2'>Телефон</h3>
                    <input className = 'adminPan_modal_input' placeholder={this.state.phone} onChange={
                        (e) => this.setState({phone: e.target.value})}/>
                    <h3 className='adminmodal_h2'>Роль</h3>
                    <select value={this.state.role} className='adminPan_select' onChange={
                        (e) => this.setState({role: e.target.value})}>
                        <option value={'user'} className='CVPan_option'>Сотрудник</option>
                        <option value={'admin'} className='CVPan_option'>Администратор</option>
                        <option value={'departmentHead'} className='CVPan_option'>Глава департамента</option>
                    </select>
                    {this.state.role !== 'user' ? (<>
                        <h3 className='adminmodal_h2'>Название департамента</h3>
                        <input className = 'adminPan_modal_input' placeholder={this.state.departmentName} onChange={
                            (e) => this.setState({departmentName: e.target.value})}/>
                        <h3 className='adminmodal_h2'>География</h3>
                        <input className = 'adminPan_modal_input' placeholder={this.state.description} onChange={
                            (e) => this.setState({description: e.target.value})}/>
                    </>) : (<></>)}
                    <button className='adminPan_save_button' onClick={() => this.updateUserInfo()}>
                    <img src={require('./images/save.svg').default} alt='save'></img>
                    &nbsp;Сохранить
                    </button>
                    <button className='adminPan_otmena_button' onClick={() => this.props.updateData(null)}>
                        Отменить
                    </button>
            </div>
        );
    }
};
        
export default Adminmodal2;    