import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import defaultImg from "../../source/icoPokeball.png"

function Card ({ id , image , name , types }) {

    const type = types[0].name ? (types.map(elem => elem.name).join(",")) : (types.map(elem => (elem))).join(",");

    return(
        <div className={styles.card}>
            <Link to={`/detail/${id}`}>
                { image === "default"
                    ?  <img src={defaultImg} alt={id} className={styles.cardImage}/>
                    : <img src={image} alt={id} className={styles.cardImage}/>
                }
            </Link>
                <h2 className={styles.cardName} >{name}</h2>
                <div className={styles.cardType}>{type}</div>
        </div>
    )
}

export default Card;