import React, { Fragment } from 'react'

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const btns = [
        { name: 'CANCEL', type: 'Danger', click: 'cancelled' },
        { name: 'CONTINUE', type: 'Success', click: 'continued' }
    ]

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <Fragment>
            <h3>Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                {btns.map(btn => (
                    <Button
                        btnType={btn.type}
                        clicked={props[btn.click]}
                        key={btn.name}>{btn.name}</Button>
                ))}
            </div>
        </Fragment>
    )
}

export default orderSummary