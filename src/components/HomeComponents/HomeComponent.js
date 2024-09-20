import React from 'react'
import NavigationMenu from '../HOC/Menu/NavigationMenu'
import CarouselMovie from './Carousel/CarouselMovie'
import MovieList from './MovieList/MovieList'

const HomeComponent = () => {
    return (
        <div>
            <NavigationMenu />
            <CarouselMovie />
            <MovieList />
        </div>
    )
}

export default HomeComponent