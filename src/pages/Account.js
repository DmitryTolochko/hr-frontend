import React from 'react';
import AccountPan from '../components/AccountPan';
import axios from 'axios'


class Account extends React.Component {
    
    async logOut() {
        localStorage.removeItem('tokens')
        localStorage.removeItem('user')
        localStorage.removeItem('role')

        await axios.post(`http://89.108.103.70/api/auth/logout`)

        window.location.replace("/Login")
    }
   

    render () {
        return (
            <div>
                <AccountPan/>
                <button className='logout' onClick={() => this.logOut()}>
                        Выйти из аккаунта
                </button>
            </div>
        );
    }
};

export default Account;
