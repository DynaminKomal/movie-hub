import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png';
import searchIcon from '../../../assets/search.svg';
import userIcon from '../../../assets/user.svg';
import { navigation } from '../../../constants/naviagtionList/navigation'

const NavigationMenu = () => {
  return (
    <div className={styles.navbar}>
      <img src={logo} className={styles.logo} alt='logo' />
      <ul>
        {navigation?.map((nav, index) => {
          return (
            <li key={index}>{nav.name}</li>
          )
        })}
      </ul>
      <div className={styles.searchBox}>
        <img src={searchIcon} className={styles.searchIcon} alt='search icon' />
        <div className={styles.loginBox}>
          <img src={userIcon} className={styles.userIcon} alt='search icon' />
          <span>Login</span>
        </div>
      </div>

    </div>
  )
}

NavigationMenu.propTypes = {}

export default NavigationMenu