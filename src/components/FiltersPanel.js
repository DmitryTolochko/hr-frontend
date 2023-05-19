import React from 'react';
import {ReactComponent as ClearIcon} from '../components/images/trash-small.svg';
import { filtersData } from '../data/filters';
import axios from 'axios';

class FiltersPanel extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            filters: JSON.parse(localStorage.getItem('FILTERS')) ?? filtersData
        }

        this.skillsInputRef = React.createRef();

        this.updateRangeQueryList = this.updateRangeQueryList.bind(this);
        this.updateEqualsQueryList = this.updateEqualsQueryList.bind(this);
        this.clearSkills = this.clearSkills.bind(this);
    }

    componentDidMount() {
        axios.get('http://89.108.103.70/api/skill/get-all')
            .then((response) => {
                this.setState({skills: response.data.map((skill => skill.name))})
        })
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

    addSkill(event) {
        if(event.key === 'Enter' || event.key === 'Unidentified') {
            const value = this.skillsInputRef.current.value;
            if(this.state.skills.includes(value)) {
                const filters = this.state.filters;
                filters.skills.push(value);
                filters.skills = [...new Set(filters.skills)];
                
                localStorage.setItem('FILTERS', JSON.stringify(filters))
                this.setState({filters: filters})

                this.skillsInputRef.current.value = '';
            }
        }
    }

    clearSkills = () => {
        const filters = this.state.filters;
        filters.skills = []

        localStorage.setItem('FILTERS', JSON.stringify(filters))
        this.setState({filters: filters})
    }

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
                <h4>Навыки</h4>
                <input ref={this.skillsInputRef} className="filters-panel__input" list="skillsList" type="text" placeholder='Введите навык' onKeyUp={(el) => this.addSkill(el)}></input>
                {this.state.skills && 
                    <datalist id="skillsList">
                        {this.state.skills.map((skill, id) =>
                        <option key={id} value={skill} />
                        )}
                    </datalist>
                }
                <div className="filters-panel__skills">
                    {
                        this.state.filters.skills.map((skill) => 
                        <div className="filters-panel__skills-item">{skill}</div>
                        )
                    }
                </div>
                {!!this.state.filters.skills.length && 
                    <button className="filters-panel__clear" onClick={this.clearSkills}>
                    <ClearIcon className='filters-panel__clear-icon'/>
                        Очистить
                    </button>
                }
            </div>
        );
    }
};

export default FiltersPanel;
