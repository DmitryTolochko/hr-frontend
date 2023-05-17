const ModalJob2 = () => {
    return (
        <div className = 'modal_job2'>
                <h2 className='modal_job_h2'>
                    Добавить образование
                </h2>
                <h3 className='modal_job_h3'>Уровень образования</h3>
                <select className='CVPan_select2'>
                    <option className='CVPan_option'>Высшее (Специалитет, магистратура)</option>
                    <option className='CVPan_option'>Высшее (Бакалавриат)</option>
                    <option className='CVPan_option'>Среднее профессиональное образование</option>
                    <option className='CVPan_option'>Высшее (подготовка кадров высшей квалификации)</option>
                    <option className='CVPan_option'>Значение по умолчанию</option>
                </select>
                <h3 className='modal_job_h3'>Образовательное учреждение</h3>
                <input className = 'modal_job_input1' placeholder='Образовательное учреждение'/>
                <h3 className='modal_job_h3'>Специальность</h3>
                <input className = 'modal_job_input1' placeholder='Специальность'/>
                <h3 className='modal_job_h3'>Года учебы</h3>
                <input className = 'modal_job_input1' placeholder='Года учебы'/>
                <button className='CVPan_plus_button'>
                    <img src={require('./images/plus1.svg').default} alt='save'></img>
                    &nbsp;Добавить
                </button>
                <button className='CVPan_no_button'>
                   Отменить
                </button>
            </div>
    );
};
        
export default ModalJob2;   