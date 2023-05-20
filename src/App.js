import React from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import CVEditor from './pages/CVEditor'
import FeaturedVacancies from './pages/FeaturedVacancies'
import Account from './pages/Account'
import BoardOfVacancies from './pages/BoardOfVacancies'
import MyVacancies from './pages/MyVacancies'
import BoardOfCVs from './pages/BoardOfCVs'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Vacancy from './pages/Vacancy';
import VacancyEditor from './pages/VacancyEditor';
import CVResponses from './pages/CVResponses';
import CV from './pages/CV';

import './styles/index.css'
import './styles/VacancyCard.css'
import './styles/SearchString.css'
import './styles/FiltersPanel.css'
import './styles/BoardOfVacancies.css'
import './styles/LoginPlace.css'
import './styles/RegistrationPlace.css'
import './styles/AccountStyle.css'
import './styles/CVstyle.css'
import './styles/AdminPanstyle.css'
import './styles/CVCard.css'
import './styles/Vacancy.css'
import './styles/Navigation.css'
import './styles/VacancyEditor.css'
import './styles/CV.css'
import './styles/MyVacancies.css'
import './styles/Loader.css'


class App extends React.Component {
    render () {
        return (
            <>
                <Router>
                    <Navigation />
                    <div className='page'>
                        <Routes>
                            <Route exact path='/' element={<Account/>} />
                            <Route path='/CVEditor' element={<CVEditor/>} />
                            <Route path='/FeaturedVacancies' element={<FeaturedVacancies/>} />
                            <Route path='/BoardOfVacancies' element={<BoardOfVacancies/>} />
                            <Route path='/MyVacancies' element={<MyVacancies/>} />
                            <Route path='/BoardOfCVs' element={<BoardOfCVs/>} />
                            <Route path='/Account' element={<Account/>} />
                            <Route path="/AdminPanel" element={<AdminPanel/>}/>
                            <Route path="/Login" element={<Login/>}/>
                            <Route path="/Registration" element={<Registration/>}/>
                            <Route path="/Vacancy/:id" element={<Vacancy/>}/>
                            <Route path="/VacancyEditor/:id" element={<VacancyEditor/>}/>
                            <Route path="/CVResponses" element={<CVResponses/>}/>
                            <Route path="/CV/:id" element={<CV/>}/>
                        </Routes>
                    </div>
                </Router>
            </>
        );
    }
}
      
export default App;