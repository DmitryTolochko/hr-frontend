import React from 'react';
import SearchString from '../components/SearchString';
import PeopleCard from '../components/PeopleCard';
import AdminLK from '../components/AdminLK';
import Adminmodal1 from './Adminmodal1';
import Adminmodal2 from './Adminmodal2';
import axios from 'axios';

class AdminPan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            user: null,
            modalData: null,
            role: null
        }

        this.getUsers = this.getUsers.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
        this.updateModalData = this.updateModalData.bind(this)
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
                    this.getUsers()
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
                this.getUsers()
            }
        } 
        else {
            window.location.replace("/Login")
        }
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('role'))?.roleList[0] !== 'admin') {
            window.location.replace("/BoardOfVacancies")
        }
        this.refreshToken()
    }

    getUsers() {
        axios.get('http://89.108.103.70/api/user/get-all').then((response) => {
            this.setState({data: response.data})
        })
    }

    getUserInfo(info) {
        this.setState({user: info})
        setTimeout(() => {
            if (info !== null) {
                axios.get(`http://89.108.103.70/api/user/role/${info.id}`).then((resp) => {
                    this.setState({role: resp.data.roleList[0]});
                })
            }
        }, 3);
    }

    updateModalData(info) {
        this.setState({modalData: info});
    }

    render() {
        if (this.state.data === null) {
            return (
                <div className='loader-wrapper'>
                    <div className='loader'></div>
                </div>
            )
        }
        return (
            <div className='glavAdmin'>
                <div className='adminPan'>
                    <div className='SearchStringadmin'><SearchString width='650px'/></div>
                    <div className='zaglav'>
                        <text className='tabletext'>Аватар</text>
                        <text className='tabletext1'>ФИО</text>
                        <text className='tabletext2'>Почта</text>
                        <text className='tabletext3'>Роль</text>
                    </div>
                    {this.state.data.userList.map((el) => (<a onClick={() => this.getUserInfo(el)}><PeopleCard data={el}/></a>))}
                </div>
                {this.state.user !== null && this.state.role !== null ? (<AdminLK data={this.state.user} role={this.state.role}  updateData={this.updateModalData}/>) : (<></>)}
                {this.state.modalData !== null ? (<div class="dark-overlay"></div>) : (<></>)}
                <Adminmodal2 data={this.state.modalData} role={this.state.role} updateData={this.updateModalData}/> 
            </div>
        );
    }
};
    
export default AdminPan;