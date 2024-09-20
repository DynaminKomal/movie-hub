import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import john_video from '../../assets/videos/john.mp4';
import john_image from '../../assets/banner/john.jpg';
import muteIcon from '../../assets/mutespeaker.svg';
import unmuteIcon from '../../assets/unmutespeaker.svg';

const CarouselMovie = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const carouselData = [
        { id: "102", title: "MAGIC SLIDER", description: "Description 1", url: john_image, videoUrl: john_video },
        { id: "103", title: "MAGIC SLIDER", description: "Description 2", url: john_image, videoUrl: john_video }
    ];

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
        const newIndex = activeIndex === 0 ? carouselData.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = activeIndex === carouselData.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };

    const progressWidth = ((activeIndex + 1) / carouselData.length) * 100;

    return (
        <div style={{ backgroundColor: "#000" }}>
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} className={styles.carousel} indicators={false}>
                {carouselData.map((item) => (
                    <Carousel.Item key={item.id} className={styles.itemP} interval={4000}>
                        {isVideoPlaying && activeIndex === parseInt(item.id) - 102 ? (
                            <video autoPlay className={styles.videoBackgroundHolder} muted={isMuted}>
                                <source src={item.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img src={item.url} alt="slides" style={{ width: '100%', height: 'auto' }} />
                        )}
                        <Carousel.Caption className={item.title ? styles.caption : styles.caption2}>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </Carousel.Caption>
                        <div className={styles.videoAction}>
                            <div className={styles.videoBoxForMute}>
                                <div className={styles.prev} onClick={activeIndex === 0 ? undefined : goToPrev}>
                                    {activeIndex + 1}
                                </div>
                                <span className={styles.sliderControler}>
                                    <span style={{ width: `${progressWidth}%` }} className={styles.progressBar}></span>
                                </span>
                                <div className={styles.next} onClick={activeIndex === (carouselData?.length - 1) ? undefined : goToNext}>{activeIndex + 2}</div>
                            </div>
                            <div className={styles.changeSpeaker} onClick={toggleMute}>
                                <img src={isMuted ? muteIcon : unmuteIcon} alt="mute/unmute icon" />
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselMovie;
