import React from "react";
import styles from "./OrderBy.module.css";
import { useDispatch } from "react-redux";
import { orderCards } from "../redux/actions.js";

function OrderBy () {

    const dispatch = useDispatch();
    const handleOrder = (e) => {
        dispatch(orderCards(e.target.value))
    }


    return (
        <div className={styles.container}>
            ORDER BY:
            <select onChange={handleOrder}>
                <option value="A-Z" >A-Z</option>
                <option value="Z-A" >Z-A</option>
                <option value="> Attack"> Highest Attack</option>
                <option value="< Attack"> Lowest Attack</option>
            </select>
        </div>
    )
}

export default OrderBy;