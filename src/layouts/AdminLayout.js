import React from "react";
import styles from "./styles.module.scss"
import AdminHeader from '../components/HOC/Header/Admin/AdminHeader'
import SideBar from "../components/HOC/Header/Admin/SideBar/SideBar";

const AdminLayout = (props) => {
  return (
    <div>
      <AdminHeader />
      <div className='main d-flex'>
        <div className={styles.sideBarWrapper}>
          <SideBar />
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
  );

}


export default AdminLayout