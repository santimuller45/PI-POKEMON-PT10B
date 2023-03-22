import React from "react";
import styles from "./Home.module.css"
import CardContainer from "../../components/CardContainer/CardContainer.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../components/redux/actions.js";

function Home () {

    const dispatch = useDispatch();
    // const pokemon = useSelector(state => state.allPokemons)

    useEffect(() => {
        dispatch(getPokemons())
    },[dispatch])

    return(
        <div className={styles.backGround}>
            <CardContainer/>
        </div>
    )
}

export default Home;