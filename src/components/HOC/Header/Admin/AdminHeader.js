import React from 'react';
import styles from './styles.module.scss';
import { adminNavigation } from '../../../../constants/naviagtionList/adminNavigationList'

const AdminHeader = () => {

    console.log("adminNavigation", adminNavigation)

    return (
        <div className={styles.adminHeader}>
            AdminHeader
        </div>
    )
}

export default AdminHeader