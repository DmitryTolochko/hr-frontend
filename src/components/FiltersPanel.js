import React from 'react';
import { filtersData } from '../data/filters';

class FiltersPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filters: JSON.parse(localStorage.getItem('FILTERS')) ?? filtersData
        }

        this.updateRangeQueryList = this.updateRangeQueryList.bind(this)
        // this.handleWorkExperienceChange = this.handleWorkExperienceChange.bind(this)
        // this.handleEmploymentTypeChange = this.handleEmploymentTypeChange.bind(this)
        // this.createRequest = this.createRequest.bind(this)
    }

    changeFiltersState = (type, id) => {
        const newFilters = this.state.filters;
        newFilters[type].map((el) => {
            el.className = el.id === id ? 'filter-active': '';
            return el;
        })
        localStorage.setItem('FILTERS', JSON.stringify(newFilters))
        return newFilters;
    }

    updateRangeQueryList = (name, id) => {
        const newFilters = this.changeFiltersState(name, id)
        this.setState({filters: newFilters})

        const filterParams = {
            fieldName: name,
            minValue: newFilters[name].find((el) => (el.className === 'filter-active')).value ?? 0,
        }

        let rangeQueryList = this.props.options.rangeQueryList ?? []
        if (!rangeQueryList.length) {
            rangeQueryList.push(filterParams)
        }
        else {
            rangeQueryList = rangeQueryList.map((param) => param.fieldName === name ? filterParams : param)
        }
        this.props.stateUpdater(rangeQueryList);           
    } 

    // handleWorkExperienceChange = (id) => {
    //     this.setState((prevState) => {
    //         const elements = prevState.workExperience.map((el) => this.changeSetting(el, id))
    //         return { workExperience: elements }
    //     })
    // } 

    // handleEmploymentTypeChange = (id) => {
    //     this.setState((prevState) => {
    //         const elements = prevState.employmentType.map((el) => this.changeSetting(el, id))
    //         return { employmentType: elements }
    //     })
    // } 


    render() {
        return (
            <div className='filters-panel'>
                <h3>Фильтры</h3>
                <h4>Уровень дохода</h4>
                <ul className='filter-list'>
                    {this.state.filters.salary.map((el) => (
                        <li className={el.className} key={el.id} onClick={() => this.updateRangeQueryList('salary', el.id)}><a>{el.name}</a></li>
                    ))}
                </ul>
                {/* <h4>Опыт работы</h4>
                <ul className='filter-list'>
                    {this.state.filters.workExperience.map((el) => (
                        <li className={el.className} key={el.id} onClick={() => this.handleWorkExperienceChange(el.id)}><a>{el.name}</a></li>
                    ))}
                </ul> */}
                {/* <h4>Занятость</h4>
                <ul className='filter-list'>
                    {this.state.employmentType.map((el) => (
                        <li className={el.className} key={el.id} onClick={() => this.handleEmploymentTypeChange(el.id)}><a>{el.name}</a></li>
                    ))}
                </ul> */}
                {/* <h4>Город</h4> */}
                {/* <button onClick={this.createRequest}>Искать</button> */}
            </div>
        );
    }
};

export default FiltersPanel;
