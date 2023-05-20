import React from 'react';

class PeoplecardwithPhoto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
          this.setState({ data: this.props.data });
        }
        console.log(this.state)
    }

    render() {
        if (this.state.data === null) {
            return;
        }
        return (
            <div className='photo_card_div'>
                <img className='img_CV' src={require('./images/deafult-avatar.png')} alt='avatar'></img>
                <h2 className='photo_div_h2'>Контакты</h2>
                <h3 className='CVPan_h3'>Почта</h3>
                <p className='fio_CVpan2'><a href=''>{this.state.data.author.email}</a></p>
                <h3 className='CVPan_h3'>Телефон</h3>
                <p className='fio_CVpan2'><a href=''>+{this.state.data.author.phone}</a></p>
                {this.state.data.author.github === null && this.state.data.author.telegram === null ? 
                (<></>) :
                (<><h3 className='CVPan_h3'>Ссылки</h3>
                <ul className='skills-2'>
                    <img src={require('./images/link.svg').default} alt='avatar'></img>
                    {this.state.data.author.telegram !== null ? 
                    (<a href={this.state.data.author.telegram} target="_ blank"><li className='skill-ver-2'>Telegram</li></a>) :
                    (<></>)}
                    {this.state.data.author.github !== null ?
                    (<a href={this.state.data.author.github} target="_ blank"><li className='skill-ver-2'>GitHub</li></a>) :
                    (<></>)}
                    {this.state.data.author.vk !== null ?
                    (<a href={this.state.data.author.vk} target="_ blank"><li className='skill-ver-2'>Вконтакте</li></a>) :
                    (<></>)}
                </ul></>)}
            </div>
        );
    }
};
        
export default PeoplecardwithPhoto;   