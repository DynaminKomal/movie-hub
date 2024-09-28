import React, { useEffect } from 'react'
import NavigationMenu from '../HOC/Menu/NavigationMenu'
import CarouselMovie from './Carousel/CarouselMovie'
import TrendingList from './TrendingList/TrendingList'
import NewRelease from './NewRelease/NewRelease';
import { useDispatch } from 'react-redux';
import { fetchBanner } from '../../store/actions/user/fetchBanner.action';
import TvSeries from './TvSeries/TvSeries';
import MostPopularSeries from './MostPopularSeries/MostPopularSeries';

const HomeComponent = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBanner.request())
    }, [])
    return (
        <div>
            <NavigationMenu />
            <CarouselMovie />
            <TrendingList name="Trending" />
            <NewRelease name="New Release" />
            <TvSeries name="TV Series" />
            <MostPopularSeries name="Deal of the Week" />
        </div>
    )
}

export default HomeComponent