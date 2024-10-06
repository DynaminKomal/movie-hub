import React from 'react';
import styles from './styles.module.scss'
import InputBox from '../HOC/InputBox/InputBox';

const Login = () => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <h2>Sign In</h2>
                <div>
                    <InputBox/>
                </div>
            </div>
        </div>
    )
}

export default Login