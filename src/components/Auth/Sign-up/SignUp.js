import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import InputBox from '../../HOC/InputBox/InputBox';
import Button from '../../HOC/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../constants/paths/common';
import Alert from '../../HOC/Alert/Alert';
import lodingIcon from '../../../assets/loding.svg';
import globalStyle from '../../../styles/globalStyle.module.scss';
import CustomDropDown from '../../HOC/DropDown/CustomDropDown';
import DateComponent from '../../HOC/UI/DateComponent';
import moment from 'moment'
import { resetSignup, signUp } from '../../../store/actions/auth/auth.actions';


const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signupRedcuer = useSelector((state) => state.auth.signupRedcuer)
    const { success, message, failure, data, loading } = signupRedcuer;
    const [isShow, setIsShow] = useState(false);
    const [error, setError] = useState("");
    const [isAlert, setIsAlert] = useState(false)

    const [inputValues, setInputValues] = useState({
        firstName: "",
        lastName: ""
    });
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        confirmPassword: ""
    });

    const [dob, setDOB] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
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
    const [selectedCountryCode, setSelectedCountryCode] = useState("In +91");

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        if (/^[a-zA-Z]+$/.test(value)) {
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        } else if (!/^[A-Za-z0-9]+$/.test(value) || !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: ""
            }))
        }
    };

    const handlePasswordValue = (e) => {
        const { name, value } = e.target;
        setPasswordValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleMobileNumber = (e) => {
        const { value, name } = e.target;
        if (/^[0-9+]+$/.test(value)) {
            setMobileNumber(value)
            setMultipleError((prevValues) => ({
                ...prevValues,
                [name]: ""
            }));
        } else if (!/^[A-Za-z0-9]+$/.test(value)) {
            setMobileNumber("")
            setMultipleError((prevValues) => ({
                ...prevValues,
                [name]: ""
            }));
        }

    };

    function validation() {
        let errors = {
            firstName: true,
            lastName: true,
            dob: true,
            mobileNumber: true,
            password: true,
            confirmPassword: true,
            gender: true,
            email: true,
        }

        if (inputValues.firstName.trim() === "" || multipleError.firstName !== "") {
            errors.firstName = false;
        }
        if (inputValues.lastName.trim() === "" || multipleError.lastName !== "") {
            errors.lastName = false;
        }
        if (passwordValues.password.trim() === "" || multipleError.password !== "") {
            errors.password = false;
        }
        if (passwordValues.confirmPassword.trim() === "" || multipleError.confirmPassword !== "") {
            errors.confirmPassword = false;
        }
        if (dob === "" || error !== "") {
            errors.dob = false;
        }
        if (mobileNumber.trim() === "" || multipleError.mobileNumber !== "") {
            errors.mobileNumber = false;
        }
        if (gender.trim() === "" || multipleError.gender !== "") {
            errors.gender = false;
        }
        if (email.trim() === "" || multipleError.email !== "") {
            errors.email = false;
        }

        const isValid = Object.values(errors).every(value => value === true);
        return isValid;
    }

    const handleSubmit = () => {
        if (inputValues.firstName.trim() === "" &&
            inputValues.lastName.trim() === "" &&
            mobileNumber.trim() === "" &&
            gender === "" &&
            passwordValues.password.trim() === "" &&
            passwordValues.confirmPassword.trim() === "" &&
            email.trim() === "" && dob === "") {
            setIsAlert(true)
        } else if (validation()) {
            const countryCode = selectedCountryCode?.split(' ')[1]
            const payload = {
                firstName: inputValues.firstName.trim(),
                lastName: inputValues.lastName.trim(),
                email: email.trim(),
                mobileNo: (countryCode) ? countryCode + mobileNumber : "",
                dob: dob ? moment(dob).format("YYYY-MM-DD") : null,
                gender: gender,
                password: passwordValues.password.trim(),
                passwordConfirm: passwordValues.confirmPassword.trim(),
            }
            dispatch(signUp.request(payload))
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
        if (isAlert) {
            setTimeout(() => {
                setIsAlert(false)
            }, 2000)
        }
    }, [isAlert])

    useEffect(() => {
        if (success === true && message === "A new user created successfully!") {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                dispatch(resetSignup.success());
                navigate(paths.LOGIN);
            }, 3000)
        }
        if (failure) {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                dispatch(resetSignup.success());
            }, 3000)
        }
    }, [success, message, navigate, data])

    const handleOnBlur = (e) => {
        const { name, value } = e.target;
        if (name === "email" && value.length > 0) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const isEmailValid = emailRegex.test(value);
            if (isEmailValid) {
            } else {
                setMultipleError((prevValues) => ({
                    ...prevValues,
                    [name]: "Please enter a valid email address."
                }));
            }
        }
        if (name === "mobileNumber" && value.length !== 10 && (/^[0-9+]+$/.test(value))) {
            setMultipleError((prevValues) => ({
                ...prevValues,
                [name]: "Only numbers are allowed and mobile number must have 10 digits."
            }));
        }

        if ((name === "password" || name === "confirmPassword") && value.length !== 0) {
            const text = name === "confirmPassword" ? " Confirm Password" : "Password";
            if (value.length < 8) {
                setMultipleError((prevValues) => ({
                    ...prevValues,
                    [name]: `${text} must contain between 8 and 60 characters.`
                }));
            }
            else if (!/[A-Z]/.test(value) && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                setMultipleError((prevValues) => ({
                    ...prevValues,
                    [name]: `${text} must at least one capital letter and special character.`
                }));
            }
            else if (!/[A-Z]/.test(value)) {
                setMultipleError((prevValues) => ({
                    ...prevValues,
                    [name]: `${text} must at least one capital letter and special character.`
                }));
            }
            else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                setMultipleError((prevValues) => ({
                    ...prevValues,
                    [name]: `${text} must at least one capital letter and special character.`
                }));
            }
        }

        if ((name === "firstName" || name === "lastName") && value.length !== 0) {
            const text = name === "firstName" ? "first" : "last";
            if (!/^[a-zA-Z]+$/.test(value) || value.length > 10) {
                setMultipleError((prevValues) => ({
                    ...prevValues,
                    [name]: `Only letters are allowed and ${text} name must have at most 10 letters.`
                }));
            }

        }
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

    const handleSelectGender = (value) => {
        setGender(value)
    }
    const handleEnterKeyPressed = (e) => {
        if (e.key === 'Enter') {
            handleOnBlur(e);
            handleSubmit()
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
                                isPhoneNumber={false}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                                onKeyDown={handleEnterKeyPressed}
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
                                isPhoneNumber={false}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                                onKeyDown={handleEnterKeyPressed}
                            />
                        </div>
                        <div className={styles.row}>
                            <InputBox
                                id="email"
                                name="email"
                                type="text"
                                value={email}
                                label="Email *"
                                error={multipleError.email}
                                onChange={handleEmail}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                isPhoneNumber={false}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                                onKeyDown={handleEnterKeyPressed}
                            />
                            <InputBox
                                id="mobileNumber"
                                name="mobileNumber"
                                type="text"
                                value={mobileNumber}
                                label="Mobile Number *"
                                error={multipleError.mobileNumber}
                                onChange={handleMobileNumber}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                isPhoneNumber={true}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                                onKeyDown={handleEnterKeyPressed}
                            />
                        </div>
                        <div className={styles.row}>
                            <DateComponent
                                name="dob"
                                dob={dob}
                                setdob={setDOB}
                                label="Date of Birth *"
                                error={error}
                                setError={setError}
                                onKeyDown={handleEnterKeyPressed}
                            />

                            <CustomDropDown
                                id="gender"
                                name="gender"
                                label="Gender *"
                                value={gender}
                                error={multipleError.gender}
                                handleClick={handleSelectGender}
                            />
                        </div>

                        <div className={styles.row}>
                            <InputBox
                                id="password"
                                name="password"
                                type="password"
                                value={passwordValues.password}
                                label="Password *"
                                error={multipleError.password}
                                onChange={handlePasswordValue}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                isPhoneNumber={false}
                                countryCode={selectedCountryCode}
                                onCountryCodeChange={handleCountryCodeChange}
                                onKeyDown={handleEnterKeyPressed}
                            />
                            <InputBox
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={passwordValues.confirmPassword}
                                label="Confirm Password *"
                                error={multipleError.confirmPassword}
                                onChange={handlePasswordValue}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                isPhoneNumber={false}
                                onKeyDown={handleEnterKeyPressed}
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

                    {isAlert && <Alert
                        message="Please fill all mendatory fields"
                        type={"fail"} setIsShow={setIsAlert} />}
                </div>
            </div>
        </div>
    );
};

export default SignUp