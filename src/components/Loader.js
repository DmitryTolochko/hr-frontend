import React from 'react';

const Loader = (props) => {
    if (props.isLoading) {
        return (
            <div className='loader'></div>
        );
    }
    return;
};

export default Loader;