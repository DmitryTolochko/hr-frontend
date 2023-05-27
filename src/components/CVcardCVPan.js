import React from "react";

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

function getGenderName(gender) {
    if (gender === 0) {
        return 'Мужской'
    }
    else {
        return 'Женский'
    }
}

class CVcardCVPan extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            data: null,
            age: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
          this.setState({ data: this.props.data });
        }
    }

    render() {
        if (this.state.data === null) {
            return;
        }
        return (
            <div className='CVcard'>
                <h2 className='CVPang_h2'>Основная информация</h2>
                <h3 className='CVcard_h3'>Занятость:</h3>
                <p className='CVcard_p1'>{employmentTypes[this.state.data.employmentType]}</p>
                <h3 className='CVcard_h3'>Место проживания:</h3>
                <p className='CVcard_p2'>{this.state.data.city}</p>
                <h3 className='CVcard_h3'>Пол:</h3>
                <p className='CVcard_p3'>{getGenderName(this.state.data.gender)}</p>
                <h2 className='CVPang_h2'>О себе</h2>
                <p className='CVcard_p'>{this.state.data.description}</p>
                {this.state.data?.jobDataList !== null ? (
                    <>
                        <h2 className='CVPang_h2'>Опыт работы</h2>
                        {this.state.data?.jobDataList !== null && this.state.data?.jobDataList.filter((el) => (el.endYear === null)).length > 0 ? (
                            <>
                                <h3 className='CVcard_h3'>Текущая должность</h3>
                                <p className='CVcard_p4'>{this.state.data?.jobDataList.filter((el) => (el.endYear === null))[0].post}</p>
                                <p className='CVcard_text'>{this.state.data?.jobDataList.filter((el) => (el.endYear === null))[0].organizationName}</p>
                                <p className='CVcard_text'>c {this.state.data?.jobDataList.filter((el) => (el.endYear === null))[0].startYear} по н.в</p>
                            </>) : (<></>)}
                        {this.state.data?.jobDataList !== null && this.state.data?.jobDataList.filter((el) => (el.endYear !== null)).length > 0 ? (
                            <>
                                <h3 className='CVcard_h3'>Предыдущие места работы</h3>
                                <div className="jobs">
                                {this.state.data.jobDataList.filter((el) => (el.endYear !== null)).map((el) => (
                                    <p className='p_job'> 
                                        <p className='h1_p1'>{el.post}</p>
                                        <p className='h2_p2'>{el.organizationName}</p>
                                        <p className='h3_p3'>{el.startYear}-{el.endYear}</p>
                                    </p>))}
                                </div>
                            </>) : (<></>)}
                    </>) : (<></>)
                }
                {this.state.data.educationDataList !== null ? (
                <>  
                    {this.state.data.educationDataList.length > 0 && 
                        <>
                            <h2 className='CVPang_h2'>Образование</h2>
                            <div className="education-cards">
                                {this.state.data.educationDataList?.map((el) => (
                                    <div className='p_study'> 
                                        <a href = ''><text className='h2_p'></text></a>
                                        <p className='h1_pp'>{educationTypes[el.educationType]}</p>
                                        <p className='h2_p22'>{el.organizationName}</p>
                                        <p className='h3_pp1'>{el.specialization}</p>
                                        <p className='h3_pp1'>{el.startYear}-{el.endYear}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                    
                </>) : (<></>)
                }
                {this.state.data.skillList !== [] && 
                <>
                    <h2 className='CVPang_h2'>Ключевые навыки</h2>
                    <ul className='skills vacancy-skills'>
                        {this.state.data.skillList.map((el) => (<li key={el.id}>{el.name}</li>))}
                    </ul>
                </>
                }
                {/* <p className='vacancy_time_data2'>Резюме опубликовано в <a href=''><p className='vacancy_time2'>14:15</p></a><a href=''><p className='vacancy_data2'>14.12.2011</p></a></p> */}
            </div>
        );
    }
};
        
export default CVcardCVPan;   