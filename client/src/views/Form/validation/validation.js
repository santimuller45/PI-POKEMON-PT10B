export default function validate (input) {

    const error = {};

    if (Number(input.name) && input.name.length > 0) error.name = "Name debe ser un string";
    if ((!Number(input.hp) || Number(input.hp) > 500) && input.hp.length > 0) error.hp = "HP no puede ser un string o valer más de 500 puntos";
    if ((!Number(input.attack) || Number(input.attack) > 500) && input.attack.length > 0) error.attack = "Attack no puede ser un string o valer más de 500 puntos";
    if ((!Number(input.defense) || Number(input.defense) > 500) && input.defense.length > 0) error.defense = "Defense no puede ser un string o valer más de 500 puntos";
    if ((!Number(input.speed) || Number(input.speed) > 500) && input.speed.length > 0) error.speed = "Speed no puede ser un string o valer más de 500 puntos"; 
    if ((!Number(input.height) || Number(input.height) > 500) && input.height.length > 0) error.height = "Height no puede ser un string o valer más de 500 puntos";
    if ((!Number(input.weight) || Number(input.weight) > 500) && input.weight.length > 0) error.weight = "Weight no puede ser un string o valer más de 500 puntos";

    return error;
}