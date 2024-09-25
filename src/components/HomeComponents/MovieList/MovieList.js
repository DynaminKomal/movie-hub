import React, { useState, useRef } from 'react';
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
import globalStyle from '../../../styles/globalStyle.module.scss';
import Button from '../../HOC/Button/Button';
import playIcon from '../../../assets/playIcon.svg';
import saveIcon from '../../../assets/bookmark.svg';

const Tooltip = ({ tooltipData, position }) => {
    return ReactDOM.createPortal(
        <div className={styles.tooltip} style={{ left: position.x, top: position.y }}>
            <video autoPlay className={styles.videoBackgroundHolder}>
                <source src={tooltipData.video_url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles.videoMeta}>
                <h1 className={`${globalStyle.uppercase} ${styles.title}`}>{tooltipData.title} - {tooltipData.id}</h1>
                <div className={styles.metaBox}>
                    <span>{tooltipData.year}</span>
                    <ul>
                        <li>{tooltipData.timing}</li>
                        <li>TV-MA</li>
                    </ul>
                    <div className={`${globalStyle.uppercase} ${styles.genre}`}>{tooltipData.genre}</div>
                </div>
                <div className={styles.buttonBox}>
                    <Button name="Play Now" image_icon={playIcon} image_position="right" image_name="play icon" />
                    <Button name="Watch Later" image_icon={saveIcon} image_position="right" image_name="Bookmark icon" />
                </div>
            </div>
        </div>,
        document.body
    );
};

const MovieList = (props) => {
    const { name } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 6;
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

    const handleMouseEnter = (item, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipData(item);
        setTooltipPosition({
            x: rect.left + window.scrollX,
            y:  window.scrollY + 500
        });
    };

    const handleMouseLeave = () => {
        setTooltipData(null);
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
                            key={item.id}
                            onMouseEnter={(e) => handleMouseEnter(item, e)}
                            onMouseLeave={handleMouseLeave}
                        >
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

                {tooltipData && (
                    <Tooltip tooltipData={tooltipData} position={tooltipPosition} />
                )}
            </div>
        </section>
    );
};

MovieList.propTypes = {
    name: PropTypes.string
}

export default MovieList;
