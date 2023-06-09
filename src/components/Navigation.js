import React from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from './ImageComponent';

function getOpenedPages(role) {
    if (role === 'user') { 
        return [1, 2, 3]
    }
    if (role === 'departmentHead') { 
        return [1, 2, 3, 4, 5, 6] 
    }
    if (role === 'admin') {
        return [1, 2, 3, 4, 5, 6, 7] 
    }
}

class Navigation extends React.Component {
    constructor (props) {
        super(props)

        this.user = JSON.parse(localStorage.getItem('user'));
        this.userName = this.user ? `${this.user.name} ${this.user.surname}`: 'Профиль';

        this.state = {
            links: [
                {id: 1, name: 'Доска Вакансий', className: '', link: "/BoardOfVacancies"},
                {id: 2, name: 'Избранные вакансии', className: '', link: "/FeaturedVacancies"},
                {id: 3, name: 'Мое резюме', className: '', link: "/CVEditor"},
                {id: 4, name: 'Доска резюме', className: '', link: "/BoardOfCVs"},
                {id: 5, name: 'Мои вакансии', className: '', link: "/MyVacancies"},
                {id: 6, name: 'Отклики', className: '', link: "/CVResponses"},
                {id: 7, name: 'Админ панель', className: '', link: "/AdminPanel"}
            ],
            openedPages: localStorage.getItem('role') !== null ? getOpenedPages(JSON.parse(localStorage.getItem('role')).roleList[0]) : [1]
        }
    }

    changeChosenPage (id = 0) {
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
                    <ImageComponent id={JSON.parse(localStorage.getItem('user')).id} tag='img_ac'/>
                    <Link to="/Account" onClick={() => this.changeChosenPage()}>{this.userName}</Link>
                </div>) :
                (<div className='account'>
                    <Link to="/Login" onClick={() => this.changeChosenPage()}>Логин</Link>
                    <p>/</p>
                    <Link to="/Registration" onClick={() => this.changeChosenPage()}>Регистрация</Link>
                </div>)}
            </header>
        )
    }
}

export default Navigation