import React from 'react';

const SearchString = () => {
    return (
        <form className='search-form'>
            <input name='s' placeholder='Поиск' type='search'></input>
            <button type='submit'>Найти</button>
        </form>
    );
};

export default SearchString;
