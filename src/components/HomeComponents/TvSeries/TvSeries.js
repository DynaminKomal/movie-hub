import React from 'react'
import styles from './styles.module.scss';
import PropTypes from 'prop-types';
import Falling from '../../../assets/TvSeries/Falling-Water.jpg';
import Fireworks from '../../../assets/TvSeries/Fireworks-Wednesday.jpg';
import Political from '../../../assets/TvSeries/Political-Animal.jpg';
import Wasted from '../../../assets/TvSeries/The-Wasted-Times.jpg';
import Zoombies from '../../../assets/TvSeries/Zoombies-Game.jpg';
import shark from '../../../assets/TvSeries/shark.jpg';
import soldies from '../../../assets/TvSeries/soldies.jpg';

const TvSeries = (props) => {
    const { name } = props;

    const data = [
        { id: "1", image_url: Falling, title: "Falling Water", seasons: '1' },
        { id: "2", image_url: Fireworks, title: "Fireworks Wednesday", seasons: '1' },
        { id: "3", image_url: Political, title: "Political Animal", seasons: '1' },
        { id: "4", image_url: Wasted, title: "The Wasted Times", seasons: '1' },
        { id: "5", image_url: Zoombies, title: "Zoombies Game", seasons: '1' },
        { id: "6", image_url: shark, title: "Shark", seasons: '1' },
        { id: "7", image_url: soldies, title: "Soldies", seasons: '1' }
    ];

    const firstIndexData = data.filter((el, index) => {
        return index === 0;
    })

    return (
        <section className={styles.moviesContainer}>
            <div className={styles.heading}>
                <h5>{name}</h5>
                <span className={styles.viewAll}>View All</span>
            </div>
            <div className={styles.wrapper}>
                {firstIndexData?.map((item) => (
                    < div className={styles.box} key={item.id} >
                        <img src={item.image_url} alt={item.title} />
                        <div className={styles.metaData}>
                            <h6 className={styles.title}>{item.title}</h6>
                            <span className={styles.seasonsNumber}>{item.seasons} Seasons</span>
                        </div>

                    </div>
                ))}
                <div className={styles.boxContainer}>
                    {data?.map((item, index) => {
                        if (index === 0) {
                            return;
                        } else {
                            return < div className={styles.box} key={item.id} >
                                <img src={item.image_url} alt={item.title} />
                                <div className={styles.metaData}>
                                    <h6 className={styles.title}>{item.title}</h6>
                                    <span className={styles.seasonsNumber}>{item.seasons} Seasons</span>
                                </div>

                            </div>
                        }
                    })}
                </div>
            </div>
        </section >
    );
}

TvSeries.propTypes = {
    name: PropTypes.string
}

export default TvSeries