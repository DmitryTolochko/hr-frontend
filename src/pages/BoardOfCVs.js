import React from 'react';
import SearchString from '../components/SearchString';
import FiltersPanel from '../components/FiltersPanel';
import CVCard from '../components/CVCard';
import axios from 'axios'

class BoardOfCVs extends React.Component {
    constructor(props) {
        super(props)

        axios.get('http://89.108.103.70/api/Resume/get-all').then((response) => {
            this.setState({data: response.data.resumeList})
        })

        this.state = {
            data: [
            ]
        }
    }

    render() {
        if (!this.state.data.length) {
            return (
                <div className='loader-wrapper'>
                        <div className='loader'></div>
                </div>
            )
        }
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel/>
                <div className='board'>
                    <SearchString width='703px'/>
                    {this.state.data.map((el) => (<div key={el.id}><CVCard animatedClass='animated-card' cardInfo={el}/></div>))}
                </div>
            </div>
        );
    }
};

export default BoardOfCVs;
