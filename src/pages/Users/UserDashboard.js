import React from 'react';
import NavigationMenu from '../../components/Menu/NavigationMenu';
import CarouselMovie from '../../components/Carousel/CarouselMovie';
import MovieList from '../../components/MovieList/MovieList';

const UserDashboard = () => {
  return (
    <div>
      <NavigationMenu />
      <CarouselMovie />
      <MovieList />
    </div>
  )
}

export default UserDashboard