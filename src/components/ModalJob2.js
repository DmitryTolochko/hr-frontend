import React from 'react';

let employmentTypes = ['Не указано', 'Полная занятость', 'Частичная занятость', 'Вахта', 'Удаленная работа', 'Стажировка']   
let workExperience = ['Не важно', 'От 1 до 3 лет', 'От 4 до 6 лет', 'Более 6 лет']
let educationTypes = {
    0: 'Не указано',
    1: 'Высшее (Специалитет, магистратура)',
    2: 'Высшее (Бакалавриат)',
    3: 'Среднее профессиональное',
    4: 'Высшее (Подготовка кадров высшей квалификации)',
    5: 'Дополнительное профессиональное',
    6: 'Среднее общее'
}

class ModalJob2 extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            organizationName: null,
            specialization: null,
            educationType: null,
            startYear: null,
            endYear: null
        }
    }
    render() {
        return (
            <div className = 'modal_job2'>
                    <h2 className='modal_job_h2'>
                        Добавить образование
                    </h2>
                    <h3 className='modal_job_h3'>Уровень образования</h3>
                    <select className='CVPan_select2' value={this.state.educationType} onChange={(e) => this.setState({educationType: e.target.value})}>
                        <option value={0} className='CVPan_option'>Не указано</option>
                        <option value={1} className='CVPan_option'>Высшее (Специалитет, магистратура)</option>
                        <option value={2} className='CVPan_option'>Высшее (Бакалавриат)</option>
                        <option value={3} className='CVPan_option'>Среднее профессиональное</option>
                        <option value={4} className='CVPan_option'>Высшее (Подготовка кадров высшей квалификации)</option>
                        <option value={5} className='CVPan_option'>Дополнительное профессиональное</option>
                        <option value={6} className='CVPan_option'>Среднее общее</option>
                    </select>
                    <h3 className='modal_job_h3'>Образовательное учреждение</h3>
                    <input className = 'modal_job_input1' placeholder='Название' value={this.state.organizationName}
                        onChange={(e) => this.setState({organizationName: e.target.value})}
                    />
                    <h3 className='modal_job_h3'>Специальность</h3>
                    <input className = 'modal_job_input1' placeholder='Специальность' value={this.state.specialization}
                        onChange={(e) => this.setState({specialization: e.target.value})}
                    />
                    <h3 className='modal_job_h3'>Года учебы</h3>
                    <input className = 'modal_job_input3' placeholder='Год начала' value={this.state.startYear}
                        onChange={(e) => this.setState({startYear: e.target.value})}
                    />
                    <input className = 'modal_job_input3' placeholder='Год окончания' value={this.state.endYear}
                        onChange={(e) => this.setState({endYear: e.target.value})}
                    />
                    <button className='CVPan_plus_button' onClick={() => this.props.addNewEducation(this.state)}>
                        <img src={require('./images/plus1.svg').default} alt='add'></img>
                        &nbsp;Добавить
                    </button>
                    <button className='CVPan_no_button' onClick={() => this.props.addNewEducation(null)}>
                    Отменить
                    </button>
                </div>
        );
    }
};
        
export default ModalJob2;   