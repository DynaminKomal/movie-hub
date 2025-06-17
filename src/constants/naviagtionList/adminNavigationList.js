import { adminPaths } from "../paths/adminPaths";
import { RiHomeSmile2Line } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa6";
import { BiMoviePlay } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";

export const adminNavigation = [
    {
        label: 'Dashboard',
        icon: <RiHomeSmile2Line />,
        path: adminPaths.ADMINDASHBOARD,
    },
    {
        label: 'Movies',
        icon: <BiMoviePlay />,
        path: adminPaths.ADMINDASHBOARD,
        hasSubmenu: true,
        submenuIcon: <FaAngleRight />,
    },
    {
        label: 'Users',
        icon: <FaUsers />,
        path: adminPaths.ADMINDASHBOARD,
        hasSubmenu: true,
        submenuIcon: <FaAngleRight />,
    },
    {
        label: 'Notifcation',
        icon: <FaRegBell />,
        path: adminPaths.ADMINDASHBOARD,
    },
    
];
