import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.scss'

const Button = props => {
    const { name } = props;
    return (
        <button className={styles.btn}>{name}</button>
    )
}

Button.propTypes = {
    name: PropTypes.string //name of button 
}

export default Button