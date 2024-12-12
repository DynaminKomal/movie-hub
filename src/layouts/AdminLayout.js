import React from "react";
import styles from "./styles.module.scss"

const AdminLayout =(props) =>{
    return (
        <div className={styles.layout}>
          {props.children}
        </div>
      );

}


export default AdminLayout