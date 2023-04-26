import React from 'react';

class FiltersPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            salary: [
                {id: 1, name: 'Не имеет значения', className: '', value: null},
                {id: 2, name: 'От 20 000 руб.', className: '', value: 20000},
                {id: 3, name: 'От 50 000 руб.', className: '', value: 50000},
                {id: 4, name: 'От 70 000 руб.', className: '', value: 70000},
                {id: 5, name: 'От 100 000 руб.', className: '', value: 100000},
            ],

            workExperience: [
                {id: 1, name: 'Не имеет значения', className: '', value: null},
                {id: 2, name: 'От 1 до 3 лет', className: '', value: '1 3'},
                {id: 3, name: 'От 4 до 6 лет', className: '', value: '4 6'},
                {id: 4, name: 'Больше 6 лет', className: '', value: '6 100'},
            ],

            employmentType: [
                {id: 1, name: 'Не имеет значения', className: ''},
                {id: 2, name: 'Полная занятость', className: ''},
                {id: 3, name: 'Частичная занятость', className: ''},
                {id: 4, name: 'Вахта', className: ''},
                {id: 5, name: 'Удаленная работа', className: ''},
                {id: 6, name: 'Стажировка', className: ''},
            ],

            containsQueryList: [],
            equalsQueryList: [],
            rangeQueryList: [],
        }

        this.changeSetting = this.changeSetting.bind(this)
        this.handleSalaryChange = this.handleSalaryChange.bind(this)
        this.handleWorkExperienceChange = this.handleWorkExperienceChange.bind(this)
        this.handleEmploymentTypeChange = this.handleEmploymentTypeChange.bind(this)
        this.createRequest = this.createRequest.bind(this)
    }


    changeSetting = (el, id) => {
        if (el.id === id) {
            el.className = 'filter-active';
        } else {
            el.className = '';
        }
        return el;
    }

    handleSalaryChange = (id) => {
        this.setState((prevState) => {
            const elements = prevState.salary.map((el) => this.changeSetting(el, id))
            return { salary: elements }
        })
    } 

    handleWorkExperienceChange = (id) => {
        this.setState((prevState) => {
            const elements = prevState.workExperience.map((el) => this.changeSetting(el, id))
            return { workExperience: elements }
        })
    } 

    handleEmploymentTypeChange = (id) => {
        this.setState((prevState) => {
            const elements = prevState.employmentType.map((el) => this.changeSetting(el, id))
            return { employmentType: elements }
        })
    } 

    createRequest() {
        let salarySetting = this.state.salary.filter((el) => (el.className === 'filter-active'))
        let WESetting = this.state.workExperience.filter((el) => (el.className === 'filter-active'))
        let ETSetting = this.state.employmentType.filter((el) => (el.className === 'filter-active'))
        if (salarySetting !== null && salarySetting.value !== null) {
            let salary = {
                fieldName: "salary",
                minValue: salarySetting[0].value,
            }
            this.setState((prevState) => {
                let list = prevState.rangeQueryList
                if (list.length == 0) {list.push(salary)}
                else {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].fieldName === salary.fieldName) {
                            list[i] = salary;
                            break;
                        } else {
                            list.push(salary);
                            break;
                        }
                    }
                }
                console.log(JSON.stringify(list))
                return { rangeQueryList: JSON.stringify(list)}
            })
        }
        this.props.onFilterApplied(this.state)
    }

    render() {
        return (
            <div className='filters-panel'>
                <h3>Фильтры</h3>
                <h4>Уровень дохода</h4>
                <ul className='filter-list'>
                    {this.state.salary.map((el) => (
                        <li className={el.className} key={el.id} onClick={() => this.handleSalaryChange(el.id)}><a>{el.name}</a></li>
                    ))}
                </ul>
                <h4>Опыт работы</h4>
                <ul className='filter-list'>
                    {this.state.workExperience.map((el) => (
                        <li className={el.className} key={el.id} onClick={() => this.handleWorkExperienceChange(el.id)}><a>{el.name}</a></li>
                    ))}
                </ul>
                <h4>Занятость</h4>
                <ul className='filter-list'>
                    {this.state.employmentType.map((el) => (
                        <li className={el.className} key={el.id} onClick={() => this.handleEmploymentTypeChange(el.id)}><a>{el.name}</a></li>
                    ))}
                </ul>
                {/* <h4>Город</h4> */}
                <button onClick={this.createRequest}>Искать</button>
            </div>
        );
    }
};

export default FiltersPanel;
