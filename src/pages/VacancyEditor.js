import React from 'react';
import { Link } from 'react-router-dom';

class VacancyEditor extends React.Component {
    render () {
        return (
            <div className='vacancy-editor'>
                <h1>Редактор вакансии</h1>

                <h2>Основаная информация</h2>

                <p>Название вакансии</p>
                <input placeholder='Название'></input>

                <p>Заработная плата</p>
                <input placeholder='000 000 р.'></input>

                <p>Требуемый опыт</p>
                <select>
                    <option>Не важно</option>
                    <option>От 1 до 3 лет</option>
                    <option>От 4 до 6 лет</option>
                    <option>Более 6 лет</option>
                </select>
                
                <p>Занятость</p>
                <select>
                    <option>Полная занятость</option>
                    <option>Частичная занятость</option>
                    <option>Вахта</option>
                    <option>Удаленная работа</option>
                    <option>Стажировка</option>
                </select>
                
                <p>География</p>
                <select>
                    <option>Москва</option>
                    <option>Екатеринбург</option>
                    <option>Санкт-Петербург</option>
                    <option>Казань</option>
                </select>

                <p>Условия</p>
                <input placeholder='Метро рядом'></input>

                <h2>Описание</h2>
                <textarea>
                    Наш департамент - это современное технологическое предприятие, которое позволяет B2B-компаниям масштаба 
                    страны создавать свои собственные локальные гипермасштабируемые облачные платформы, объединяя предприятия, 
                    технические сообщества и общественные организации. Мы пред..
                </textarea>

                <h2>Ключевые навыки</h2>
                <ul className='skills-editor'>
                    <li>Figma<img src={require('../components/images/trash.svg').default} alt='delete' className='delete-skill'></img></li>
                    <li>Adobe<img src={require('../components/images/trash.svg').default} alt='delete' className='delete-skill'></img></li>
                    <li>React<img src={require('../components/images/trash.svg').default} alt='delete' className='delete-skill'></img></li>
                    <li>Node js<img src={require('../components/images/trash.svg').default} alt='delete' className='delete-skill'></img></li>
                </ul>
                <input placeholder='Начните вводить навык...'></input>
                <button className='add-button'><img src={require('../components/images/plus.svg').default}></img></button>

                <div className='editor-buttons'>
                    <button type='submit' className='editor-button publish-button'>
                        <img src={require('../components/images/publish.svg').default}></img>
                        Опубликовать
                    </button>
                    <Link to="/MyVacancies">
                        <button type='submit' className='editor-button'>Отмена</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default VacancyEditor;