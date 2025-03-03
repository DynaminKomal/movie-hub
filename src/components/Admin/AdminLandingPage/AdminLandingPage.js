import React from 'react';
import styles from './styles.module.scss';
import AdminHeader from '../../HOC/Header/Admin/AdminHeader';

const AdminLandingPage = () => {
    return (
        <div className={styles.adminDasboard}>
            <AdminHeader />
            <div className={styles.main}>
layouts
            </div>
        </div>
    )
}

export default AdminLandingPage