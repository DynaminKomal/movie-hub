import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.scss'

const Button = (props) => {
    const { name, image_icon, image_position, image_name, text, onClick } = props;
    return (
        <button className={`${styles.btn} ${text === "button" ? styles.addwidth : ""}`} onClick={onClick}>
            {image_position === "left" && image_icon && <img src={image_icon} alt={image_name} />}
            {name}
            {image_position === "right" && image_icon && <img src={image_icon} alt={image_name} />}
        </button>
    )
}

Button.propTypes = {
    name: PropTypes.string //name of button 
}

export default Button