const ModalJob1 = () => {
    return (
        <div className = 'modal_job'>
                <h2 className='modal_job_h2'>
                    Добавить место работы
                </h2>
                <h3 className='modal_job_h3'>Должность</h3>
                <input className = 'modal_job_input1' placeholder='Должность'/>
                <h3 className='modal_job_h3'>Компания</h3>
                <input className = 'modal_job_input1' placeholder='Компания'/>
                <h3 className='modal_job_h3'>Года работы</h3>
                <input className = 'modal_job_input1' placeholder='Года работы'/>
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
        
export default ModalJob1;   