import React, { useEffect } from 'react'
import NavigationMenu from '../HOC/Header/NavigationMenu'
import CarouselMovie from './Carousel/CarouselMovie'
import TrendingList from './TrendingList/TrendingList'
import NewRelease from './NewRelease/NewRelease';
import { useDispatch } from 'react-redux';
import { fetchBanner } from '../../store/actions/movies/fetchBanner.action';
import TvSeries from './TvSeries/TvSeries';
import MostPopularSeries from './MostPopularSeries/MostPopularSeries';
import IncomingSeries from './InComingSeries/IncomingSeries';
import SrcollTop from '../HOC/Footer/SrcollTop';
import Artist from './Artist/Artist';
import Footer from '../HOC/Footer/Footer';

const HomeComponent = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBanner.request())
    }, [dispatch])
    return (
        <div>
            <NavigationMenu />
            <div>
                <CarouselMovie />
                <TrendingList name="Trending" />
                <NewRelease name="New Release" />
                <IncomingSeries name="latest" />
                <TvSeries name="TV Series" />
                <MostPopularSeries name="Deal of the Week" />
                <IncomingSeries />
                <Artist />
            </div>
            <Footer />
            <SrcollTop />
        </div>
    )
}

export default HomeComponent