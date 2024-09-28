import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import Alaya from '../../../assets/artists/Alaya-Pacheco.jpg';
import David from '../../../assets/artists/David-Horovitch.jpg';
import Emily from '../../../assets/artists/Emily-Carey.jpg';
import Emma from '../../../assets/artists/Emma-Narburgh.jpg';
import Harry from '../../../assets/artists/Harry-Styles.jpg';
import Jefferson from '../../../assets/artists/Jefferson-Hall.jpg';
import Richard from '../../../assets/artists/Richard-Cant.jpg';
import Sarah from '../../../assets/artists/Sarah-Neal.jpg';
import leftIcon from '../../../assets/prev-icon.svg';
import rightIcon from '../../../assets/next-icon.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Artist = props => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 6;

    const data = [
        { id: "1", image_url: Alaya, title: "Alaya Pacheco" },
        { id: "2", image_url: David, title: "David Horovitch" },
        { id: "3", image_url: Emily, title: "Emily Carey" },
        { id: "4", image_url: Emma, title: "Emma Narburgh" },
        { id: "5", image_url: Harry, title: "Harry Styles" },
        { id: "6", image_url: Jefferson, title: "Jefferson Hall" },
        { id: "7", image_url: Richard, title: "Sarah Neal" },
        { id: "8", image_url: Sarah, title: "Richard Cant" },
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
                <h5>Top Artists</h5>
                <span className={styles.viewAll}>View All</span>
            </div>
            <div className={styles.wrapper}>
                <Slider {...settings}>
                    {data.map((item) => (
                        <div
                            className={styles.box}
                            key={item.id}>
                            <div className={styles.media}>
                                <img src={item.image_url} alt={item.title} />
                            </div>
                            <h6>{item.title}</h6>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

Artist.propTypes = {}

export default Artist