import React from 'react';
import ModalJob1 from './ModalJob1';
import ModalJob2 from './ModalJob2';
import axios from 'axios'
import { Link } from 'react-router-dom';

let educationTypes = {
    0: 'Не указано',
    1: 'Высшее (Специалитет, магистратура)',
    2: 'Высшее (Бакалавриат)',
    3: 'Среднее профессиональное',
    4: 'Высшее (Подготовка кадров высшей квалификации)',
    5: 'Дополнительное профессиональное',
    6: 'Среднее общее'
}

class CVpan extends React.Component {
    constructor(props) {
        super(props)

        this.state ={
            id: null,
            title: "Желаемая должность",
            author: null,
            birthDate: null,
            gender: 0,
            city: "Не указан",
            workExperience: 5,
            description: "",
            desiredPost: "default",
            desiredSalary: null,
            hasHigherEducation: true,
            hasSecondaryEducation: true,
            employmentType: 0,
            jobDataList: [],
            educationDataList: [],
            skillList: [],
            skills: [],

            currentJobPost: null,
            currentJobName: null,
            currentJobYear: null,

            isDraft: true,
            firstInitialization: false,

            addNewJobFlag: false,
            addNewEducationFlag: false,
        }

        this.createResume = this.createResume.bind(this)
        this.addNewJob = this.addNewJob.bind(this)
        this.addNewEducation = this.addNewEducation.bind(this)
        this.getInitialData = this.getInitialData.bind(this)
        this.addSkill = this.addSkill.bind(this);

        this.skillsInputRef = React.createRef();
    }

    componentDidMount() {
        this.refreshToken()

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
                    this.getInitialData()
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
                this.getInitialData()
            }
        } 
        else {
            window.location.replace("/Login")
        }
    }

    getInitialData() {
        axios.post(`http://89.108.103.70/api/resume/get-all-filter`, {
            equalsQueryList: [
                {
                  fieldName: "authorId",
                  value: JSON.parse(localStorage.getItem('user')).id
                }
            ],
        }).then((response) => {
            if (response.data.resumeList.length === 0) {
                this.setState({
                    firstInitialization: true,
                    author: JSON.parse(localStorage.getItem('user')),
                    isDraft: true
                })
            }
            else {
                this.setState({
                    id: response.data.resumeList[0].id,
                    title: response.data.resumeList[0].title,
                    author: response.data.resumeList[0].author,
                    birthDate: response.data.resumeList[0].birthDate,
                    gender: response.data.resumeList[0].gender,
                    city: response.data.resumeList[0].city,
                    workExperience: response.data.resumeList[0].workExperience,
                    description: response.data.resumeList[0].description,
                    desiredPost: response.data.resumeList[0].desiredPost,
                    desiredSalary: response.data.resumeList[0].desiredSalary,
                    hasHigherEducation: true,
                    hasSecondaryEducation: true,
                    employmentType: response.data.resumeList[0].employmentType,
                    jobDataList: response.data.resumeList[0].jobDataList,
                    educationDataList: response.data.resumeList[0].educationDataList,
                    skillList: response.data.resumeList[0].skillList,

                    currentJobPost: response.data.resumeList[0].jobDataList.filter((el) => (el.endYear === null))[0]?.post,
                    currentJobName: response.data.resumeList[0].jobDataList.filter((el) => (el.endYear === null))[0]?.organizationName,
                    currentJobYear: response.data.resumeList[0].jobDataList.filter((el) => (el.endYear === null))[0]?.startYear,

                    isDraft: response.data.resumeList[0].isDraft
                })
            }
        })
    }

    createResume(isDraft) {
        axios.post(`http://89.108.103.70/api/resume`, {
            title: this.state.title,
            authorId: JSON.parse(localStorage.getItem('user')).id,
            birthDate: this.state.birthDate,
            gender: this.state.gender,
            city: this.state.city,
            workExperience: this.state.workExperience,
            description: this.state.description,
            desiredPost: this.state.desiredPost,
            desiredSalary: this.state.desiredSalary,
            jobDataList: this.state.jobDataList,
            educationDataList: this.state.educationDataList,
            skillIdList: this.state.skillList.map(skill => skill.id),
            employmentType: this.state.employmentType,
            isDraft: isDraft
        }).then((resp) => this.setState({
            id: resp.data.id,
            firstInitialization: false
        })).catch(function (error) {
            if (error.response) {
        }})
    }

    async updateResume(isDraft) {
        if (this.state.firstInitialization === true) {
            await this.createResume(isDraft)
        }
        else {
            axios.put(`http://89.108.103.70/api/resume`, {
                id: this.state.id,
                title: this.state.title,
                authorId: JSON.parse(localStorage.getItem('user')).id,
                birthDate: this.state.birthDate,
                gender: this.state.gender,
                city: this.state.city,
                workExperience: this.state.workExperience,
                description: this.state.description,
                desiredPost: this.state.desiredPost,
                desiredSalary: this.state.desiredSalary,
                jobDataList: this.state.jobDataList,
                educationDataList: this.state.educationDataList,
                skillIdList: this.state.skillList.map(skill => skill.id),
                employmentType: this.state.employmentType,
                isDraft: isDraft
            }).then((response) => {
                window.location.replace('/CVEditor')
            })
        }
    }

    async saveResume(isDraft) {
        let updatedList = this.state.jobDataList
        let current = updatedList.filter((el) => (el.endYear === null)).length === 0 ? null : 
            updatedList.filter((el) => (el.endYear === null))[0]

        const newJob = {
            post: this.state.currentJobPost,
            organizationName: this.state.currentJobName,
            startYear: this.state.currentJobYear,
            endYear: null
        }

        if (current !== null) {
            updatedList = updatedList.filter((el) => (el !== current))
            await this.setState({jobDataList: updatedList})
            
            await this.addNewJob(newJob)
            await this.updateResume(isDraft)
        }
        else {
            await this.addNewJob(newJob)
            await this.updateResume(isDraft)
        }
    }

    addNewJob(info) {
        let updatedList = info !== null ? [...this.state.jobDataList, info] : this.state.jobDataList
        this.setState({
            jobDataList: updatedList, 
            addNewJobFlag: false
        })
    }

    addNewEducation(info) {
        let updatedList = info !== null ? [...this.state.educationDataList, info] : this.state.educationDataList
        this.setState({
            educationDataList: updatedList, 
            addNewEducationFlag: false
        })
    }

    addSkill = (event) => {
        if(event.key === 'Enter' || event.key === 'Unidentified') {
            const value = this.skillsInputRef.current.value;
            const skill = this.state.skills.find(skill => skill.name === value)
            if(skill) {
                const skillList = this.state.skillList;
                skillList.push(skill)
                this.setState({ skillList: [...new Set(skillList)] })
                this.skillsInputRef.current.value = '';
            }
        }
    }

    deleteSkill = (name) => {
        this.setState({ skillList: this.state.skillList.filter((skill) => skill.name !== name)})
    }

    render() {
        if (this.state.author === null) {
            return (
                <div className='loader-wrapper'>
                    <div className='loader'></div>
                </div>)
        }
        return (
            <div className='glav_CVPan'>
                <div className='CVPan'> 
                    <h1 className='CVPan_h1'>
                        Мое резюме
                    </h1>
                    <h2 className='CVPanglav_h2'>
                        Основная информация
                    </h2>
                    <h3 className='CVPan_h3'>
                        ФИО
                    </h3>
                    <p className='fio_CVpan'>{this.state.author?.surname + ' ' + this.state.author?.name +  ' ' + this.state.author?.patronymic}</p>
                    <h3 className='CVPan_h3'>
                        Дата рождения
                    </h3>
                    <input className = 'date_CVpan' type="date" id="start" name="trip-start" min="1960-01-01" max="2028-12-31" 
                        value={this.state.birthDate} onChange={(e) => this.setState({birthDate: e.target.value})}></input>
                    <h3 className='CVPan_h3'>
                        Пол
                    </h3>
                    <select className='CVPan_select' value={this.state.gender} onChange={(e) => this.setState({gender: e.target.value})}>
                        <option value={0} className='CVPan_option'>Мужской</option>
                        <option value={1} className='CVPan_option'>Женский</option>
                    </select>
                    <h3 className='CVPan_h3'>
                        Место проживания
                    </h3>
                    <input className = 'CVPan_input1' placeholder='Место проживания' value={this.state.city} 
                        onChange={(e) => this.setState({city: e.target.value})}/>
                    <h3 className='CVPan_h3'>
                        О себе
                    </h3>
                    <textarea className = 'CVPan_input2' placeholder='О себе' value={this.state.description}
                        onChange={(e) => this.setState({description: e.target.value})}
                    />
                    <h2 className='CVPan_h2'>
                        Специальность
                    </h2>
                    <h3 className='CVPan_h3'>
                        Желаемая должность
                    </h3>
                    <input className = 'CVPan_input1' placeholder='Желаемая должность' value={this.state.title}
                        onChange={(e) => this.setState({title: e.target.value})}
                    />
                    <h3 className='CVPan_h3'>
                        Желаемая зарплата (в рублях)
                    </h3>
                    <input className = 'CVPan_input1' placeholder='Желаемая зарплата' value={this.state.desiredSalary}
                        onChange={(e) => this.setState({desiredSalary: e.target.value})}
                    />
                    <h3 className='CVPan_h3'>
                        Занятость
                    </h3>
                    <select className='CVPan_select' value={this.state.employmentType} 
                        onChange={(e) => this.setState({employmentType: e.target.value})}>
                        <option value={0} className='CVPan_option'>Значение по умолчанию</option>
                        <option value={1} className='CVPan_option'>Полная занятость</option>
                        <option value={2} className='CVPan_option'>Частичная занятость</option> 
                        <option value={3} className='CVPan_option'>Вахта</option>
                        <option value={4} className='CVPan_option'>Удаленная работа</option>
                        <option value={5} className='CVPan_option'>Стажировка</option>
                    </select>
                    <h2 className='CVPan_h2'>
                        Опыт работы
                    </h2>
                    <h3 className='CVPan_h3'>
                        Текущая должность
                    </h3>
                    <input className = 'CVPan_input1' placeholder='Текущая должность' value={this.state.currentJobPost}
                        onChange={(e) => this.setState({currentJobPost: e.target.value})}
                    />
                    <h3 className='CVPan_h3'>
                        Название компании
                    </h3>
                    <input className = 'CVPan_input1' placeholder='Название компании' value={this.state.currentJobName}
                        onChange={(e) => this.setState({currentJobName: e.target.value})}
                    />
                    <h3 className='CVPan_h3'>
                        Год начала работы
                    </h3>
                    <input className = 'CVPan_input1' placeholder='Год начала работы' value={this.state.currentJobYear}
                        onChange={(e) => this.setState({currentJobYear: e.target.value})}
                    />
                    {
                        this.state.jobDataList.length > 1 && 
                        <>
                            <h3 className='CVPan_h3'>
                            Предыдущие места работы
                            </h3>
                            <div className="jobs">
                            {this.state.jobDataList.filter((el) => (el.endYear !== null)).map((el) => (
                                <p className='p_job'> 
                                    <a onClick={() => this.setState(prevState => ({jobDataList: prevState.jobDataList.filter(item => item !== el)}))}>
                                        <img src={require('./images/trash-small.svg').default} alt='add' className='trash-small'></img>
                                    </a>
                                    <p className='h1_p'>{el.post}</p>
                                    <p className='h2_p'>{el.organizationName}</p>
                                    <p className='h3_p'>{el.startYear}-{el.endYear}</p>
                                </p>
                            ))}
                            </div>
                        </>
                    }
                   
                    <a className='CVpan_h3_a' onClick={() => this.setState({addNewJobFlag: true})}> 
                        <img src={require('./images/plus-small.svg').default} alt='add'></img>
                        &nbsp;Добавить место работы
                    </a>
                    <h2 className='CVPan_h2'>
                        Образование
                    </h2>
                    {this.state.educationDataList.length > 0 && 
                        <div className="education-cards">
                            {this.state.educationDataList.map((el) => (
                                <p className='p_study'> 
                                    <p className='h1_p'>{educationTypes[el.educationType]}</p>
                                    <p className='h2_p22'>{el.organizationName}</p>
                                    <p className='h3_p'>{el.specialization}</p>
                                    <p className='h3_p'>{el.startYear}-{el.endYear}</p>
                                    <a onClick={() => this.setState(prevState => ({educationDataList: prevState.educationDataList.filter(item => item !== el)}))}>
                                        <img src={require('./images/trash-small.svg').default} alt='delete' className='trash-small'></img>
                                    </a>
                                </p>
                            ))}
                        </div>
                    }
                    <a className='CVpan_h3_a' onClick={() => this.setState({addNewEducationFlag: true})}> 
                        <img src={require('./images/plus-small.svg').default} alt='add'></img>
                        &nbsp;Добавить образование
                    </a>
                    <h2 className='CVPan_h2'>
                        Ключевые навыки
                    </h2>
                    <ul className='skills-editor'>
                    {this.state.skillList.map((el) => (
                        <li key={el.id}>{el.name}<img src={require('../components/images/trash.svg').default} alt='delete' className='delete-skill' onClick={() => this.deleteSkill(el.name)}></img></li>
                        ))}
                    </ul>
                    <input className="skill-input" ref={this.skillsInputRef} list="skillsList" type="text" placeholder='Введите навык' onKeyUp={(ev) => this.addSkill(ev)}></input>
                    {this.state.skills && 
                        <datalist id="skillsList">
                            {this.state.skills.map((skill, id) =>
                            <option key={id} value={skill.name} />
                            )}
                        </datalist>
                    }
                    {this.state.firstInitialization ? 
                    (
                        <button className='CVPan_up_button' onClick={() => this.saveResume(false)}>
                            <img src={require('./images/vector-up.svg').default} alt='save'></img>
                            &nbsp;{this.state.isDraft ? 'Опубликовать' : 'Скрыть'}
                        </button>
                    ): 
                    (
                        <button className='CVPan_up_button' onClick={() => this.saveResume(!this.state.isDraft)}>
                            <img src={require('./images/vector-up.svg').default} alt='save'></img>
                            &nbsp;{this.state.isDraft ? 'Опубликовать' : 'Скрыть'}
                        </button>
                    )}
                    <button className='CVPan_PDF_button ver2-button' onClick={() => {this.saveResume(this.state.isDraft)}}>
                        &nbsp;Сохранить
                    </button>
                </div>
                <div className='photo_div'>
                    <h2 className='photo_div_h2'>
                        Фото
                    </h2>
                    <a href=''><img className='img_CV' src={require('./images/deafult-avatar.png')} alt='avatar'></img></a>
                    <h2 className='photo_div_h2'>
                        Контакты
                    </h2>
                    <h3 className='CVPan_h3'>Почта</h3>
                    <p className='fio_CVpan'>{this.state.author?.email}</p>
                    <h3 className='CVPan_h3'>Телефон</h3>
                    <p className='fio_CVpan'>+{this.state.author?.phone}</p>
                    {this.state.author?.github === null && this.state.author?.telegram === null && this.state.author?.vk === null ? 
                    (<></>) :
                    (<>
                        <h3 className='CVPan_h3'>Ссылки</h3>
                        <ul className='skills-2'>
                            <img src={require('./images/link.svg').default}></img>
                            {this.state.author?.telegram !== null ? 
                            (<a href={this.state.author?.telegram} target="_ blank"><li className='skill-ver-2'>Telegram</li></a>) :
                            (<></>)}
                            {this.state.author?.github !== null ?
                            (<a href={this.state.author?.github} target="_ blank"><li className='skill-ver-2'>GitHub</li></a>) :
                            (<></>)}
                            {this.state.author?.vk !== null ?
                            (<a href={this.state.author?.vk} target="_ blank"><li className='skill-ver-2'>Вконтакте</li></a>) :
                            (<></>)}
                        </ul>
                    </>)}
                    <Link to={'/Account'}>
                    <p className='CVPan_a'> 
                        <img src={require('./images/pencil-small.svg').default} alt='pencil'></img>
                        &nbsp;Изменить в профиле пользователя
                    </p>
                    </Link>
                </div>
                {this.state.addNewJobFlag || this.state.addNewEducationFlag ? (<div class="dark-overlay"></div>) : (<></>)}
                {this.state.addNewJobFlag ? (<ModalJob1 addNewJob={this.addNewJob}/>) : (<></>)}
                {this.state.addNewEducationFlag ? (<ModalJob2 addNewEducation={this.addNewEducation}/>) : (<></>)}
            </div>
        );
    }
};

export default CVpan;