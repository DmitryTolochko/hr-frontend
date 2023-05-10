import React from 'react';
import SearchString from '../components/SearchString';
import PeopleCard from '../components/PeopleCard';
import AdminLK from '../components/AdminLK';
import Adminmodal1 from './Adminmodal1';
import Adminmodal2 from './Adminmodal2';

const AdminPan = () => {
    return (
        <div className='glavAdmin'>
            <div className='adminPan'>
                <div className='SearchStringadmin'><SearchString width='650px'/></div>
                <div className='zaglav'>
                    <text className='tabletext'>Аватар</text>
                    <text className='tabletext1'>ФИО</text>
                    <text className='tabletext2'>Почта</text>
                    <text className='tabletext3'>Роль</text>
                </div>
                <PeopleCard/>
                <PeopleCard/>
                <PeopleCard/>
                <AdminLK/>
            </div>
            <div class="dark-overlay"></div>
            <Adminmodal1/> 
            <Adminmodal2/> 
        </div>
    );
};
    
export default AdminPan;