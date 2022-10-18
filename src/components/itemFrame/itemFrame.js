import React from "react";
import styles from './itemFrame.module.scss'
import ItemBox from "../itemBox/itemBox";

class ItemFrame extends React.Component {
    render() {
        return(
            <div className={styles.grid}>
                <ItemBox/>
            </div>
        );
    }
}

export default ItemFrame;