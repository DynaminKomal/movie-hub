import { adminPaths } from "../paths/adminPaths";
import homeIcon from '../../assets/home.svg';
import movieIcon from '../../assets/movieIcon.svg'

export const adminNavigation = [
    {
        name: "Home",
        path: adminPaths.ADMINDASHBOARD,
        icon: homeIcon
    },
    {
        name: "Movie",
        path: adminPaths.ADMINDASHBOARD,
        icon: movieIcon
    }
]