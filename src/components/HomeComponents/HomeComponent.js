import React, { useEffect } from 'react'
import NavigationMenu from '../HOC/Menu/NavigationMenu'
import CarouselMovie from './Carousel/CarouselMovie'
import TrendingList from './TrendingList/TrendingList'
import NewRelease from './NewRelease/NewRelease';
import { userAPI } from '../../constants/api/user';
import axios from 'axios'
import { useDispatch } from 'react-redux';

const HomeComponent = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch()
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