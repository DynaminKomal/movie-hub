import React from 'react';
import globalStyle from '../../../styles/globalStyle.module.scss';
import errorIcon from '../../../assets/errorWarning.svg'
import checkIcon from '../../../assets/check.svg'

const Alert = (props) => {
    const { message, type, setIsShow } = props;
    const handleClose = () => {
        setIsShow(false)
    }
    return (
        <div className={`${globalStyle.alert} ${type === "success" ? globalStyle.alertSuccess : type === "fail" ? globalStyle.alertError : ""}`}>
            <span className={globalStyle.closeIcon} onClose={handleClose}>x</span>
            < div className={globalStyle.text}>
                {type === "success" || type === "fail" && <img src={type === "success" ? checkIcon : errorIcon} alt={`${type}-icon`} />}
                {message}
            </div >
        </div>
    )
}

export default Alert