import React from 'react';

class VacancyDescription extends React.Component {
    render () {
        return (
            <div className='vacancy-description'>
                <span className='h2-span'>
                    <h2>Требования</h2>
                </span>
                <ul className='aquirements'>
                    <li>Опыт работы <p>1-3 года</p></li>
                    <li>Занятость <p>Полная</p></li>
                    <li>График <p>Полный рабочий день</p></li>
                    <li>Условия <p>Офис</p></li>
                </ul>
                <span className='h2-span'>
                    <h2>Описание</h2>
                </span>
                <p className='description'>
                Наш департамент - это современное технологическое предприятие, которое позволяет B2B-компаниям масштаба страны создавать свои собственные локальные гипермасштабируемые облачные платформы, объединяя предприятия, технические сообщества и общественные организации. Мы предоставляем не только технологии, но и готовую к запуску бизнес-модель, включая настраиваемые инструменты для поддержки, продаж и маркетинга.
                
Что мы предлагаем:
Удаленная работа на результат
Заработная плата по результатам собеседования и навыкам кандидата + бонусы за выполнение сложных задач
Стабильная выплата заработной платы 2 раза в месяц
Все необходимое для комфортной работы — готовые программы, подробные инструкции действий, ответы на все вопросы, база знаний, опытный руководитель. Это как пример описания.
                </p>
                <span className='h2-span'>
                    <h2>Требуемые навыки</h2>
                </span>
                <ul className='skills vacancy-skills'>
                    <li>JavaScript</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Figma</li>
                    <li>VSCode</li>
                    <li>Photoshop</li>
                    <li>C#</li>
                    <li>Node js</li>
                    <li>Adobe</li>
                    <li>Git</li>
                    <li>React</li>
                    <li>мама твоя</li>
                    <li>Webpack</li>
                </ul>
                <p className='upload-date'>Вакансия опубликована 18:22 26.03.2023</p>
            </div>
        )
    }
}

export default VacancyDescription;