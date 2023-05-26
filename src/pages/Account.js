import React from 'react';
import AccountPan from '../components/AccountPan';


class Account extends React.Component {
    
    logOut() {
        localStorage.removeItem('tokens')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
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
