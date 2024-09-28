import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import johnImage from '../../../assets/best-friend.jpg';
import leftIcon from '../../../assets/prev-icon.svg';
import rightIcon from '../../../assets/next-icon.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import plusIcon from '../../../assets/plusIcon.svg'
import lordImage from '../../../assets/TvSeries/The-Rings-of-Power.jpg'

function MostPopularSeries(props) {
    const { name } = props;
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 6;

    const data = [
        { id: "1", image_url: lordImage, title: "The Lord of the Rings: The Rings of Power", year: "2023", timing: "1hr 25m", description: "Epic drama set thousands of years before the events of J.R.R. Tolkien's 'The Hobbit' and 'The Lord of the Rings' follows an ensemble cast of characters, both familiar and new, as they confront the long-feared re-emergence of evil to Middle-earth." },
        { id: "2", image_url: johnImage, title: "John Wick 2", year: "2023", timing: "1hr 35m", description: "hello" },
        { id: "3", image_url: johnImage, title: "John Wick 3", year: "2023", timing: "1hr 45m", description: "hello" },
        { id: "4", image_url: johnImage, title: "John Wick 4", year: "2023", timing: "2hr 5m", description: "hello" },
        { id: "5", image_url: johnImage, title: "John Wick 5", year: "2023", timing: "1hr 50m", description: "hello" },
        { id: "6", image_url: johnImage, title: "John Wick 6", year: "2023", timing: "2hr 0m", description: "hello" },
        { id: "7", image_url: johnImage, title: "John Wick 7", year: "2023", timing: "1hr 30m", description: "hello" },
        { id: "8", image_url: johnImage, title: "John Wick 8", year: "2023", timing: "1hr 55m", description: "hello" },
    ];

    const handleBeforeChange = (oldIndex, newIndex) => {
        setCurrentIndex(newIndex);
    };

    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            currentIndex > 0 && (
                <button className={`${styles.button} ${styles.prevButton}`} type='button' onClick={onClick}>
                    <img src={leftIcon} alt='prev icon' />
                </button>
            )
        );
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            currentIndex + itemsPerPage < data.length && (
                <button className={`${styles.button} ${styles.nextButton}`} type='button' onClick={onClick}>
                    <img src={rightIcon} alt='next icon' />
                </button>
            )
        );
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        beforeChange: handleBeforeChange,
    };

    return (
        <section className={styles.moviesContainer}>
            <div className={styles.heading}>
                <h5>{name}</h5>
                <span className={styles.viewAll}>View All</span>
            </div>
            <div className={styles.wrapper}>
                <Slider {...settings}>
                    {data.map((item) => (
                        <div
                            className={styles.box}
                            key={item.id}>
                            <div className={styles.media}>
                                <img src={item.image_url} alt={item.title} className={styles.img} />
                            </div>
                            <h5 className={styles.title}>{item.title}</h5>

                            <div className={styles.tootip}>
                                <h6 className={styles.title}>{item.title}</h6>
                                <ul className={styles.metaBox}>
                                    <li>{item.year}</li>
                                    <li>{item.timing}</li>
                                </ul>
                                <div className={styles.description}>
                                    {item.description}
                                </div>
                                <a className={styles.addToList}>
                                    <div className={styles.plusIcon}>
                                        <img src={plusIcon} alt="Plus Icon" className={styles.plusIconImage} />
                                        Add To My List
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

MostPopularSeries.propTypes = {
    name: PropTypes.string
}

export default MostPopularSeries