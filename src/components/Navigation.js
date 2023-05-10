import React from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class Navigation extends React.Component {
    constructor (props) {
        super(props)
        // this.refreshToken()

        this.state = {
            links: [
                {id: 1, name: 'Мое резюме', className: '', link: "/CVEditor", status: localStorage.getItem('user') !== null ? 0 : 1},
                {id: 2, name: 'Избранные вакансии', className: '', link: "/FeaturedVacancies", status: localStorage.getItem('user') !== null ? 0 : 1},
                {id: 3, name: 'Доска Вакансий', className: '', link: "/BoardOfVacancies", status: 0},
                {id: 4, name: 'Админ панель', className: '', link: "/AdminPanel", status: localStorage.getItem('user') !== null ? 0 : 1},
                {id: 5, name: 'Доска резюме', className: '', link: "/BoardOfCVs", status: localStorage.getItem('user') !== null ? 0 : 1},
                {id: 6, name: 'Мои вакансии', className: '', link: "/MyVacancies", status: localStorage.getItem('user') !== null ? 0 : 1},
                {id: 7, name: 'Отклики', className: '', link: "/CVResponses", status: localStorage.getItem('user') !== null ? 0 : 1},
            ],
        }
    }

    changeChosenPage (id) {
        this.setState((prevState) => {
            const updatedLinks = prevState.links.map((el) => {
              if (el.id === id) {
                el.className = 'chosen-page';
              } else {
                el.className = '';
              }
              return el;
            });
            return { links: updatedLinks };
        })
    }

    render () {
        return (
            <header className='navigation'>
                <img src={require('./images/logo.png')} alt='logo'/>
                <ul className='main-menu'>
                    {this.state.links.filter((el) => el.id < 4 && el.status == 0).map((el) => (
                        <li key={el.id} className={el.className}><Link to={el.link} onClick={() => this.changeChosenPage(el.id)}>{el.name}</Link></li>
                    ))}
                    {localStorage.getItem('user') !== null ?
                    (<li className='more'>Ещё<img src={require('./images/arrow-down.svg').default}/>
                        <ul className="submenu">
                            {this.state.links.filter((el) => el.id > 3 && el.status == 0).map((el) => (
                                <li key={el.id} className={el.className}><Link to={el.link} onClick={() => this.changeChosenPage(el.id)}>{el.name}</Link></li>
                            ))}
                        </ul>
                    </li>) : (<></>)}
                </ul>
                {localStorage.getItem('user') !== null ? 
                (<div className='account'>
                    <img src={require('./images/deafult-avatar.png')} alt='avatar'/>
                    <Link to="/Account">Профиль пользователя</Link>
                </div>) :
                (<div className='account'>
                    <Link to="/Login">Логин</Link>
                    <p>/</p>
                    <Link to="/Registration">Регистрация</Link>
                </div>)}
            </header>
        )
    }
}

export default Navigation