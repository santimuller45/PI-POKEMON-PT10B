import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card ({ id , image , name , type }) {

    return(
        <div className={styles.card}>
            <img src={image} alt={id} className={styles.cardImage}/>
            <Link to={`/detail/${id}`}>
                <h2 className={styles.cardName} >{name}</h2>
            </Link>
            <div className={styles.cardType}>{type}</div>
        </div>
    )
}

export default Card;