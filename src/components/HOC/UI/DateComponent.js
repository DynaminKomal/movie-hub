import React, { useState, useRef, forwardRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { parse, isValid, format } from 'date-fns';
import calendarIcon from '../../../assets/calender.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import globalStyles from "../../../styles/globalStyle.module.scss";
import errorIcon from '../../../assets/error.svg';

const DateComponent = ({ name, dob, setdob, label, error, setError }) => {
    const currentYear = new Date().getFullYear();
    const fromYear = currentYear - 80;
    const toYear = currentYear - 18;
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const validDate = (newValue) => {
        const parsedDate = parse(newValue, 'MM/dd/yyyy', new Date());
        if (newValue.length === 10) {
            if (!isValid(parsedDate)) {
                setError("Date is invalid.");
                return false;
            }
            if (parsedDate.getFullYear() < fromYear || parsedDate.getFullYear() > toYear) {
                setError(`Date should be between ${fromYear} and ${toYear}.`);
                return false;
            }
            if (parsedDate.getFullYear() < 1000 || parsedDate.getFullYear() > 9999) {
                setError("Year is out of valid range.");
                return false;
            }
            setError("");
            return true;
        }
        return false;
    };

    const handleChangeDob = (e) => {
        const newValue = e.target.value;
        const DateOfBirthRegex = /^[0-9\/]*$/;
        if (DateOfBirthRegex.test(newValue) && newValue.length <= 10) {
            setInputValue(newValue);
        }
    };

    const handleDateBlur = () => {
        validDate(inputValue);
        setIsFocused(false);
    };

    const handleDateFocus = () => {
        setIsFocused(true);
    };

    function range(start, end, step = 1) {
        const array = [];
        for (let i = start; i <= end; i += step) {
            array.push(i);
        }
        return array;
    }

    const years = range(fromYear, toYear);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className={styles.calender} ref={ref}>
            <img src={calendarIcon} alt="calendarIcon" onClick={onClick} />
        </div>
    ));

    useEffect(() => {
        if (dob) {
            setInputValue(format(dob, 'MM/dd/yyyy'));
        }
    }, [dob]);

    return (
        <div className={styles.dateContainer}>
            <div className={`${styles.labelAndInputContainer} ${error?.length ? globalStyles.failure : ""}`}>
                <label htmlFor={name} className={`${styles.label} ${inputValue.length ? styles.labelOnValue : ""}`}>{label}</label>
                <div className={styles.inputContainer}>
                    <input
                        name={name}
                        id="date"
                        value={inputValue}
                        placeholder={isFocused ? "MM/DD/YYYY" : ""}
                        onChange={handleChangeDob}
                        onBlur={handleDateBlur}
                        onFocus={handleDateFocus}
                    />
                    <DatePicker
                        renderCustomHeader={({ date, changeYear, changeMonth }) => {
                            const currentYear = new Date(date).getFullYear();
                            const currentMonth = new Date(date).getMonth();
                            return (
                                <div className={styles.dateHeader}>
                                    <select
                                        value={months[currentMonth]}
                                        onChange={({ target: { value } }) =>
                                            changeMonth(months.indexOf(value))
                                        }
                                        className={styles.monthsSelect}
                                    >
                                        {months.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={currentYear}
                                        onChange={({ target: { value } }) => changeYear(Number(value))} className={styles.yearSelect}>
                                        {years.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            );
                        }}
                        selected={dob}
                        onChange={(date) => setdob(date)}
                        customInput={<ExampleCustomInput />}
                        minDate={new Date(fromYear, 0, 1)}
                        maxDate={new Date(toYear, 11, 31)}
                        dateFormat="MM/dd/yyyy"
                    />
                </div>
            </div>
            {error?.length > 0 && (
                <div className={globalStyles.errorBox}>
                    <img src={errorIcon} alt="error" />
                    <span className={globalStyles.error}>{error}</span>
                </div>
            )}
        </div>
    );
};

export default DateComponent;
