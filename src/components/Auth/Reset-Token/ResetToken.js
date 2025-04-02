import React, { useEffect, useState } from 'react';
import NavigationMenu from '../../HOC/Header/User/NavigationMenu';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetToken } from '../../../store/actions/auth/auth.actions';
import { useNavigate, useParams } from 'react-router-dom';
import { paths } from '../../../constants/paths/common';
import Alert from '../../HOC/Alert/Alert';
import lodingIcon from '../../../assets/loding.svg';
import globalStyle from '../../../styles/globalStyle.module.scss'
import InputBox from '../../HOC/InputBox/InputBox';

const ResetToken = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { token } = params;
    const [isShow, setIsShow] = useState(true)
    const resetPasswordReducer = useSelector((state) => state.auth.resetTokenReducer)
    const { success, failure, message, loading } = resetPasswordReducer

    const [inputValues, setInputValues] = useState({
        password: "", confirmPassword: ""
    })
    const [multipleError, setMultipleError] = useState({
        password: "",
        confirmPassword: ""
    });

    const [isDisabled, setIsDisabled] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    }
    const handleOnFocus = (e) => {
        const { name } = e.target;
        setMultipleError((prevValues) => ({
            ...prevValues,
            [name]: ""
        }));
    };

    const handleOnBlur = (e) => {
        const { name, value } = e.target;

        if (name === "password" && (value.trim() === "" || value.length < 8 || value.length > 60)) {
            setMultipleError((prev) => ({
                ...prev,
                [name]: "Password must contain between 8 and 60 characters."
            }));
        }

        if (name === "confirmPassword" && (value.trim() === "" || value.length < 8 || value.length > 60)) {
            setMultipleError((prev) => ({
                ...prev,
                [name]: "Confirm Password must contain between 8 and 60 characters."
            }));
        }
        if (inputValues.password.trim().length >= 8 && inputValues.confirmPassword.trim().length >= 8) {
            if (inputValues.password !== inputValues.confirmPassword) {
                setMultipleError((prev) => ({
                    ...prev,
                    confirmPassword: "Confirm Password does not match the password."
                }));
            } else {
                setMultipleError((prev) => ({
                    ...prev,
                    confirmPassword: ""
                }));
            }
        }
    };

    const handleSaveNewPassword = () => {
        if (inputValues.password.trim() === "" && inputValues.confirmPassword.trim() === "") {
            setMultipleError({
                password: "Please provide password.",
                confirmPassword: "Please provide confirm password."
            })
        } else if (inputValues.password.trim() !== "" && inputValues.confirmPassword.trim() === "") {
            setMultipleError({
                password: "",
                confirmPassword: "Please provide confirm password."
            })
        }
        else if (inputValues.password.trim() === "" && inputValues.confirmPassword.trim() !== "") {
            setMultipleError({
                password: "Please provide password.",
                confirmPassword: ""
            })
        }
        else {
            const payload = {
                token: token,
                password: inputValues.password,
                confirmPassword: inputValues.confirmPassword,
            }
            setIsDisabled(true);
            dispatch(resetToken.request(payload))
        }
    }
    useEffect(() => {
        if (multipleError.confirmPassword !== "") {
            setIsDisabled(true);
        } else if (multipleError.password !== "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [multipleError])

    useEffect(() => {
        if (success === true && message === "You logged in successfully!") {
            setIsShow(true)
            navigate(paths.GOTODASHBOARD)
            setIsShow(false)
            setIsDisabled(false)

        }
        if (failure) {
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                setIsDisabled(false)
            }, 3000)
        }
    }, [success, message, failure])

    return (
        <div className={loading ? `${styles.resetTokenContainer} ${globalStyle.disabled}`: styles.resetTokenContainer}>
            <NavigationMenu />
            <div className={styles.popupContainer}>
                {loading && <div className={globalStyle.loader}>
                    <img src={lodingIcon} alt="Loading icon" className={globalStyle.loadingImg} />
                </div>}
                <div className={styles.resetPopup}>
                    <div className={styles.resetBody}>
                        <h3>Reset your password</h3>
                        <div className={styles.formContainer}>
                            <InputBox
                                id="password"
                                name="password"
                                type="password"
                                label="New Password"
                                value={inputValues.password}
                                onChange={handleOnChange}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                error={multipleError.password}
                            />
                            <InputBox
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Confrim New Password"
                                value={inputValues.confirmPassword}
                                onChange={handleOnChange}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                error={multipleError.confirmPassword}
                            />
                            <button className={styles.emailBtn} onClick={handleSaveNewPassword} disabled={isDisabled}>Save</button>
                        </div>
                    </div>
                    {isShow && <Alert
                        message={message}
                        type={success === true && failure === false ? "success" : success === false && failure === true ? "fail" : ""} setIsShow={setIsShow} />}
                </div>
            </div>
        </div>
    )
}

export default ResetToken