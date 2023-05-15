import React from 'react';

const SearchString = (props) => {
    return (
        <form className='search-form'>
            <input name='s' placeholder='Поиск' type='search'></input>
            <button className='search-button' type='submit'>Найти</button>
        </form>
    );
};

export default SearchString;
