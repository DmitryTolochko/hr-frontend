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

            role: '',
            departmentName: null,
            description: null,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ 
                data: this.props.data,
                fullName: this.props.data?.surname + ' ' + this.props.data?.name + ' ' + this.props.data?.patronymic,
                email: this.props.data?.email,
                phone: this.props.data?.phone,
                role: this.props.role
            });
        }
        console.log(this.state)
    }

    updateUserInfo() {
        axios.put(`http://89.108.103.70/api/user`, {
            id: this.state.data.id,
            surname: this.state.fullName.split(' ')[0],
            name: this.state.fullName.split(' ')[1],
            patronymic: this.state.fullName.split(' ')[2],
            email: this.state.email,
            phone: this.state.phone,
            github: this.state.data.github,
            telegram: this.state.data.telegram,
        }).then(() => this.props.updateData(null),  setTimeout(() => {
            window.location.replace("/AdminPanel");
          }, 200))

        axios.put(`http://89.108.103.70/api/user/role`, {
            userId: this.state.data.id,
            roleName: this.state.role
        })

        // let isUpdated = false
        // axios.get(`http://89.108.103.70/api/department/get-all`).then((resp) => {
        //     for (let departmentInfo in resp.data.departmentList) {
        //         if (this.state.data.id === departmentInfo.head.id) {
        //             axios.put(`http://89.108.103.70/api/department`, {
        //                 id: departmentInfo.id,
        //                 name: this.state.departmentName,
        //                 description: this.state.description,
        //                 headId: this.state.data.id
        //             });

        //             break;
        //         }
        //     }
        // })

        
        // axios.post(`http://89.108.103.70/api/department`, {
        //     name: this.state.departmentName,
        //     description: this.state.description,
        //     headId: this.state.data.id
        // })
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