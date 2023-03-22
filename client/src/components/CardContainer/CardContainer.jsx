import React from "react";
import Card from "../Card/Card.jsx";
import styles from "./CardContainer.module.css"
import { useSelector } from "react-redux";

function CardContainer () {

    // const { pokemon } = props;
    const pokemon = useSelector(state => state.allPokemons)

    return(
        <div className={styles.container}>
            {pokemon.map(data => (
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
                    type={data.type}
                />
            ))}
        </div>
    )
}

export default CardContainer;