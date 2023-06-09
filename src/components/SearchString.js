import React from 'react';

class SearchString extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data: null
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.props.method(this.state.data)
        }
    }

    render() {
        return (
            <div className='search-form' >
                <input name='s' placeholder='Поиск' type='text' onChange={e => this.setState({data: e.target.value})} onKeyDown={this.handleKeyDown}></input>
                <button className='search-button' type='button' onClick={() => this.props.method(this.state.data)}>Найти</button>
            </div>
        );
    }
};

export default SearchString;
