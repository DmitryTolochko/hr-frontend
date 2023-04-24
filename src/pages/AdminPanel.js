import React from 'react';
import SearchString from '../components/SearchString';
import AdminPan from '../components/AdminPan';


const AdminPanel = () => {
    return (
        <div>
            <div>
                    <SearchString width='660px'/>
                    <AdminPan/>
            </div>
            
        </div>
    );
};

export default AdminPanel;
