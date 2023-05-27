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
                skillList: response.data.skillList
            })
        }).catch()

        this.state = {
            id: null,
            authorId: JSON.parse(localStorage.getItem('user')).id,
            departmentId: "",
            title: "",
            workExperience: 0,
            salary: null,
            description: "",
            city: "",
            employmentType: 0,
            skillList: [],
            skills: []
        }

        this.skillsInputRef = React.createRef();

        this.updateVacancy = this.updateVacancy.bind(this);
        this.addSkill = this.addSkill.bind(this);
    }

    componentDidMount() {
        axios.get('http://89.108.103.70/api/skill/get-all')
            .then((response) => {
                this.setState({skills: response.data})
        })
    }

    refreshToken() {
        if (localStorage.getItem('tokens') !== null) {
            let date = new Date(JSON.parse(localStorage.getItem('tokens')).expirationTime)
            let now = new Date();
            let diffInMinutes = Math.floor((date - now) / 60000);
            if (diffInMinutes <= 5) {
                axios.post('http://89.108.103.70/api/Auth/update-token', {
                    'accessToken': JSON.parse(localStorage.getItem('tokens')).accessToken,
                    'refreshToken': JSON.parse(localStorage.getItem('tokens')).refreshToken,
                })
                .then((response) => {
                    localStorage.setItem('tokens',JSON.stringify(response.data))
                    this.updateVacancy()
                })
                .catch( function (error) {
                    if (error.response) {
                        localStorage.removeItem('tokens')
                        localStorage.removeItem('user')
                        localStorage.removeItem('role')
                        window.location.replace("/Login")
                    }
                })
            }
            else {
                this.updateVacancy()
            }
        } 
        else {
            window.location.replace("/Login")
        }
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
                skillIdList: this.state.skillList.map(skill => skill.id)
            }).then(this.redirectToMyVacancies)
        } else {
            axios.post(`http://89.108.103.70/api/Vacancy`, {
                authorId: this.state.authorId,
                departmentId: JSON.parse(localStorage.getItem('user')).departmentId,
                title: this.state.title,
                workExperience: this.state.workExperience,
                salary: this.state.salary,
                description: this.state.description,
                city: this.state.city,
                employmentType: this.state.employmentType,
                skillIdList: this.state.skillList.map(skill => skill.id)
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

    addSkill = (event) => {
        if(event.key === 'Enter' || event.key === 'Unidentified') {
            const value = this.skillsInputRef.current.value;
            const skill = this.state.skills.find(skill => skill.name === value)
            if(skill) {
                const skillList = this.state.skillList;
                skillList.push(skill)
                this.setState({ skillList: [...new Set(skillList)] })
                console.log(skillList)
                this.skillsInputRef.current.value = '';
            }
        }
    }

    deleteSkill = (name) => {
        this.setState({ skillList: this.state.skillList.filter((skill) => skill.name !== name)})
    }

    render () {
        return (
            <div className='vacancy-editor'>
                <h1>Редактор вакансии</h1>

                <h2>Основаная информация</h2>

                <p>Название вакансии</p>
                <input value={this.state.title} placeholder="Введите название" onChange={(e) => this.setState({title: e.target.value})}></input>

                <p>Заработная плата</p>
                <input value={this.state.salary} placeholder="Укажите зарплату в рублях" onChange={(e) => this.setState({salary: e.target.value})}></input>

                <p>Требуемый опыт</p>
                <select value={this.state.workExperience} onChange={this.changeWorkExperience}>
                    <option value={0}>Не важно</option>
                    <option value={1}>От 1 до 3 лет</option>
                    <option value={2}>От 3 до 6 лет</option>
                    <option value={3}>Более 6 лет</option>
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
                
                <p>География</p>
                <input placeholder='Город или населённый пункт' value={this.state.city} onChange={(e) => this.setState({city: e.target.value})}></input>

                <h2>Описание</h2>
                <textarea placeholder='Расскажите о вакансии' defaultValue={this.state.description} onChange={(e) => this.setState({description: e.target.value})}></textarea>

                <h2>Ключевые навыки</h2>
                <ul className='skills-editor'>
                    {this.state.skillList.map((el) => (
                        <li key={el.id}>{el.name}<img src={require('../components/images/trash.svg').default} alt='delete' className='delete-skill' onClick={() => this.deleteSkill(el.name)}></img></li>
                        ))}
                </ul>
                <input ref={this.skillsInputRef} list="skillsList" type="text" placeholder='Введите навык' onKeyUp={(ev) => this.addSkill(ev)}></input>
                {this.state.skills && 
                    <datalist id="skillsList">
                        {this.state.skills.map((skill, id) =>
                        <option key={id} value={skill.name} />
                        )}
                    </datalist>
                }

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