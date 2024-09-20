import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselMovie = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselData = [
        { "id": "102", "title": "MAGIC SLIDER", "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.", "url": "https://templates.iqonic.design/streamit/html/frontend/assets/images/movies/banner1.webp", "download_url": "https://picsum.photos/id/102/4320/3240" },
        { "id": "103", "title": "MAGIC SLIDER", "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.", "url": "https://templates.iqonic.design/streamit/html/frontend/assets/images/movies/banner2.webp", "download_url": "https://picsum.photos/id/103/2592/1936" },
        { "id": "104", "title": "MAGIC SLIDER", "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.", "url": "https://templates.iqonic.design/streamit/html/frontend/assets/images/movies/movie-banner-2.webp", "download_url": "https://picsum.photos/id/104/3840/2160" },
        { "id": "106", "title": "MAGIC SLIDER", "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti temporibus quis eum consequuntur voluptate quae doloribus distinctio. Possimus, sed recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, aut.", "url": "https://templates.iqonic.design/streamit/html/frontend/assets/images/movies/movie-banner-1.webp", "download_url": "https://picsum.photos/id/106/2592/1728" },
    ];

    // carousel selection
    const handleSelect = (selectedIndex, e) => {
        setActiveIndex(selectedIndex);
    };

    return (
        <div style={{ backgroundColor: "#333333" }}>
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} className={styles.carosuel} nextIcon={<span className={styles.changed} aria-hidden="true" />} prevIcon={<span className={styles.changedprev} aria-hidden="true" />}>
                {carouselData?.map((item) => (
                    <Carousel.Item key={item.id} className={styles.itemP} interval={4000}>
                        <img src={item.url} alt="slides" />
                        <Carousel.Caption className={item.title ? styles.caption : styles.caption2}>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselMovie;
