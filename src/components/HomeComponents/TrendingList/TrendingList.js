import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import johnImage from '../../../assets/banner/john.jpg';
import john_video from '../../../assets/videos/john.mp4';
import leftIcon from '../../../assets/prev-icon.svg';
import rightIcon from '../../../assets/next-icon.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingList = (props) => {
    const { name } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(6);
    const itemsPerPage = 4;

    const data = [
        { id: "1", image_url: johnImage, title: "John Wick 1", year: "2023", timing: "1hr 25m", genre: "Action", video_url: john_video },
        { id: "2", image_url: johnImage, title: "John Wick 2", year: "2023", timing: "1hr 35m", genre: "Action", video_url: john_video },
        { id: "3", image_url: johnImage, title: "John Wick 3", year: "2023", timing: "1hr 45m", genre: "Action", video_url: john_video },
        { id: "4", image_url: johnImage, title: "John Wick 4", year: "2023", timing: "2hr 5m", genre: "Action", video_url: john_video },
        { id: "5", image_url: johnImage, title: "John Wick 5", year: "2023", timing: "1hr 50m", genre: "Action", video_url: john_video },
        { id: "6", image_url: johnImage, title: "John Wick 6", year: "2023", timing: "2hr 0m", genre: "Action", video_url: john_video },
        { id: "7", image_url: johnImage, title: "John Wick 7", year: "2023", timing: "1hr 30m", genre: "Action", video_url: john_video },
        { id: "8", image_url: johnImage, title: "John Wick 8", year: "2023", timing: "1hr 55m", genre: "Action", video_url: john_video },
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
            currentIndex + itemsPerPage < data?.length && (
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
        slidesToShow: slidesToShow,  // Dynamic slidesToShow
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        beforeChange: handleBeforeChange,
    };


    const handleResize = () => {
        if (window.innerWidth >= 1560) {
            setSlidesToShow(6); 
        } else if (window.innerWidth >= 1440) {
            setSlidesToShow(4); 
        } else if (window.innerWidth >= 1340) {
            setSlidesToShow(2); 
        } else if (window.innerWidth >= 1180) {
            setSlidesToShow(2); 
        } else {
            setSlidesToShow(1);
        }
    };
    

    useEffect(() => {
        handleResize(); // Set initial slides to show
        window.addEventListener('resize', handleResize); // Listen for window resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup the event listener
        };
    }, []);

    return (
        <section className={styles.moviesContainer}>
            <div className={styles.heading}>
                <h5>{name}</h5>
                <span className={styles.viewAll}>View All</span>
            </div>
            <div className={styles.wrapper}>
                <Slider {...settings}>
                    {data?.map((item) => (
                        <div
                            className={styles.box}
                            key={item.id}>
                            <img src={item.image_url} alt={item.title} />
                            <h5>{item.title} - {item.id}</h5>
                            <div className={styles.metaBox}>
                                <span>{item.year}</span>
                                <ul>
                                    <li>{item.timing}</li>
                                    <li>TV-MA</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

TrendingList.propTypes = {
    name: PropTypes.string
}

export default TrendingList;
