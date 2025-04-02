import React, { useEffect, useState } from 'react'
import NavigationMenu from '../../HOC/Header/User/NavigationMenu';
import styles from './styles.module.scss';
import globalStyle from '../../../styles/globalStyle.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, resetForgetPassword, resetValidateCode, validateCode } from '../../../store/actions/auth/auth.actions';
import Alert from '../../HOC/Alert/Alert';
import lodingIcon from '../../../assets/loding.svg';
import { fetchFromLocalStorage, removeDataFromLocalStorage, storeInLocalStorage } from '../../../utils/localstorage';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constants/paths/common';

const ForgetPassword = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const forgetPasswordReducer = useSelector((state) => state.auth.forgetPasswordReducer);
    const verificationCodeLoading = useSelector((state) => state.auth.validateCodeReducer.loading);
    const verificationCodeSuccess = useSelector((state) => state.auth.validateCodeReducer.success);
    const verificationCodeFailure = useSelector((state) => state.auth.validateCodeReducer.failure);
    const verificationCodeMessage = useSelector((state) => state.auth.validateCodeReducer.message);
    const [isShow, setIsShow] = useState(true)
    const [isShowVerify, setIsShowVerify] = useState(true)
    const isCodeGenerate = fetchFromLocalStorage("isCodeGenerate");
    const getEmail = fetchFromLocalStorage("user_email");
    const { success, failure, message, loading } = forgetPasswordReducer;
    const navigate = useNavigate()

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
            storeInLocalStorage.storeEmail(email);
            dispatch(forgetPassword.request({ emailorMobile: email }))

        }
    }

    const handleCode = (e) => {
        const value = e.target.value;

        if (/^\d{0,6}$/.test(value)) {
            setCode(value);
        }
    }

    const handleVerifyCode = () => {
        if (code.trim() === "") {
            setError("Please enter a code.")
        } else {
            setIsClicked(true)
            dispatch(validateCode.request({ emailorMobile: getEmail, resetToken: code }))

        }
    }

    useEffect(() => {
        if (success === true && message === "Token sent to email") {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                setIsClicked(false)
                dispatch(resetForgetPassword.success());
            }, 3000)
        }
        if (failure) {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                dispatch(resetForgetPassword.success())
                setIsClicked(false)
            }, 3000)
        }
    }, [success, message, failure])

    // this is for verification code
    useEffect(() => {
        if (verificationCodeSuccess === true && verificationCodeMessage === "Code is valid. You can now reset your password.") {
            setIsShowVerify(true)
            removeDataFromLocalStorage("isCodeGenerate")
            setTimeout(() => {
                setIsShowVerify(false)
                setIsClicked(false)
                dispatch(resetValidateCode.success());
                navigate(paths.RESETTOKEN)
            }, 3000)
        }
        if (verificationCodeFailure) {
            if (verificationCodeMessage === "Verification Code has expired.") {
                removeDataFromLocalStorage("isCodeGenerate")
            }
            setIsShowVerify(true)
            setTimeout(() => {
                setIsShowVerify(false)
                dispatch(resetValidateCode.success())
                setIsClicked(false)
            }, 3000)

        }
    }, [verificationCodeSuccess, verificationCodeMessage, verificationCodeFailure])

    return (
        <div className={styles.forgetPasswordContainer}>
            <NavigationMenu />
            <div className={(loading || verificationCodeLoading) ? `${styles.popupContainer} ${globalStyle.disabled}` : styles.popupContainer}>
                {(loading || verificationCodeLoading) && <div className={globalStyle.loader}>
                    <img src={lodingIcon} alt="Loading icon" className={globalStyle.loadingImg} />
                </div>}
                {
                    (isCodeGenerate) ?
                        <div className={styles.forgetPopup}>
                            <div className={styles.forgetBody}>
                                <h1>Verify your email address</h1>
                                <p>We emailed you a verification code to {getEmail}. Enter code below to confirm your email address.</p>
                                <div className={`${styles.inputField} ${error.length > 0 ? globalStyle.failure : ""}`}>
                                    <input type="text" value={code} name="code" onChange={handleCode} onBlur={handleOnBlur} />
                                    <span className={globalStyle.error}>{error}</span>
                                </div>
                                <button className={styles.emailBtn} onClick={handleVerifyCode} disabled={error.length > 0 || isClicked}>Verify</button>
                            </div>
                        </div> :
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
                        </div>
                }
                {isShow && <Alert
                    message={message}
                    type={success === true && failure === false ? "success"
                        : success === false && failure === true ? "fail" : ""}
                    setIsShow={setIsShow} />
                }
                {isShowVerify && <Alert
                    message={verificationCodeMessage}
                    type={verificationCodeSuccess === true && verificationCodeFailure === false ?
                        "success" : verificationCodeSuccess === false && verificationCodeFailure === true
                            ? "fail" : ""} setIsShow={setIsShow} />
                }
            </div>
        </div >
    )
}

export default ForgetPassword