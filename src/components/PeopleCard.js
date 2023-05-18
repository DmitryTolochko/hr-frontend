import React from 'react';
import axios from 'axios';

function getRoleName(role) {
    if (role === 'user') {
        return 'Сотрудник'
    }
    else if (role === 'admin') {
        return 'Администратор'
    }
    else {
        return 'Глава департамента'
    }
}

class PeopleCard extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            data: props.data,
            role: null
        }
        setTimeout(() => {
            axios.get(`http://89.108.103.70/api/user/role/${this.state.data.id}`).then((resp) => {
                this.setState({role: resp.data.roleList[0]});
            })
        }, 3)
    }

    render() {
        return (
            <div className='people'>
                <img className='img_adm' src={require('./images/deafult-avatar.png')} alt='avatar'></img>
                <p className='peopletext'>{this.state.data.surname + ' ' + this.state.data.name + ' ' + this.state.data.patronymic}</p>
                <p className='peopletext'>{this.state.data.email}</p>
                <p className='peopletext peoplerole'>{getRoleName(this.state.role)}</p>
            </div>
        );
    }
};
    
export default PeopleCard;
