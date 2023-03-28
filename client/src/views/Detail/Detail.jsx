import React, { useEffect, useState } from "react";
import styles from "./Detail.module.css"
import { useParams } from "react-router-dom";
import defaultImg from "../../source/icoPokeball.png"

function Detail () {

    const { idPokemon } = useParams();
    const [pokemon , setPokemon] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/pokemons/${idPokemon}`)
            .then((response) => response.json())
            .then((data) => setPokemon([data]))
    },[idPokemon]);

    return(
        <div>
            {pokemon ? pokemon.map(info => (
                <div key={info.id} className={styles.container}>
                    {info.image === "default" 
                        ? <img src={defaultImg} alt={info.id} className={styles.image}/>
                        : <img src={info.image} alt={info.id} className={styles.image}/>
                    }
                    <div className={styles.stats}>
                        <h1> {info.name}</h1>
                        <div>HP: {info.hp}</div>
                        <div>ATTACK: {info.attack}</div>
                        <div>DEFENSE: {info.defense}</div>
                        {info.speed 
                            ? <div>SPEED: {info.speed}</div>
                            : null
                        }
                        {info.height 
                            ? <div>HEIGHT: {info.height}</div>
                            : null
                        }
                        {info.weight 
                            ? <div>WEIGHT: {info.weight}</div>
                            : null
                        }
                        <div>TYPE: {(info.types.map(elem => elem.name ? elem.name : elem)).join(",")}</div>
                    </div>
                </div>
            ))
            : null
            }
        </div>
    )
}

export default Detail;