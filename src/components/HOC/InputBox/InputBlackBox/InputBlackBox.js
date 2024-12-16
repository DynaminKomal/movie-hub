import React, { useState } from 'react';
import styles from './styles.module.scss';
import globalStyles from '../../../../styles/globalStyle.module.scss';
import errorIcon from '../../../../assets/error.svg';
import eyeIcon from '../../../../assets/eyeIcon.svg'
import eyeSlashIcon from '../../../../assets/eye-slash.svg'

const InputBlackBox = (props) => {
    const { id, name, value, onChange, label, error, onFocus, type, onBlur } = props;
    const [inputType, setInputType] = useState(type || 'password');
    const handleToggleEye = (event) => {
        event.preventDefault();
        setInputType(prevType => (prevType === 'password' ? 'text' : 'password'));
    }
    return (
        <div className={`${styles.inputField}`}>
            <div className={`${styles.labelAndInputContainer} ${error?.length ? styles.failure : ""}`}>
                <label htmlFor={id} className={`${styles.label} ${value.length > 0 ? styles.labelOnValue : ""}`}>{label}</label>
                <div className={styles.inputContainer}>
                    <input
                        type={inputType}
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    <img src={inputType === "text" ? eyeSlashIcon : eyeIcon} 
                    className={styles.eyeIcon} 
                    onMouseDown={handleToggleEye} />
                </div></div>
            {error?.length > 0 && (
                <div className={globalStyles.errorBox}>
                    <img src={errorIcon} alt="error" />
                    <span className={globalStyles.error}>{error}</span>
                </div>
            )}
        </div>
    );
};

export default InputBlackBox;
