import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import InputBox from '../../HOC/InputBox/InputBox';
import Button from '../../HOC/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/actions/auth/login.action'
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constants/paths/common';
import Alert from '../../HOC/Alert/Alert';
import { signout } from '../../../utils/localstorage';
import lodingIcon from '../../../assets/loding.svg';
import globalStyle from '../../../styles/globalStyle.module.scss';


const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginReducer = useSelector((state) => state.auth.loginReducer)
    const { success, message, failure, data, loading } = loginReducer;
    const [isShow, setIsShow] = useState(false)

    const [inputValues, setInputValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: ""
    });
    const [multipleError, setMultipleError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: ""
    });
    const isPhoneNumber = /^[0-9+]+$/.test(inputValues.mobileNumber);
    const [selectedCountryCode, setSelectedCountryCode] = useState("In +91");

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = () => {
      
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
    };



    const handleCountryCodeChange = (e) => {
        const { value } = e.target;
        setSelectedCountryCode(value);
    };

    const handleNavigation = (name) => {
        if (name === "sign in") {
            navigate(paths.LOGIN)
        }
    }

    return (
        <div className={loading ? `${styles.signUpContainer} ${globalStyle.disabled}` : styles.signUpContainer}>
            <div className={styles.signUpForm}>
                <div className={styles.formContainer}>
                    {loading && <div className={globalStyle.loader}>
                        <img src={lodingIcon} alt="Loading icon" className={globalStyle.loadingImg} />
                    </div>}
                    <h2>Create Free Account</h2>
                    <p>It's free. No subscription required</p>
                    <div className={styles.fieldBox}>
                        <div className={styles.row}>
                            <InputBox
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={inputValues.firstName}
                                label="First Name *"
                                error={multipleError.firstName}
                                onChange={handleInputValue}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                isPhoneNumber={isPhoneNumber}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                            />
                            <InputBox
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={inputValues.lastName}
                                label="Last Name *"
                                error={multipleError.lastName}
                                onChange={handleInputValue}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                isPhoneNumber={isPhoneNumber}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                            />
                        </div>
                        <InputBox
                            id="email"
                            name="email"
                            type="text"
                            value={inputValues.email}
                            label="Email *"
                            error={multipleError.email}
                            onChange={handleInputValue}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            isPhoneNumber={isPhoneNumber}
                            countryCode={selectedCountryCode}
                            onCountryCodeChange={handleCountryCodeChange}
                        />
                        <InputBox
                            id="mobileNumber"
                            name="mobileNumber"
                            type="text"
                            value={inputValues.mobileNumber}
                            label="Mobile Number *"
                            error={multipleError.mobileNumber}
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
                            label="Password *"
                            error={multipleError.password}
                            onChange={handleInputValue}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            isPhoneNumber={isPhoneNumber}
                            countryCode={selectedCountryCode}
                            onCountryCodeChange={handleCountryCodeChange}
                        />
                        <InputBox
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={inputValues.confirmPassword}
                            label="Confirm Password *"
                            error={multipleError.confirmPassword}
                            onChange={handleInputValue}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                        />
                        <div className={styles.row}>
                            <InputBox
                                id="dob"
                                name="dob"
                                type="text"
                                value={inputValues.dob}
                                label="Date of Birth *"
                                error={multipleError.dob}
                                onChange={handleInputValue}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                isPhoneNumber={isPhoneNumber}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                            />
                            <InputBox
                                id="gender"
                                name="gender"
                                type="text"
                                value={inputValues.gender}
                                label="Gender *"
                                error={multipleError.gender}
                                onChange={handleInputValue}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                isPhoneNumber={isPhoneNumber}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                            />
                        </div>
                        <div className={styles.button}>
                            <Button name="Register" text="button" onClick={handleSubmit} />
                        </div>
                        <div className={styles.signUptext} onClick={() => handleNavigation('sign in')}>
                            Already have an account? <span >Sign in</span>
                        </div>
                        <p className={styles.message}>By registered, you agree to Movie Hub <span className={styles.termsCondition}>Terms of use</span> and <span className={styles.privacy}>Privacy Policy</span></p>
                    </div>
                    {isShow && <Alert
                        message={message}
                        type={success === true && failure === false ? "success" : success === false && failure === true ? "fail" : ""} setIsShow={setIsShow} />}
                </div>
            </div>
        </div>
    );
};

export default SignUp