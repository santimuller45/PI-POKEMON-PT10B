import React from "react";
import styles from "./Form.module.css"
import { useEffect , useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getTypes } from "../../components/redux/actions";
import validate from "./validation/validation";

function Form () {

    const dispatch = useDispatch();
    const types = useSelector(state => state.allTypes)

    useEffect(() => {
        dispatch(getTypes())
    })

    const [pokeData , setPokeData] = useState ({
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:""
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
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!pokeData.name || !pokeData.hp || !pokeData.attack || !pokeData.defense) {
            alert("Debes completar los campos obligatorios")
        }
    }

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
                <label>Name *</label>
                <input
                    name="name"
                    placeholder="Name here..."
                    value={pokeData.name}
                    onChange={handlerInputChange}
                />
                <p>{errors.name}</p>
                <label>HP *</label>
                <input
                    name="hp"
                    placeholder="HP here..."
                    value={pokeData.hp}
                    onChange={handlerInputChange}
                />
                <p>{errors.hp}</p>
                <label>Attack *</label>
                <input
                    name="attack"
                    placeholder="Attack here..."
                    value={pokeData.attack}
                    onChange={handlerInputChange}
                />
                <p>{errors.attack}</p>
                <label>Defense *</label>
                <input
                    name="defense"
                    placeholder="Defense here..."
                    value={pokeData.defense}
                    onChange={handlerInputChange}
                />
                <p>{errors.defense}</p>
                <label>Speed</label>
                <input
                    name="speed"
                    placeholder="Speed here..."
                    value={pokeData.speed}
                    onChange={handlerInputChange}
                />
                <p>{errors.speed}</p>
                <label>Height</label>
                <input
                    name="height"
                    placeholder="Height here..."
                    value={pokeData.height}
                    onChange={handlerInputChange}
                />
                <p>{errors.height}</p>
                <label>Weight</label>
                <input
                    name="weight"
                    placeholder="Weight here..."
                    value={pokeData.weight}
                    onChange={handlerInputChange}
                />
                <p>{errors.weight}</p>
                <select>
                    {types
                        ? types.map(type => (
                            <option>{type.name}</option>
                        ))
                        : null 
                    }
                </select>
            <button type="submit">Enviar</button>
        </form>
    )
}

export default Form;