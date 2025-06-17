import React from 'react'
import styles from './styles.module.scss'
import Button from '@mui/material/Button';
import { adminNavigation } from '../../../../../constants/naviagtionList/adminNavigationList';
import { Link } from 'react-router-dom';


const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <ul>
        {adminNavigation.map((nav, index) => (
          <li key={index}>
            <Button>
              <span className={styles.icon}>
                {nav.icon}
              </span>
              {nav.label}
              {nav.hasSubmenu && (
                <span className={`${styles.icon} ${styles.arrow}`}>
                  {nav.submenuIcon}
                </span>
              )}
            </Button>
            <ul className={styles.subMenu}>
              <li>
                <Link>Product List</Link>
                <Link>Product List</Link>
                <Link>Product List</Link>
              </li>

            </ul>
          </li>
        ))}
      </ul>
    </div >
  )
}

export default SideBar