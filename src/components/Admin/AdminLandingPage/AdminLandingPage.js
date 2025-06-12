import React from 'react';
import styles from './styles.module.scss';
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
        <div className='container'>
            layouts
        </div>
    )
}

export default AdminLandingPage