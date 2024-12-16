import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import InputBox from '../../HOC/InputBox/InputBox';
import Button from '../../HOC/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/actions/auth/login.action'
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constants/paths/common';
import Alert from '../../HOC/Alert/Alert';
import { signout } from '../../../utils/localstorage'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginReducer = useSelector((state) => state.auth.loginReducer)
    const { success, message, failure, data } = loginReducer;
    const [isShow, setIsShow] = useState(false)

    const [inputValues, setInputValues] = useState({
        emailOrMobile: "",
        password: ""
    });
    const [multipleError, setMultipleError] = useState({
        emailOrMobile: "",
        password: ""
    });
    const isPhoneNumber = /^[0-9+]+$/.test(inputValues.emailOrMobile);
    const [selectedCountryCode, setSelectedCountryCode] = useState("In +91");

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (inputValues.emailOrMobile?.trim() === "" && inputValues.password?.trim() === "") {
            setMultipleError({
                emailOrMobile: "Please enter a valid email address or phone number.",
                password: "Your password must contain between 4 and 60 characters."
            });
        } else {
            const countryCode = selectedCountryCode?.split(' ')[1]
            const payload = {
                emailorMobile: (countryCode && isPhoneNumber) ? countryCode + inputValues.emailOrMobile : inputValues.emailOrMobile,
                password: inputValues.password
            }
            dispatch(login.request(payload))
        }
    };

    const handleOnFocus = (e) => {
        const { name } = e.target;
        setMultipleError((prevValues) => ({
            ...prevValues,
            [name]: ""
        }));
    };

    useEffect(() => {
        signout()
    }, [])

    useEffect(() => {
        if (success === true && message === "You logged in successfully!") {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                navigate(paths.GOTODASHBOARD);
            }, 3000)
        }
        if (failure) {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
            }, 3000)
        }
    }, [success, message, navigate, data])

    const handleOnBlur = (e) => {
        const { name, value } = e.target;

        if (value.trim() === "") {
            if (name === "emailOrMobile") {
                setMultipleError((prev) => ({
                    ...prev,
                    [name]: "Please enter a valid email address or phone number."
                }));
            } else if (name === "password") {
                setMultipleError((prev) => ({
                    ...prev,
                    [name]: "Your password must contain between 4 and 60 characters."
                }));
            }
        }
        else if (name === "emailOrMobile") {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const phoneRegex = /^[0-9]{10,15}$/;

            const isEmailValid = emailRegex.test(value);
            const isPhoneValid = phoneRegex.test(value);

            if (isEmailValid) {
                setMultipleError((prev) => ({
                    ...prev,
                    [name]: ""
                }));
            } else if (isPhoneValid) {
                setMultipleError((prev) => ({
                    ...prev,
                    [name]: ""
                }));
            } else {
                if (value.includes('@')) {
                    setMultipleError((prev) => ({
                        ...prev,
                        [name]: "Please enter a valid email address."
                    }));
                } else if (/^[0-9]+$/.test(value)) {
                    setMultipleError((prev) => ({
                        ...prev,
                        [name]: "Please enter a valid phone number."
                    }));
                } else {
                    setMultipleError((prev) => ({
                        ...prev,
                        [name]: "Please enter a valid email address."
                    }));
                }
            }
        } else if (name === "password" && (value.length < 4 || value.length > 60)) {
            setMultipleError((prev) => ({
                ...prev,
                [name]: "Your password must contain between 4 and 60 characters."
            }));
        }
    };



    const handleCountryCodeChange = (e) => {
        const { value } = e.target;
        setSelectedCountryCode(value);
    };

    const handleForgetPassword = ()=>{
        navigate(paths.FORGETPASSWORD)
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <h2>Sign In</h2>
                <div className={styles.fieldBox}>
                    <InputBox
                        id="emailOrMobile"
                        name="emailOrMobile"
                        type="text"
                        value={inputValues.emailOrMobile}
                        label="Email or mobile number"
                        error={multipleError.emailOrMobile}
                        onChange={handleInputValue}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                        isPhoneNumber={isPhoneNumber}
                        countryCode={selectedCountryCode}
                        onCountryCodeChange={handleCountryCodeChange}
                    />
                    <InputBox
                        id="password"
                        name="password"
                        type="password"
                        value={inputValues.password}
                        label="Password"
                        error={multipleError.password}
                        onChange={handleInputValue}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                    />
                    <div className={styles.button}>
                        <Button name="Sign in" text="button" onClick={handleSubmit} />
                    </div>
                    <div className={styles.forgetPasswordText} onClick={handleForgetPassword}>
                        Forget Password?
                    </div>
                </div>
                {isShow && <Alert
                    message={message}
                    type={success === true && failure === false ? "success" : success === false && failure === true ? "fail" : ""} setIsShow={setIsShow} />}
            </div>
        </div>
    );
};

export default Login;
