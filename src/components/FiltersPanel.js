import React from 'react';
import { filtersData } from '../data/filters';

class FiltersPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filters: JSON.parse(localStorage.getItem('FILTERS')) ?? filtersData
        }

        this.updateRangeQueryList = this.updateRangeQueryList.bind(this)
        this.updateEqualsQueryList = this.updateEqualsQueryList.bind(this)
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

        const options = this.props.options
        const rangeQueryList = options.rangeQueryList ?? []
        const newRangeQueryList = rangeQueryList.filter((param) => param.fieldName !== name)

        newRangeQueryList.push(filterParams)

        options.rangeQueryList = newRangeQueryList;
        this.props.stateUpdater(options);           
    } 

    updateEqualsQueryList = (name, id) => {
        const newFilters = this.changeFiltersState(name, id)
        this.setState({filters: newFilters})

        const filterParams = {
            fieldName: name,
            value: newFilters[name].find((el) => (el.className === 'filter-active')).value,
        }

        const options = this.props.options
        const equalsQueryList = options.equalsQueryList ?? []

        const newEqualsQueryList = equalsQueryList.filter((param) => param.fieldName !== name)

        if (filterParams.value) {
            newEqualsQueryList.push(filterParams)
        }
        options.equalsQueryList = newEqualsQueryList;
        this.props.stateUpdater(options);           
    } 

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
                <h4>Опыт работы</h4>
                <ul className='filter-list'>
                    {this.state.filters.workExperience.map((el) => (
                        <li className={el.className} key={el.id} onClick={() => this.updateEqualsQueryList('workExperience', el.id)}><a>{el.name}</a></li>
                    ))}
                </ul>
                <h4>Занятость</h4>
                <ul className='filter-list'>
                    {this.state.filters.employmentType.map((el) => (
                        <li className={el.className} key={el.id} onClick={() => this.updateEqualsQueryList('employmentType', el.id)}><a>{el.name}</a></li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default FiltersPanel;
