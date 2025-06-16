import React, { useState } from 'react';
import styles from './styles.module.scss';
import logo from '../../../../assets/logo-icon.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import { IoMailOpenOutline } from "react-icons/io5";

const AdminHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNotificationEl, setAnchorNotificationEl] = useState(null);

    const open = Boolean(anchorEl);
    const openNotification = Boolean(anchorNotificationEl);

    const currentPage = useSelector((state) => state.page.currentPage);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setAnchorNotificationEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = (event) => {
        setAnchorNotificationEl(event.currentTarget);
        setAnchorEl(null);
    };

    const handleNotificationClose = () => {
        setAnchorNotificationEl(null);
    };

    return (
        <header className='d-flex align-items-center'>
            <div className='container-fluid'>
                <div className="row w-100 d-flex align-items-center">
                    <div className="col-sm-2">
                        <Link to='/admin' className={`${styles.logoWrapper} d-flex align-items-center`}>
                            <img src={logo} className={styles.logo} alt="Logo" />
                            <span className={styles.logoText}>Movie Hub</span>
                        </Link>
                    </div>

                    <div className="col-sm-3 d-flex align-items-center">
                        <Button className={`${styles.icons} rounded-circle me-3`}>
                            <MdMenuOpen />
                        </Button>
                        <div className={`${styles.searchBar} position-relative d-flex align-items-center`}>
                            <IoSearch className='me-2' />
                            <input type='text' placeholder='Search ...' />
                        </div>
                    </div>

                    <div className="col-sm-7 d-flex align-items-center justify-content-end">
                        {/* Notification */}
                        <div className='notification'>
                            <Button
                                className={`${styles.icons} rounded-circle me-3`}
                                id="notification-button"
                                aria-controls={openNotification ? 'notification-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openNotification ? 'true' : undefined}
                                onClick={handleNotificationClick}
                            >
                                <FaRegBell />
                            </Button>
                            <Menu
                                id="notification-menu"
                                anchorEl={anchorNotificationEl}
                                open={openNotification}
                                onClose={handleNotificationClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleNotificationClose} className={`d-flex align-items-center justify-content-between`}>
                                    Notification
                                    <div className={`d-flex align-items-center ${styles.msgBox}`}>
                                        <span className={`me-2 ${styles.messageCount}`}>8 New</span>
                                        <IoMailOpenOutline />
                                    </div>
                                </MenuItem>
                                <Divider />
                                <div className={styles.scroll}>
                                    <MenuItem onClick={handleClose} className={`${styles.myAccount} ${styles.notificationItem}`}>
                                        <div className={styles.profileBox}>
                                            <span className={`${styles.userImage} rounded-circle`}>
                                                <img
                                                    src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
                                                    alt="User"
                                                />
                                            </span>
                                        </div>
                                        <div className={styles.userInfo}>
                                            <h4>Congratulation letter</h4>
                                            <p className='mb-0 ellipsis'>
                                                Won the monthly best seller gold price
                                                Won the monthly best seller gold price
                                            </p>
                                            <span>1h ago</span>
                                        </div>
                                        <div class="flex-shrink-0 d-flex flex-column align-items-center">
                                            <a href="javascript:void(0)" >
                                                <span className={styles.dot}></span>
                                            </a>
                                            <a href="javascript:void(0)" ><span className={styles.icon}><i class="bi bi-x"></i></span></a>
                                        </div>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose} className={`${styles.myAccount} ${styles.notificationItem}`}>
                                        <div className={styles.profileBox}>
                                            <span className={`${styles.userImage} rounded-circle`}>
                                                <img
                                                    src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
                                                    alt="User"
                                                />
                                            </span>
                                        </div>
                                        <div className={styles.userInfo}>
                                            <h4>Congratulation letter</h4>
                                            <p className='mb-0 ellipsis'>
                                                Won the monthly best seller gold price
                                                Won the monthly best seller gold price
                                            </p>
                                            <span>1h ago</span>
                                        </div>
                                        <div class="flex-shrink-0 d-flex flex-column align-items-center">
                                            <a href="javascript:void(0)" >
                                                <span className={styles.dot}></span>
                                            </a>
                                            <a href="javascript:void(0)" ><span className={styles.icon}><i class="bi bi-x"></i></span></a>
                                        </div>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose} className={`${styles.myAccount} ${styles.notificationItem}`}>
                                        <div className={styles.profileBox}>
                                            <span className={`${styles.userImage} rounded-circle`}>
                                                <img
                                                    src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
                                                    alt="User"
                                                />
                                            </span>
                                        </div>
                                        <div className={styles.userInfo}>
                                            <h4>Congratulation letter</h4>
                                            <p className='mb-0 ellipsis'>
                                                Won the monthly best seller gold price
                                                Won the monthly best seller gold price
                                            </p>
                                            <span>1h ago</span>
                                        </div>
                                        <div class="flex-shrink-0 d-flex flex-column align-items-center">
                                            <a href="javascript:void(0)" >
                                                <span className={styles.dot}></span>
                                            </a>
                                            <a href="javascript:void(0)" ><span className={styles.icon}><i class="bi bi-x"></i></span></a>
                                        </div>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose} className={`${styles.myAccount} ${styles.notificationItem}`}>
                                        <div className={styles.profileBox}>
                                            <span className={`${styles.userImage} rounded-circle`}>
                                                <img
                                                    src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
                                                    alt="User"
                                                />
                                            </span>
                                        </div>
                                        <div className={styles.userInfo}>
                                            <h4>Congratulation letter</h4>
                                            <p className='mb-0 ellipsis'>
                                                Won the monthly best seller gold price
                                                Won the monthly best seller gold price
                                            </p>
                                            <span>1h ago</span>
                                        </div>
                                        <div class="flex-shrink-0 d-flex flex-column align-items-center">
                                            <a href="javascript:void(0)" >
                                                <span className={styles.dot}></span>
                                            </a>
                                            <a href="javascript:void(0)" ><span className={styles.icon}><i class="bi bi-x"></i></span></a>
                                        </div>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose} className={`${styles.myAccount} ${styles.notificationItem}`}>
                                        <div className={styles.profileBox}>
                                            <span className={`${styles.userImage} rounded-circle`}>
                                                <img
                                                    src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
                                                    alt="User"
                                                />
                                            </span>
                                        </div>
                                        <div className={styles.userInfo}>
                                            <h4>Congratulation letter</h4>
                                            <p className='mb-0 ellipsis'>
                                                Won the monthly best seller gold price
                                                Won the monthly best seller gold price
                                            </p>
                                            <span>1h ago</span>
                                        </div>
                                        <div class="flex-shrink-0 d-flex flex-column align-items-center">
                                            <a href="javascript:void(0)" >
                                                <span className={styles.dot}></span>
                                            </a>
                                            <a href="javascript:void(0)" ><span className={styles.icon}><i class="bi bi-x"></i></span></a>
                                        </div>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose} className={`${styles.myAccount} ${styles.notificationItem}`}>
                                        <div className={styles.profileBox}>
                                            <span className={`${styles.userImage} rounded-circle`}>
                                                <img
                                                    src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
                                                    alt="User"
                                                />
                                            </span>
                                        </div>
                                        <div className={styles.userInfo}>
                                            <h4>Congratulation letter</h4>
                                            <p className='mb-0 ellipsis'>
                                                Won the monthly best seller gold price
                                                Won the monthly best seller gold price
                                            </p>
                                            <span>1h ago</span>
                                        </div>
                                        <div class="flex-shrink-0 d-flex flex-column align-items-center">
                                            <a href="javascript:void(0)" >
                                                <span className={styles.dot}></span>
                                            </a>
                                            <a href="javascript:void(0)" ><span className={styles.icon}><i class="bi bi-x"></i></span></a>
                                        </div>
                                    </MenuItem>
                                </div>

                            </Menu>
                        </div>

                        {/* User Account */}
                        <div className="myAccountwrapper">
                            <Button
                                className={`${styles.myAccount} d-flex align-items-center`}
                                id="account-button"
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <div className={`${styles.profileBox} ${styles.badge}`}>
                                    <span className={`${styles.userImage} rounded-circle`}>
                                        <img
                                            src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
                                            alt="User"
                                        />
                                    </span>
                                </div>
                            </Button>
                            <Menu
                                id="account-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >

                                <MenuItem onClick={handleClose} className={`${styles.myAccount}`}>
                                    <div className={styles.profileBox}>
                                        <span className={`${styles.userImage} rounded-circle`}>
                                            <img
                                                src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png"
                                                alt="User"
                                            />
                                        </span>
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h4>John Doe</h4>
                                        <p className='mb-0'>johndoe@gmail.com</p>
                                    </div>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <PersonIcon fontSize="small" />
                                    </ListItemIcon> Profile
                                </MenuItem>

                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose} className={styles.logout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
