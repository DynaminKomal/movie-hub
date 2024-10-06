import React from 'react';
import styles from './styles.module.scss'

const InputBox = () => {
  return (
    <div className={styles.inputField}>
        <label className={styles.label}>Email or mobile number</label>
        <input />
    </div>
  )
}

export default InputBox