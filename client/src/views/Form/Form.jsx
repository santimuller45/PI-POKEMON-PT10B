import React, { useEffect , useState } from "react";
import styles from "./Form.module.css"
import { useDispatch , useSelector } from "react-redux";
import { getTypes } from "../../components/redux/actions";

function Form () {

    const dispatch = useDispatch();
    const types = useSelector(state => state.allTypes)

    const [form , setForm] = useState ({
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
    })

    const handlerInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(getTypes())
    })

    return(
        <form className={styles.container} onSubmit={handleSubmit}>
                <label>Name *</label>
                <input
                    name="name"
                    placeholder="Name here..."
                    type="text"
                    value={form.name}
                    onChange={handlerInputChange}
                />
                <label>HP *</label>
                <input
                    name="hp"
                    placeholder="HP here..."
                    type="text"
                    value={form.hp}
                    onChange={handlerInputChange}
                />
                <label>Attack *</label>
                <input
                    name="attack"
                    placeholder="Attack here..."
                    type="text"
                    value={form.attack}
                    onChange={handlerInputChange}
                />
                <label>Defense *</label>
                <input
                    name="defense"
                    placeholder="Defense here..."
                    type="text"
                    value={form.defense}
                    onChange={handlerInputChange}
                />
                <label>Speed</label>
                <input
                    name="speed"
                    placeholder="Speed here..."
                    type="text"
                    value={form.speed}
                    onChange={handlerInputChange}
                />
                <label>Height</label>
                <input
                    name="height"
                    placeholder="Height here..."
                    type="text"
                    value={form.height}
                    onChange={handlerInputChange}
                />
                <label>Weight</label>
                <input
                    name="weight"
                    placeholder="Weight here..."
                    type="text"
                    value={form.weight}
                    onChange={handlerInputChange}
                />
                <select>
                    {types
                        ? types.map(type => (
                            <option>{type.name}</option>
                        ))
                        : null 
                    }
                </select>
            <button>Enviar</button>
        </form>
    )
}

export default Form;