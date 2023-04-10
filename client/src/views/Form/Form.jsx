import React from "react";
import styles from "./Form.module.css"
import { useEffect , useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getTypes } from "../../components/redux/actions";
import validate from "./validation/validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form () {

    const dispatch = useDispatch();
    const types = useSelector(state => state.allTypes);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    const [pokeData , setPokeData] = useState ({
        name:"",
        image:"default",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        type: []
    });

    const [errors , setErrors] = useState({
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:""
    });

    const handlerInputChange = (e) => {
        setPokeData({
            ...pokeData,
            [e.target.name]: e.target.value
        });

        setErrors(
            validate({
                ...pokeData,
                [e.target.name]:e.target.value
            })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/pokemons", pokeData)
            .then(res => {
                alert("creado exitosamente");
                navigate("/home");
            })
    }

    const handleCheckBox = (e) => {
        const { name , checked } = e.target;
        if(checked) {
            setPokeData({
                ...pokeData,
                type: [...pokeData.type, name]
            })
        } else {
            const result = pokeData.type.filter(elem => elem !== name)
            setPokeData({
                ...pokeData,
                type: result
            })
        }
    };

    return(
        <div className={styles.backGround}>
            <button className={styles.buttonBack} onClick={() => navigate(-1)}>Back</button>
            <form className={styles.container} onSubmit={handleSubmit}>
                {/* LABEL INPUT NAME */}
                <label>Name *</label>
                <input
                    name="name"
                    placeholder="Name here..."
                    value={pokeData.name}
                    onChange={handlerInputChange}
                />
                <p style={{color:"red"}}>
                    {errors.name}
                </p>
                {/* LABEL INPUT HP */}
                <label>HP *</label>
                <input
                    name="hp"
                    placeholder="HP here..."
                    value={pokeData.hp}
                    onChange={handlerInputChange}
                />
                <p style={{color:"red"}}>
                    {errors.hp}
                </p>
                {/* LABEL INPUT ATTACK */}
                <label>Attack *</label>
                <input
                    name="attack"
                    placeholder="Attack here..."
                    value={pokeData.attack}
                    onChange={handlerInputChange}
                />
                <p style={{color:"red"}}>
                    {errors.attack}
                </p>
                {/* LABEL INPUT DEFENSE */}
                <label>Defense *</label>
                <input
                    name="defense"
                    placeholder="Defense here..."
                    value={pokeData.defense}
                    onChange={handlerInputChange}
                />
                <p style={{color:"red"}}>
                    {errors.defense}
                </p>
                {/* LABEL INPUT SPEED */}
                <label>Speed</label>
                <input
                    name="speed"
                    placeholder="Speed here..."
                    value={pokeData.speed}
                    onChange={handlerInputChange}
                />
                <p style={{color:"red"}}>
                    {errors.speed}
                </p>
                {/* LABEL INPUT HEIGHT */}
                <label>Height</label>
                <input
                    name="height"
                    placeholder="Height here..."
                    value={pokeData.height}
                    onChange={handlerInputChange}
                />
                <p style={{color:"red"}}>
                    {errors.height}
                </p>
                {/* LABEL INPUT WEIGHT */}
                <label>Weight</label>
                <input
                    name="weight"
                    placeholder="Weight here..."
                    value={pokeData.weight}
                    onChange={handlerInputChange}
                />
                <p style={{color:"red"}}>
                    {errors.weight}
                </p>
                {/* CHECKBOX TIPOS */}
                <div className={styles.checkBoxType}>
                    Pokémon Types
                    {types 
                        ? types.map(tipo => (
                            <label key={tipo.id} htmlFor={tipo.id}>
                                <input
                                    type="checkbox"
                                    id={tipo.id}
                                    name={tipo.name}
                                    checked={pokeData.type.includes(tipo.name)}
                                    onChange={handleCheckBox}
                                />
                                {tipo.name}  
                            </label>
                            ))
                            : null
                    }
                </div>
                <button type="submit" className={styles.buttonSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Form;