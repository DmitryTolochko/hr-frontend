import React from 'react';
import axios from 'axios'

class AccoutDepartmentCard extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        axios.get(`http://89.108.103.70/api/department/${JSON.parse(localStorage.getItem('user')).departmentId}`).then((resp) => {
            console.log(resp.data)
            this.setState({data: resp.data})
        })
    }

    render() {
        if (this.state.data === null) {
            return;
        }
        return (
            <div className='director_div'>
                <h1 className='director_div_h1'>Глава департамента</h1>
                <h3 className='director_div_h3'>Название</h3>
                <h2 className='director_div_h2'>{this.state.data.name}</h2>
                <h3 className='director_div_h3'>География</h3>
                <h2 className='director_div_h2'>{this.state.data.description}</h2>
            </div>
        )
    }
}

export default AccoutDepartmentCard