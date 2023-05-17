import React from 'react';
import ModalJob1 from './ModalJob1';
import ModalJob2 from './ModalJob2';

const CVpan = () => {
    return (
        <div className='glav_CVPan'>
            <div className='CVPan'> 
                <h1 className='CVPan_h1'>
                    Мое резюме
                </h1>
                <h2 className='CVPanglav_h2'>
                    Основная информация
                </h2>
                <h3 className='CVPan_h3'>
                    ФИО
                </h3>
                <p className='fio_CVpan'><a href=''>ФИО</a></p>
                <h3 className='CVPan_h3'>
                    Дата рождения
                </h3>
                <input className = 'date_CVpan' type="date" id="start" name="trip-start" min="1960-01-01" max="2028-12-31"></input>
                <h3 className='CVPan_h3'>
                    Пол
                </h3>
                <select className='CVPan_select'>
                    <option className='CVPan_option'>Мужской</option>
                    <option className='CVPan_option'>Женский</option>
                    <option className='CVPan_option'>Значение по умолчанию</option>
                </select>
                <h3 className='CVPan_h3'>
                    Место проживания
                </h3>
                <input className = 'CVPan_input1' placeholder='Место проживания'/>
                <h3 className='CVPan_h3'>
                    О себе
                </h3>
                <textarea className = 'CVPan_input2' placeholder='О себе'/>
                <h2 className='CVPan_h2'>
                    Специальность
                </h2>
                <h3 className='CVPan_h3'>
                    Желаемая должность
                </h3>
                <input className = 'CVPan_input1' placeholder='Желаемая должность'/>
                <h3 className='CVPan_h3'>
                    Желаемая зарплата
                </h3>
                <input className = 'CVPan_input1' placeholder='Желаемая зарплата'/>
                <h3 className='CVPan_h3'>
                    Занятость
                </h3>
                <select className='CVPan_select'>
                    <option className='CVPan_option'>Полная занятость</option>
                    <option className='CVPan_option'>Частичная занятость</option>
                    <option className='CVPan_option'>Значение по умолчанию</option>
                    <option className='CVPan_option'>Удаленная работа</option>
                    <option className='CVPan_option'>Вахта</option>
                    <option className='CVPan_option'>Стажировка</option>
                </select>
                <h3 className='CVPan_h3'>
                    Желаемая география
                </h3>
                <input className = 'CVPan_input1' placeholder='Желаемая география'/>
                <h2 className='CVPan_h2'>
                    Опыт работы
                </h2>
                <h3 className='CVPan_h3'>
                    Текущая должность
                </h3>
                <input className = 'CVPan_input1' placeholder='Текущая должность'/>
                <h3 className='CVPan_h3'>
                    Год начала работы
                </h3>
                <input className = 'CVPan_input1' placeholder='Год начала работы'/>
                <h3 className='CVPan_h3'>
                    Предыдущие места работы
                </h3>
                <p className='p_job'> 
                    <a href = ''><img src={require('./images/trash-small.svg').default} alt='save' className='trash-small'></img></a>
                    <p className='h1_p'>Дизайнер</p>
                    <p className='h2_p'>ООО Вкусно</p>
                    <p className='h3_p'>2017-2019</p>
                </p>
                <a className='CVpan_h3_a' href = ''> 
                    <img src={require('./images/plus-small.svg').default} alt='save'></img>
                    &nbsp;Добавить место работы
                </a>
                <h2 className='CVPan_h2'>
                    Образование
                </h2>
                <p className='p_study'> <a href = ''><text className='h2_p'></text></a>
                    <a href = ''><img src={require('./images/trash-small.svg').default} alt='save' className='trash-small2'></img></a>
                    <p className='h1_p'>Высшее</p>
                    <p className='h2_p22'>МГТУ им. Баумана</p>
                    <p className='h3_p'>Программная инженерия</p>
                    <p className='h3_p'>2017-2018</p>
                </p>
                <a className='CVpan_h3_a' href = ''> 
                    <img src={require('./images/plus-small.svg').default} alt='save'></img>
                    &nbsp;Добавить образование
                </a>
                <h2 className='CVPan_h2'>
                    Ключевые навыки
                </h2>
                <button className='CVPan_up_button'>
                    <img src={require('./images/vector-up.svg').default} alt='save'></img>
                    &nbsp;Опубликовать
                </button>
                <button className='CVPan_PDF_button'>
                    <img src={require('./images/vector-down.svg').default} alt='save'></img>
                    &nbsp;Скачать PDF
                </button>
            </div>
            <div className='photo_div'>
                <h2 className='photo_div_h2'>
                    Фото
                </h2>
                <a href=''><img className='img_CV' src={require('./images/deafult-avatar.png')} alt='avatar'></img></a>
                <h2 className='photo_div_h2'>
                    Контакты
                </h2>
                <h3 className='CVPan_h3'>Почта</h3>
                <p className='fio_CVpan'><a href=''>Почта</a></p>
                <h3 className='CVPan_h3'>Телефон</h3>
                <p className='fio_CVpan'><a href=''>Телефон</a></p>
                <h3 className='CVPan_h3'>Ссылки</h3>
                <a className='CVPan_a' href = ''> 
                    <img src={require('./images/pencil-small.svg').default} alt='save'></img>
                    &nbsp;Изменить в профиле пользователя
                </a>
            </div>
            {/* <ModalJob1/> */}
            <ModalJob2/>
        </div>
    );
};

export default CVpan;