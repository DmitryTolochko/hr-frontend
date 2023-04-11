import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render () {
        return (
            <header className='navigation'>
                <ul>
                    <li><Link to="/CVEditor">Ваше резюме</Link></li>
                    <li><Link to="/FeaturedVacancies">Избранные вакансии</Link></li>
                    <li><Link to="/BoardOfVacancies">Доска Вакансий</Link></li>
                    <li><Link to="/MyVacancies">Мои вакансии</Link></li>
                    <li><Link to="/AdminPanel">Админ панель</Link></li>
                    <li><Link to="/BoardOfCVs">Доска резюме</Link></li>
                    <li><Link to="/Account">Профиль пользователя</Link></li>
                    <li><Link to="/Login">Логин</Link></li>
                    <li><Link to="/Registration">Регистрация</Link></li>
                </ul>
            </header>
        )
    }
}

export default Navigation