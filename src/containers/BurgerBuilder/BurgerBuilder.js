import React, { Component, Fragment } from 'react'

// import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE = {
    salad: 0.7,
    cheese: 0.9,
    meat: 0.4,
    bacon: 0.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0
        },
        totalPrice: 4,
        purchase: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => ingredients[igKey])
            .reduce((old, el) => old + el, 0)
        this.setState({
            purchase: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updateCount = oldCount + 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updateCount

        const priceAddition = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) return
        const updateCount = oldCount - 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updateCount

        const priceDeduction = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        let purchasing = this.state.purchasing
        this.setState({
            purchasing: !purchasing
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        alert('CONTINUE')
    }

    render() {

        const oldIngredients = { ...this.state.ingredients }
        for (let key in oldIngredients) {
            oldIngredients[key] = oldIngredients[key] <= 0
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancelled={this.purchaseCancelHandler}
                        price={this.state.totalPrice}
                        continued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={oldIngredients}
                    totalPrice={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchase={this.state.purchase}
                />
            </Fragment>
        )
    }
}

export default BurgerBuilder