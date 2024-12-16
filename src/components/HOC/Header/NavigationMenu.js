import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import logo from '../../../assets/logo.png';
import searchIcon from '../../../assets/search.svg';
import userIcon from '../../../assets/user.svg';
import { navigation } from '../../../constants/naviagtionList/navigation'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../../utils/helper';
import { fetchFromLocalStorage, removeFromLocalStorage } from '../../../utils/localstorage';
import globalStyle from '../../../styles/globalStyle.module.scss';
import plusIcon from '../../../assets/plusIcon.svg';
import starIcon from '../../../assets/star.svg';
import logoutIcon from '../../../assets/logout.svg';
import { useDispatch } from 'react-redux';
import { resetLogin } from '../../../store/actions/auth/login.action';

const NavigationMenu = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const userName = fetchFromLocalStorage("user_first_name") ? fetchFromLocalStorage("user_first_name") : "";
  const profileImage = fetchFromLocalStorage("profile_image") ? fetchFromLocalStorage("profile_image") : "";
  const isLogin = isAuthenticated()

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path)
  }

  // Toggle dropdown visibility
  const handleDropDownShow = () => {
    setIsShow(!isShow)
  }

  //Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(resetLogin())
    removeFromLocalStorage.signout()
    navigate('/login')
  }
  return (
    <div className={isLogin ? styles.navbar : styles.transparentNavBar}>
      <img src={logo} className={styles.logo} alt='logo' onClick={() => handleNavigation('/')} />

      {!isLogin ? <div className={styles.signIn} onClick={() => handleNavigation('/')}>Sign In</div> :
        <div className={styles.navContainer}>
          <ul>
            {navigation?.map((nav, index) => {
              return (
                <li key={index} onClick={() => handleNavigation(nav.path)}>{nav.name}</li>
              )
            })}
          </ul>
          <div className={styles.searchBox}>
            <img src={searchIcon} className={styles.searchIcon} alt='search icon' />
            {isAuthenticated() ?
              <div>
                < div className={styles.loginBox} onClick={handleDropDownShow}>
                  <img
                    src={profileImage ? profileImage : userIcon}
                    className={styles.userIcon}
                    alt={userName || 'Default User'}
                  />
                  <span className={globalStyle.uppercase}>{userName}</span>
                </div>
                {isShow && <div className={styles.dropDown} ref={dropdownRef}>
                  <ul>
                    <li>
                      <img src={userIcon} className={styles.userIcon} alt='user icon' />
                      My Account
                    </li>
                    <li>
                      <img src={plusIcon} className={styles.userIcon} alt='watchlist icon' />
                      Watchlist
                    </li>
                    <li>
                      <img src={starIcon} className={styles.userIcon} alt='Subscription icon' />
                      Subscription
                    </li>
                    <li onClick={handleLogout}>
                      <img src={logoutIcon} className={styles.userIcon} alt='Logout icon' />
                      Logout
                    </li>
                  </ul>
                </div>}
              </div> : <></>}
          </div>
        </div>
      }
    </div >
  )
}

NavigationMenu.propTypes = {}

export default NavigationMenu