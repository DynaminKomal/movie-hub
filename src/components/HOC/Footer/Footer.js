import React from 'react';
import styles from './styles.module.scss';

const Footer = () => {
    //get year form current date
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className={styles.footer}>
            <div className={styles.copyright}>Copyright © {year} Movie Hub. All rights reserved.</div>
            <ul className={styles.link}>
                <li><a href='#' target='_blank' rel='noreferrer'>Privacy Policy</a></li>
                <li><a href='#' target='_blank' rel='noreferrer'>Terms of Service</a></li>
            </ul>
        </div>
    )
}

export default Footer