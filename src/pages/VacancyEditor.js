import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class VacancyEditor extends React.Component {
    constructor(props) {
        super(props)

        axios.get(`http://89.108.103.70/api/Vacancy/${window.location.href.split("/")[4]}`).then((response) => {
            this.setState({
                id: response.data.id,
                departmentId: response.data.departmentId,
                title: response.data.title,
                workExperience: response.data.workExperience,
                salary: response.data.salary,
                description: response.data.description,
                city: response.data.city,
                employmentType: response.data.employmentType,
                // skillList: response.data.skillList
            })
        })

        this.state = {
            id: null,
            authorId: "ab8a64f0-32ea-46b1-950c-c2a8f085d515",
            departmentId: "",
            title: "Название",
            workExperience: 0,
            salary: null,
            description: "",
            city: "Не указан",
            employmentType: 0,
            skillList: [],
            currentSkill: null
        }

        this.updateVacancy = this.updateVacancy.bind(this);
        this.addSkill = this.addSkill.bind(this);
    }

    updateVacancy() {
        if (this.state.id != null)
        {
            axios.put(`http://89.108.103.70/api/Vacancy`, {
                id: this.state.id,
                authorId: this.state.authorId,
                departmentId: this.state.departmentId,
                title: this.state.title,
                workExperience: this.state.workExperience,
                salary: this.state.salary,
                description: this.state.description,
                city: this.state.city,
                employmentType: this.state.employmentType,
                skillList: this.state.skillList
            }).then(this.redirectToMyVacancies)
        } else {
            axios.post(`http://89.108.103.70/api/Vacancy`, {
                authorId: this.state.authorId,
                departmentId: "ec932170-8814-4c2e-a7db-586b386a6dab",
                title: this.state.title,
                workExperience: this.state.workExperience,
                salary: this.state.salary,
                description: this.state.description,
                city: this.state.city,
                employmentType: this.state.employmentType,
                skillList: this.state.skillList
            }).then(this.redirectToMyVacancies)
        }
    }

    redirectToMyVacancies() {
        setTimeout(() => {
          window.location.replace("/MyVacancies");
        }, 200);
    }

    changeEmploymentType = (event) => {
        this.setState({ employmentType: event.target.value });
    }  
    
    changeWorkExperience = (event) => {
        this.setState({ workExperience: event.target.value});
    }

    addSkill = () => {
        if (this.state.currentSkill != null)
        {
            this.state.skillList.push({
                name: this.state.currentSkill
            })

            console.log(this.state.skillList)
            
            this.setState({ currentSkill: null })
        }
    }

    deleteSkill = (name) => {
        this.setState({ skillList: this.state.skillList.filter(skill => skill.name !== name)})
    }

    render () {
        return (
            <div className='vacancy-editor'>
                <h1>Редактор вакансии</h1>

                <h2>Основаная информация</h2>

                <p>Название вакансии</p>
                <input placeholder={this.state.title} onChange={(e) => this.setState({title: e.target.value})}></input>

                <p>Заработная плата (в рублях)</p>
                <input placeholder={this.state.salary} onChange={(e) => this.setState({salary: e.target.value})}></input>

                <p>Требуемый опыт</p>
                <select value={this.state.workExperience} onChange={this.changeWorkExperience}>
                    <option value={0}>Не важно</option>
                    <option value={1}>От 1 до 3 лет</option>
                    <option value={2}>От 4 до 6 лет</option>
                    <option vlaue={3}>Более 6 лет</option>
                </select>
                
                <p>Занятость</p>
                <select value={this.state.employmentType} onChange={this.changeEmploymentType}>
                    <option value={0}>Не указано</option>
                    <option value={1}>Полная занятость</option>
                    <option value={2}>Частичная занятость</option>
                    <option value={3}>Вахта</option>
                    <option value={4}>Удаленная работа</option>
                    <option value={5}>Стажировка</option>
                </select>
                
                <p>География (Город)</p>
                <input placeholder={this.state.city} onChange={(e) => this.setState({city: e.target.value})}></input>

                <h2>Описание</h2>
                <textarea defaultValue={this.state.description} onChange={(e) => this.setState({description: e.target.value})}></textarea>

                <h2>Ключевые навыки</h2>
                <ul className='skills-editor'>
                    {this.state.skillList.map((el) => (
                        <li key={el.id}>{el.name}<img src={require('../components/images/trash.svg').default} alt='delete' className='delete-skill' onClick={() => this.deleteSkill(el.name)}></img></li>
                        ))}
                </ul>
                <input placeholder='Начните вводить навык...' value={this.state.currentSkill ?? ''} onChange={(e) => this.setState({currentSkill: e.target.value})}></input>
                <button className='add-button' onClick={this.addSkill}><img src={require('../components/images/plus.svg').default}></img></button>

                <div className='editor-buttons'>
                        <button type='sumbit' className='editor-button publish-button' onClick={this.updateVacancy}>
                            <img src={require('../components/images/publish.svg').default}></img>
                            Опубликовать
                        </button>
                    <Link to="/MyVacancies">
                        <button className='editor-button'>Отмена</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default VacancyEditor;