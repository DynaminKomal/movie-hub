import React from 'react'
import NavigationMenu from '../HOC/Header/NavigationMenu';
import styles from './styles.module.scss';


const ForgetPassword = () => {

    return (
        <div className={styles.forgetPasswordContainer}>
            <NavigationMenu />
            <div className={styles.forgetPopup}>
                <div className={styles.forgetBody}>
                    <h1>Forget Password</h1>
                    <p>We will send you an email with instructions on how to reset your password.</p>
                    <div className={styles.inputField}>
                        <input type="text" placeholder='name@example.com' />
                    </div>
                    <div className={styles.btn}>
                    </div>
                    <button className={styles.emailBtn}>Email Me</button>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword