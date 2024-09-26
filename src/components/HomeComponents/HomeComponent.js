import React, { useEffect } from 'react'
import NavigationMenu from '../HOC/Menu/NavigationMenu'
import CarouselMovie from './Carousel/CarouselMovie'
import TrendingList from './TrendingList/TrendingList'
import NewRelease from './NewRelease/NewRelease';
import { useDispatch } from 'react-redux';
import { fetchBanner } from '../../store/actions/user/fetchBanner.action';

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
        </div>
    )
}

export default HomeComponent