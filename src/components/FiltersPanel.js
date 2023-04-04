import React from 'react';

const FiltersPanel = () => {
    return (
        <div className='filters-panel'>
            <h3>Фильтры</h3>
            <h4>Уровень дохода</h4>
            <ul className='filter-list'>
                <li className='filter-active'><a>Не имеет значения</a></li>
                <li><a>От 20 000 руб.</a></li>
                <li><a>От 50 000 руб.</a></li>
            </ul>
            <h4>Опыт работы</h4>
            <ul className='filter-list'>
                <li className='filter-active'><a>Не имеет значения</a></li>
                <li><a>Нет опыта</a></li>
                <li><a>От 1 до 3 лет</a></li>
                <li><a>От 4 до 6 лет</a></li>
            </ul>
        </div>
    );
};

export default FiltersPanel;
