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

import './styles/index.css'
import './styles/VacancyCard.css'
import './styles/SearchString.css'
import './styles/FiltersPanel.css'
import './styles/BoardOfVacancies.css'
import './styles/CVCard.css'


class App extends React.Component {
    render () {
        return (
            <>
                <Router>
                    <Navigation />
                    <Routes>
                        <Route exact path='/' element={<Account/>} />
                        <Route path='/CVEditor' element={<CVEditor/>} />
                        <Route path='/FeaturedVacancies' element={<FeaturedVacancies/>} />
                        <Route path='/BoardOfVacancies' element={<BoardOfVacancies/>} />
                        <Route path='/MyVacancies' element={<MyVacancies/>} />
                        <Route path='/BoardOfCVs' element={<BoardOfCVs/>} />
                        <Route path='/Account' element={<Account/>} />
                        <Route path="/AdminPanel" element={<AdminPanel/>}/>
                    </Routes>
                </Router>
            </>
        );
    }
}
      
export default App;