import React from 'react'
import NavigationMenu from '../HOC/Menu/NavigationMenu'
import CarouselMovie from './Carousel/CarouselMovie'
import TrendingList from './TrendingList/TrendingList'
import NewRelease from './NewRelease/NewRelease'

const HomeComponent = () => {
    return (
        <div>
            <NavigationMenu />
            <CarouselMovie />
            <TrendingList name="Trending"/>
            <NewRelease name="New Release"/>
        </div>
    )
}

export default HomeComponent