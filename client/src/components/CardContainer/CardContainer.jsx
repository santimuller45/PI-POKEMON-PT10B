import React from "react";
import Card from "../Card/Card.jsx";
import styles from "./CardContainer.module.css"

function CardContainer ({ currentPokemons }) {

    return(
        <div className={styles.container}>
            {currentPokemons.map(data => (
                <Card
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    image={data.image}
                    hp={data.hp}
                    attack={data.attack}
                    defense={data.defense}
                    speed={data.speed}
                    height={data.height}
                    weight={data.weight}
                    types={data.types}
                />
            ))}
        </div>
    )
}

export default CardContainer;