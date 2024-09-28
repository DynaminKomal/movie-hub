import React from 'react'
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import bannerImage from '../../../assets/banner/banner_netflex.jpg';
import globalStyle from '../../../styles/globalStyle.module.scss'
import houseOfDragon from '../../../assets/movies_img.png';
import textImg from '../../../assets/text_banner.png';

const IncomingSeries = (props) => {
    const { name } = props;
    return (
        <section className={styles.moviesContainer}>
            {name === 'latest' ? <div className={styles.bannerImage}>
                <img src={bannerImage} alt="" className={styles.img} />
                <div className={styles.metaData}>
                    <div className={styles.content}>
                        <h5 className={`${globalStyle.uppercase} ${styles.des}`}> A Netflix series</h5>
                        <h1 className={`${globalStyle.uppercase} ${styles.title}`}>Pieces of Her</h1>
                        <p className={`${globalStyle.uppercase}`}>March 4</p>
                    </div>

                </div>
                <button className={styles.button}>Watch Tralier</button>
            </div> : <div className={styles.bannerBackGround}>
                <img src={houseOfDragon} alt='house of dragon ' />
                <img src={textImg} alt='house of dragon ' />

                <h3 className={`${globalStyle.uppercase} ${styles.date}`}>
                    <span>streaming</span>
                    <span> on OCT 15</span>
                </h3>

                <div className={styles.button}>Watch Tralier
                </div>
            </div>}
        </section>
    )
}

IncomingSeries.propTypes = {}

export default IncomingSeries