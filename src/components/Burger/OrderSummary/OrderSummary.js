import React, { Fragment, Component } from 'react'

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    // This could be a functional component, doesn't have to be a class
    componentWillUpdate() {
        // console.log(`[OrderSummary] componentWillUpdate`)
    }

    render () {

        const btns = [
            { name: 'CANCEL', type: 'Danger', click: 'cancelled' },
            { name: 'CONTINUE', type: 'Success', click: 'continued' }
        ]
    
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {btns.map(btn => (
                        <Button
                            btnType={btn.type}
                            clicked={this.props[btn.click]}
                            key={btn.name}>{btn.name}</Button>
                    ))}
                </div>
            </Fragment>
        )
    }
}

export default OrderSummary