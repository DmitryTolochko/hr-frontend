import React from 'react';
import { Link } from 'react-router-dom';

function getOpenedPages(role) {
    if (role === 'user') { 
        return [1, 2, 3]
    }
    if (role === 'departmentHead') { 
        return [1, 2, 3, 5, 6, 7] 
    }
    if (role === 'admin') {
        return [1, 2, 3, 4, 5, 6, 7] 
    }
}

class Navigation extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            links: [
                {id: 1, name: 'Мое резюме', className: '', link: "/CVEditor"},
                {id: 2, name: 'Избранные вакансии', className: '', link: "/FeaturedVacancies"},
                {id: 3, name: 'Доска Вакансий', className: '', link: "/BoardOfVacancies"},
                {id: 4, name: 'Админ панель', className: '', link: "/AdminPanel"},
                {id: 5, name: 'Доска резюме', className: '', link: "/BoardOfCVs"},
                {id: 6, name: 'Мои вакансии', className: '', link: "/MyVacancies"},
                {id: 7, name: 'Отклики', className: '', link: "/CVResponses"},
            ],
            openedPages: localStorage.getItem('role') !== null ? getOpenedPages(JSON.parse(localStorage.getItem('role')).roleList[0]) : [3]
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
                    {this.state.links.filter((el) => el.id < 4 && this.state.openedPages.includes(el.id)).map((el) => (
                        <li key={el.id} className={el.className}><Link to={el.link} onClick={() => this.changeChosenPage(el.id)}>{el.name}</Link></li>
                    ))}
                    {this.state.openedPages.length > 4 ?
                    (<li className='more'>Ещё<img src={require('./images/arrow-down.svg').default}/>
                        <ul className="submenu">
                            {this.state.links.filter((el) => el.id > 3 && this.state.openedPages.includes(el.id)).map((el) => (
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