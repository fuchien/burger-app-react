import React from 'react'

import classes from './BurgerControls.css'
import BuildControl from './BurgerControl/BurgerControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const burgerControls = (props) => (
    <div className={classes.BuildControls}>
        <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
        { controls.map(control => (
            <BuildControl
                label={control.label}
                key={control.label}
                addIngredient={() => props.addIngredient(control.type)}
                removeIngredient={() => props.removeIngredient(control.type)}
                disabled={props.disabled[control.type]}
            />
        )) }
    </div>
)

export default burgerControls