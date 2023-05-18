import React from 'react';

function get_current_age(date) {
    var d = date.split('-');
    if( typeof d[2] !== "undefined" ) {
        date = d[0]+'.'+d[1]+'.'+d[2];
        let age = ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0
        if (age == 0) { return 'Возраст не обозначен'; }
        else if (age % 10 == 1) { return age + ' год'; }
        else if (age % 10 <= 4 && age % 10 !== 0) { return age + ' года'; }
        else { return age + ' лет';}
    }
    return 'Возраст не обозначен';
}

class PeoplecardCVPan extends React.Component {
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
            <div className='people_card'>
                <span className='people_card_span'>
                    <h1 className='people_card_h1'>
                        {this.state.data.author.surname + ' ' + this.state.data.author.name + ' ' + this.state.data.author.patronymic}
                    </h1>
                    <p className='people_card_p'>{get_current_age(this.state.data.birthDate)}</p>
                </span>
                <h2 className='people_card_h2'>{this.state.data.desiredSalary} руб.</h2>
                <h3 className='people_card_h3'>Вакансия:</h3>
                <p className='people_people_vacancy'>{this.state.data.title}</p>
                {/* <a href=''><p className='vacancy_time_data'>14:15</p></a>
                <a href=''><p className='vacancy_data'>14.03.2011</p></a> */}
            </div>
        );
    }
};
        
export default PeoplecardCVPan;   