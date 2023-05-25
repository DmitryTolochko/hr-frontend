import React from 'react';

class ModalJob1 extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            post: null,
            organizationName: null,
            startYear: null,
            endYear: null
        }
    }

    render() {
        return (
            <div className = 'modal_job'>
                    <h2 className='modal_job_h2'>
                        Добавить место работы
                    </h2>
                    <h3 className='modal_job_h3'>Должность</h3>
                    <input className = 'modal_job_input1' placeholder='Должность' value={this.state.post}
                        onChange={(e) => this.setState({post: e.target.value})}
                    />
                    <h3 className='modal_job_h3'>Компания</h3>
                    <input className = 'modal_job_input1' placeholder='Наименование компании' value={this.state.organizationName}
                        onChange={(e) => this.setState({organizationName: e.target.value})}
                    />
                    <h3 className='modal_job_h3'>Года работы</h3>
                    <input className = 'modal_job_input3' placeholder='Год начала' value={this.state.startYear}
                        onChange={(e) => this.setState({startYear: e.target.value})}
                    />
                    <input className = 'modal_job_input3' placeholder='Год окончания' value={this.state.endYear}
                        onChange={(e) => this.setState({endYear: e.target.value})}
                    />
                    <button className='CVPan_plus_button' onClick={() => this.props.addNewJob(this.state)}>
                        <img src={require('./images/plus1.svg').default} alt='add'></img>
                        &nbsp;Добавить
                    </button>
                    <button className='CVPan_no_button' onClick={() => this.props.addNewJob(null)}>
                    Отменить
                    </button>
                </div>
        );
    }
};
        
export default ModalJob1;   