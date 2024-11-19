import React from 'react';
import styles from './styles.module.scss';
import globalStyles from '../../../styles/globalStyle.module.scss';
import errorIcon from '../../../assets/error.svg';

const InputBox = (props) => {
  const { id, name, value, onChange, label, error, onFocus, type, onBlur, isPhoneNumber, countryCode, onCountryCodeChange } = props;

  return (
    <div className={`${styles.inputField}`}>
      <div className={`${styles.labelAndInputContainer} ${error?.length ? styles.failure : ""}`}>
        <label htmlFor={id} className={`${styles.label} ${value.length > 0 ? styles.labelOnValue : ""}`}>{label}</label>
        <div className={styles.inputContainer}>
          {isPhoneNumber ? (
            <div className={styles.selectBox}>
              <select value={countryCode} onChange={onCountryCodeChange}>
                <option value="In +91">India +91</option>
                <option value="US +1">USA +1</option>
                <option value="UK +44">UK +44</option>
                <option value="CA +1">Canada +1</option>
              </select>
            </div>
          ) : null}
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
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

export default InputBox;
