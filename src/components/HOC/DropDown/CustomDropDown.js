import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import globalStyle from '../../../styles/globalStyle.module.scss';

const CustomDropDown = ({ error, label, id, value, handleClick }) => {

    const dropDownRef = useRef(null);

    const [selected, setSelected] = useState(value || "");
    const [isOpen, setIsOpen] = useState(false);

    const list = ["Male", "Female", "Other"];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (item) => {
        handleClick(item);
        setSelected(item);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.customDropdownContainer} ref={dropDownRef}>
            <div className={`${styles.labelAndInputContainer} ${error?.length ? globalStyle.failure : ""} ${isOpen ? styles.isOpen : ""}`} onClick={toggleDropdown}>
                <label htmlFor={id} className={`${styles.label} ${selected.length > 0 ? styles.labelOnValue : ""}`}>
                    {label}
                </label>
                <div className={styles.inputContainer}>
                    <span>{selected}</span>
                </div>
            </div>

            {isOpen && (
                <ul className={styles.dropDown} ref={dropDownRef}>
                    {list.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomDropDown;
