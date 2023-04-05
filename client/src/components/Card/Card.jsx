import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import defaultImg from "../../source/pokeball.png"

function Card ({ id , image , name , types }) {

    const type = types[0].name ? (types.map(elem => elem.name).join(",")) : (types.map(elem => (elem))).join(",");

    const typeColors = {
        Bug: "#8CB230",
        Dark: "#58575F",
        Dragon: "#0F6AC0",
        Electric: "#EED535",
        Fairy: "#ED6EC7",
        Fighting: "#D04164",
        Fire: "#FD7D24",
        Flying: "#748FC9",
        Ghost: "#556AAE",
        Grass: "#62B957",
        Ground: "#DD7748",
        Ice: "#61CEC0",
        Normal: "#9DA0AA",
        Poison: "#A552CC",
        Psychic: "#EA5D60",
        Rock: "#BAAB82",
        Steel: "#417D9A",
        Water: "#4A90DA"
    };

    return(
        <div className={styles.card} style={{backgroundColor: typeColors[type.split(",")[0]]}}>
            <Link to={`/detail/${id}`}>
                { image === "default"
                    ?  <img src={defaultImg} alt={id} className={styles.cardImage}/>
                    : <img src={image} alt={id} className={styles.cardImage}/>
                }
                <h2 className={styles.cardName} >{name}</h2>
                <div className={styles.cardType}>
                    {type}
                </div>
            </Link>
        </div>
    )
}

export default Card;