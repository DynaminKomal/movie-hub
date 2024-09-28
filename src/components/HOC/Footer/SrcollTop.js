import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import scrollTop from '../../../assets/scrollTop.svg'

const SrcollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 50) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div className={styles.btnScrollToTop} onClick={scrollToTop}>
                    <img src={scrollTop} alt="Scroll to top" />
                </div>
            )}
        </>
    );
};

export default SrcollTop