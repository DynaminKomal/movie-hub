import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png';
import searchIcon from '../../../assets/search.svg';
import userIcon from '../../../assets/user.svg';
import { navigation } from '../../../constants/naviagtionList/navigation'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/helper';
import { fetchFromLocalStorage } from '../../../utils/localstorage';
import globalStyle from '../../../styles/globalStyle.module.scss'

const NavigationMenu = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path)
  }
  const userName = fetchFromLocalStorage("user_first_name") ? fetchFromLocalStorage("user_first_name") : "";
  const profileImage = fetchFromLocalStorage("profile_image") ? fetchFromLocalStorage("profile_image") : "";
  console.log(profileImage)
  return (
    <div className={styles.navbar}>
      <img src={logo} className={styles.logo} alt='logo' onClick={() => handleNavigation('/')} />
      <ul>
        {navigation?.map((nav, index) => {
          return (
            <li key={index} onClick={() => handleNavigation(nav.path)}>{nav.name}</li>
          )
        })}
      </ul>
      <div className={styles.searchBox}>
        <img src={searchIcon} className={styles.searchIcon} alt='search icon' />
        {isAuthenticated() ? < div className={styles.loginBox}>
          <img
            src={profileImage ? '../../../assets/user.svg' : userIcon}
            className={styles.userIcon}
            alt={userName || 'Default User'}
          />
          <span className={globalStyle.uppercase}>{userName}</span>
        </div> : < div className={styles.loginBox} onClick={() => handleNavigation('/login')}>
          <img src={userIcon} className={styles.userIcon} alt='search icon' />
          <span>Login</span>
        </div>}
      </div>

    </div >
  )
}

NavigationMenu.propTypes = {}

export default NavigationMenu