import React, { useEffect, useState } from 'react'
import NavigationMenu from '../../HOC/Header/User/NavigationMenu';
import styles from './styles.module.scss';
import globalStyle from '../../../styles/globalStyle.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, resetForgetPassword } from '../../../store/actions/auth/forgetPassword.action';
import Alert from '../../HOC/Alert/Alert';
import lodingIcon from '../../../assets/loding.svg';

const ForgetPassword = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const forgetPasswordReducer = useSelector((state) => state.auth.forgetPasswordReducer);
    const [isShow, setIsShow] = useState(true)
    const { success, failure, message, loading } = forgetPasswordReducer;

    const handleOnchange = (e) => {
        const { value } = e.target;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isEmailValid = emailRegex.test(value);
        if (isEmailValid) {
            setError("")
        } else {
            setError("Please enter a valid email address.")
        }
        setEmail(value)
    }
    const handleOnBlur = () => {
        setError("")
    }

    const isEmailValid = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isEmailValid = emailRegex.test(email);
        if (isEmailValid) {
            setError("")
        } else {
            setError("Please enter a valid email address.")
        }
        return isEmailValid;
    }

    const handleForgetEmailRequest = () => {
        if (email.trim() === "") {
            setError("Please enter a valid email address.")
        } else if (isEmailValid()) {
            setIsClicked(true)
            dispatch(forgetPassword.request({ emailorMobile: email }))

        }
    }


    useEffect(() => {
        if (success === true && message === "Token sent to email") {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                setIsClicked(false)
                dispatch(resetForgetPassword.success())
            }, 3000)
        }
        if (failure) {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                setIsClicked(false)
            }, 3000)
        }
    }, [success, message, failure])

    return (
        <div className={styles.forgetPasswordContainer}>
            <NavigationMenu />
            <div className={loading ? `${styles.popupContainer} ${globalStyle.disabled}` : styles.popupContainer}>
                {loading && <div className={globalStyle.loader}>
                    <img src={lodingIcon} alt="Loading icon" className={globalStyle.loadingImg} />
                </div>}
                <div className={styles.forgetPopup}>
                    <div className={styles.forgetBody}>
                        <h1>Forget Password</h1>
                        <p>We will send you an email with instructions on how to reset your password.</p>
                        <div className={`${styles.inputField} ${error.length > 0 ? globalStyle.failure : ""}`}>
                            <input type="text" value={email} name="email" placeholder='name@example.com' onChange={handleOnchange} onBlur={handleOnBlur} />
                            <span className={globalStyle.error}>{error}</span>
                        </div>
                        <button className={styles.emailBtn} onClick={handleForgetEmailRequest} disabled={error.length > 0 || isClicked}>Email Me</button>
                    </div>
                    {isShow && <Alert
                        message={message}
                        type={success === true && failure === false ? "success" : success === false && failure === true ? "fail" : ""} setIsShow={setIsShow} />}
                </div>
            </div>
        </div >
    )
}

export default ForgetPassword