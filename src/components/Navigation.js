import React from 'react';
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements.js";

class Navigation extends React.Component {
    render () {
        return (
            <div>
                <Nav>
                    <NavMenu>
                        <NavLink to="/CVEditor">Ваше резюме</NavLink>
                        <NavLink to="/FeaturedVacancies">Избранные вакансии</NavLink>
                        <NavLink to="/BoardOfVacancies">Доска Вакансий</NavLink>
                        <NavLink to="/MyVacancies">Мои вакансии</NavLink>
                        <NavLink to="/AdminPanel">Админ панель</NavLink>
                        <NavLink to="/BoardOfCVs">Доска резюме</NavLink>
                        <NavLink to="/Account">Профиль пользователя</NavLink>
                        <NavLink to="/Login">Логин</NavLink>
                        <NavLink to="/Registration">Регистрация</NavLink>
                    </NavMenu>
                </Nav>
            </div>
        )
    }
}

export default Navigation