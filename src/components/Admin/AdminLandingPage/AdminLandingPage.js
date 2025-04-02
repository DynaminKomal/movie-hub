import React from 'react';
import styles from './styles.module.scss';
import AdminHeader from '../../HOC/Header/Admin/AdminHeader';
import { useDispatch } from 'react-redux';
import { adminPaths } from '../../../constants/paths/adminPaths';
import { currentPage } from '../../../store/actions/currentPage.action';

const AdminLandingPage = () => {

    const dispatch = useDispatch();
    const paramsUrl = {
        currentPage: "home",
        currentPath: adminPaths.ADMINDASHBOARD
    }
    dispatch(currentPage.success(paramsUrl))

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