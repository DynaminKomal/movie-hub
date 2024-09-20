import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';

const MovieList = () => {
    return (
        <section className={styles.moviesConatiner}>
            <div className={styles.heading}>
               <h5>trending</h5>
               <span className={styles.viewAll}>viem all</span>
            </div>
        </section>
    )
}

MovieList.propTypes = {}

export default MovieList