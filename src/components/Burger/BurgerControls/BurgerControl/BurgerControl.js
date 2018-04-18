import React from 'react'

import classes from './BurgerControl.css'

const burgerControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{ props.label }</div>
        <button
            className={classes.Less}
            onClick={props.removeIngredient}
            disabled={props.disabled}
            >LESS</button>
        <button
            className={classes.More}
            onClick={props.addIngredient}
            >MORE</button>
    </div>
)

export default burgerControl