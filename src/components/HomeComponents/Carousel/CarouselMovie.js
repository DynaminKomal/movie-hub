import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import globalStyle from '../../../styles/globalStyle.module.scss'
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import john_video from '../../../assets/videos/john.mp4';
import spider_video from '../../../assets/videos/spider.mp4';
import john_image from '../../../assets/banner/john.jpg';
import spider_image from '../../../assets/banner/spider.jpg';
import muteIcon from '../../../assets/mutespeaker.svg';
import unmuteIcon from '../../../assets/unmutespeaker.svg';
import ratingIcon from '../../../assets/ratingIcon.svg';
import Button from '../../HOC/Button/Button';
import playIcon from '../../../assets/playIcon.svg';
import saveIcon from '../../../assets/bookmark.svg';
import leftIcon from '../../../assets/prev-icon.svg';
import rightIon from '../../../assets/next-icon.svg';
import { useSelector } from 'react-redux';

const CarouselMovie = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const fetchBannerReducer = useSelector((state) => state.movie.fetchBannerReducer);
    const { data, loading } = fetchBannerReducer;
    const images = {
        '/assets/banner/john.jpg': john_image,
        '/assets/banner/spider.jpg': spider_image,
    };
    const videos = {
        'john_video': john_video,
        'spider_video': spider_video,
    }

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
        setIsVideoPlaying(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVideoPlaying(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [activeIndex]);

    const toggleMute = () => {
        setIsMuted((prevMuted) => !prevMuted);
    };

    const goToPrev = () => {
        const newIndex = activeIndex === 0 ? data?.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = activeIndex === data?.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };

    const progressWidth = ((activeIndex + 1) / data?.length) * 100;

    return (
        <div className={styles.carouselContainer}>
            {activeIndex !== 0 && <button className={`${styles.button} ${styles.prevButton}`} type='button' onClick={activeIndex === 0 ? undefined : goToPrev}>
                <img src={leftIcon} alt='prev icon' />
            </button>}
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} className={styles.carousel} indicators={false} controls={false}>
                {data?.map((item) => (
                    <Carousel.Item key={item._id} className={styles.itemP} interval={4000}>
                        {isVideoPlaying && activeIndex === parseInt(item.id) - 102 ? (
                            <video autoPlay className={styles.videoBackgroundHolder} muted={isMuted}>
                                <source src={videos[item.videoLink]} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img src={images[item.imageLink]} alt="slides" style={{ width: '100%', height: 'auto' }} />
                        )}
                        <Carousel.Caption className={styles.caption}>
                            <div className={`${globalStyle.uppercase} ${styles.gener}`}>{item.genre}</div>
                            <h1 className={`${globalStyle.uppercase} ${styles.title}`}>{item.fullName}</h1>
                            <div className={styles.metaBox}>
                                <div className={styles.rating}>
                                    <img src={ratingIcon} alt="rating icon" />
                                    {item.rating}
                                </div>
                                <ul>
                                    <li>{item.year}</li>
                                    <li>{item.timing}</li>
                                </ul>
                            </div>
                            <p>{item.description}</p>
                            <div className={styles.buttonBox}>
                                <Button name="Play Now" image_icon={playIcon} image_position="right" image_name="play icon" />
                                <div className={styles.bookmark}>
                                    Watch Later
                                    <img src={saveIcon} alt="save icon" />
                                </div>
                            </div>
                        </Carousel.Caption>
                        <div className={styles.videoAction}>
                            <div className={styles.videoBoxForMute}>
                                <div className={styles.prev} onClick={activeIndex === 0 ? undefined : goToPrev}>
                                    {activeIndex + 1}
                                </div>
                                <span className={styles.sliderControler}>
                                    <span style={{ width: `${progressWidth}%` }} className={styles.progressBar}></span>
                                </span>
                                <div className={styles.next} onClick={activeIndex === (data?.length - 1) ? undefined : goToNext}>{activeIndex + 2}</div>
                            </div>
                            <div className={styles.changeSpeaker} onClick={toggleMute}>
                                <img src={isMuted ? muteIcon : unmuteIcon} alt="mute/unmute icon" />
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            {(activeIndex !== (data?.length - 1)) && <button className={`${styles.button} ${styles.nextButton}`} type='button' onClick={activeIndex === (data?.length - 1) ? undefined : goToNext}>
                <img src={rightIon} alt='right icon' />
            </button>}
        </div>
    );
};

export default CarouselMovie;
