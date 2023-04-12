import React, { useEffect , useState} from "react";
import styles from "./Detail.module.css"
import defaultImg from "../../source/pokeball.png"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailPokemon } from "../../components/redux/actions.js";
import Loading from "../../components/Loading/Loading.jsx";

function Detail () {

    const { idPokemon } = useParams();
    const pokemon = useSelector(state => state.detail);
    const [pokemonDetail , setPokemonDetail] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(detailPokemon(idPokemon))
        setTimeout(() => {
            setPokemonDetail(pokemon)
        }, 1000);
    },[dispatch,idPokemon,pokemon]);
    

    return(
        <div className={styles.backGround}>
            <button onClick={() => navigate(-1)} className={styles.buttonBack}>Back</button>
            {pokemonDetail.id ?
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
            : <Loading/>
            }
        </div>
    )
}

export default Detail;