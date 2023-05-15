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
            user: null
        }

        this.getUsers = this.getUsers.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get('http://89.108.103.70/api/user/get-all').then((response) => {
            this.setState({data: response.data})
        })
    }

    getUserInfo(info) {
        this.setState({user: info})
    }

    render() {
        if (this.state.data === null) {
            return;
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
                {this.state.user !== null ? (<AdminLK data={this.state.user}/>) : (<></>)}
                <div class="dark-overlay"></div>
                <Adminmodal1/> 
                <Adminmodal2/> 
            </div>
        );
    }
};
    
export default AdminPan;