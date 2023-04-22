import React from 'react';
import SearchString from '../components/SearchString';
import FiltersPanel from '../components/FiltersPanel';
import CVCard from '../components/CVCard';
import axios from 'axios'

class BoardOfCVs extends React.Component {
    constructor(props) {
        super(props)

        axios.get('http://89.108.103.70/api/Resume/get-all').then((response) => {
            this.setState({data: response.data.resumeList})
        })

        this.state = {
            data: [
                {
                  "id": "string",
                  "author": {
                    "id": "string",
                    "userName": "Dmitry",
                    "normalizedUserName": "string",
                    "email": "string",
                    "normalizedEmail": "string",
                    "emailConfirmed": true,
                    "passwordHash": "string",
                    "securityStamp": "string",
                    "concurrencyStamp": "string",
                    "phoneNumber": "string",
                    "phoneNumberConfirmed": true,
                    "twoFactorEnabled": true,
                    "lockoutEnd": "2023-04-18T06:40:15.740Z",
                    "lockoutEnabled": true,
                    "accessFailedCount": 0,
                    "surname": "string",
                    "name": "string",
                    "patronymic": "string",
                    "telegram": "string",
                    "github": "string"
                  },
                  "authorId": "string",
                  "birthDate": "2023-04-18",
                  "gender": 0,
                  "city": "string",
                  "workExperience": 0,
                  "salary": 0,
                  "description": "string",
                  "desiredPost": "string",
                  "desiredSalary": 0,
                  "employmentType": 0,
                  "isDraft": true
                }
            ]
        }
    }

    render() {
        return (
            <div className='board-of-vacancies'>
                <FiltersPanel/>
                <div className='board'>
                    <SearchString width='703px'/>
                    {this.state.data.map((el) => (<div key={el.id}><CVCard animatedClass='animated-card' cardInfo={el}/></div>))}
                    {/* <CVCard animatedClass='animated-card'/>
                    <CVCard animatedClass='animated-card'/>
                    <CVCard animatedClass='animated-card'/> */}
                </div>
            </div>
        );
    }
};

export default BoardOfCVs;
