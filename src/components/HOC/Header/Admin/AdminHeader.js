import React, { useState } from 'react';
import styles from './styles.module.scss';
import { adminNavigation } from '../../../../constants/naviagtionList/adminNavigationList';
import logo from '../../../../assets/logo-icon.png';
import toggleIcon from '../../../../assets/toggle.svg';
import toggleOffIcon from '../../../../assets/toggleOff.svg';

const AdminHeader = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed((prevState) => !prevState);
    };

    return (
        <aside className={`${styles.adminHeader} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <img src={logo} alt='movie-logo-icon' className={styles.logoImage} />
                    <span>Movie Hub</span>
                </div>
                {isCollapsed ? <img
                    src={toggleOffIcon}
                    alt='toggle-icon'
                    className={`${styles.toggleIcon} ${styles.toggleOffIcon}`}
                    onClick={toggleSidebar}
                /> : <img
                    src={toggleIcon}
                    alt='toggle-icon'
                    className={styles.toggleIcon}
                    onClick={toggleSidebar}
                />}

            </div>
            <ul className={styles.navigationList}>
                {adminNavigation?.map((item) => {
                    return (
                        <li className={styles.nav} key={item.name}>
                            <a className={styles.navItem}>
                                <img src={item.icon} />
                                <span>{item.name}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default AdminHeader;
