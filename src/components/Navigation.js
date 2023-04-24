import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render () {
        return (
            <header className='navigation'>
                <img src={require('./images/logo.png')} alt='logo'/>
                <ul className='main-menu'>
                    <li className='chosen-page'><Link to="/CVEditor">Мое резюме</Link></li>
                    <li><Link to="/FeaturedVacancies">Избранные вакансии</Link></li>
                    <li><Link to="/BoardOfVacancies">Доска Вакансий</Link></li>
                    
                    {/* <li><Link to="/Login">Логин</Link></li>
                    <li><Link to="/Registration">Регистрация</Link></li> */}
                    <li className='more'>Ещё<img src={require('./images/arrow-down.svg').default}/>
                        <ul className="submenu">
                            <li><Link to="/AdminPanel">Админ панель</Link></li>
                            <li><Link to="/BoardOfCVs">Доска резюме</Link></li>
                            <li><Link to="/MyVacancies">Мои вакансии</Link></li>
                            <li><Link to="/CVResponses">Отклики</Link></li>
                        </ul>
                    </li>
                </ul>
                <div className='account'>
                    <img src={require('./images/deafult-avatar.png')} alt='avatar'/>
                    <Link to="/Account">Профиль пользователя</Link>
                </div>
            </header>
        )
    }
}

export default Navigation