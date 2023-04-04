import React, { useEffect } from "react";
import styles from "./Detail.module.css"
import { useNavigate, useParams } from "react-router-dom";
import defaultImg from "../../source/pokeball.png"
import { useDispatch, useSelector } from "react-redux";
import { detailPokemon } from "../../components/redux/actions.js";

function Detail () {

    const { idPokemon } = useParams();
    const pokemon = useSelector(state => state.detail)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(detailPokemon(idPokemon))
    },[dispatch,idPokemon]);
    
    const handleBackButton = () => {
        navigate("/home")
    }

    return(
        <div>
            <button onClick={handleBackButton} className={styles.buttonBack}>Back</button>
            {pokemon ?
                <div className={styles.container}>
                    {pokemon.image === "default" 
                        ? <img src={defaultImg} alt={pokemon.id} className={styles.image}/>
                        : <img src={pokemon.image} alt={pokemon.id} className={styles.image}/>
                    }
                    <div className={styles.stats}>
                        <h1> {pokemon.name}</h1>
                        <div>HP: {pokemon.hp}</div>
                        <div>ATTACK: {pokemon.attack}</div>
                        <div>DEFENSE: {pokemon.defense}</div>
                        {pokemon.speed 
                            ? <div>SPEED: {pokemon.speed}</div>
                            : null
                        }
                        {pokemon.height 
                            ? <div>HEIGHT: {pokemon.height}</div>
                            : null
                        }
                        {pokemon.weight 
                            ? <div>WEIGHT: {pokemon.weight}</div>
                            : null
                        }
                        <div>TYPE: {pokemon.types?.map(elem => elem.name ? elem.name : elem).join(",")}</div>
                    </div>
                </div>
            : <h1>Loading...</h1>
            }
        </div>
    )
}

export default Detail;