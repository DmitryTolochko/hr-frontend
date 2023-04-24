import React from 'react';
import SearchString from '../components/SearchString';
import VacancyCardEdit from '../components/VacancyCardEdit';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MyVacancies extends React.Component {
    constructor(props) {
        super(props)

        axios.post(`http://89.108.103.70/api/Vacancy/get-all-filter`, {
            "containsQueryList": [
                {
                  "fieldName": "authorId",
                  "values": [
                    "ab8a64f0-32ea-46b1-950c-c2a8f085d515"
                  ]
                }
              ],
        }).then((response) => this.setState({data: response.data.filteredVacancyList}))

        this.state = {
            data: []
        }
    }
    render() {
        return (
            <div>
                <div className='board'>
                    <div className='search-box'>
                        <SearchString width='470px'/>
                        <Link to="/VacancyEditor/0">
                            <button className='search-button'>
                                <img src={require('../components/images/plus.svg').default} style={{width: "17px", height: "17px"}}></img>Добавить
                            </button>
                        </Link>
                    </div>
                    {this.state.data.map((el) => (<div key={el.id}><VacancyCardEdit cardInfo={el} animatedClass='animated-card'/></div>))}
                </div>
            </div>
        );
    }
};

export default MyVacancies;
