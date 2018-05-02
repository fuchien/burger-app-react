import React, { Component, Fragment } from 'react'
import axios from '../../axios-orders'

// import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICE = {
    salad: 0.7,
    cheese: 0.9,
    meat: 0.4,
    bacon: 0.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchase: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get(`https://react-my-burger-13e64.firebaseio.com/ingredients.json`)
            .then(response => this.setState({ingredients: response.data}))
            .catch(err => this.setState({error: true}))
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
        this.setState({loading: true})
        const body = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chien',
                address: {
                    street: 'Teste',
                    zipCode: '1234567',
                    country: 'Brazil'
                },
                email: 'teste@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post(`/orders.json`, body)
            .then(response => this.setState({loading: false, purchasing: false}))
            .catch(err => this.setState({loading: false, purchasing: false}))
    }

    render() {

        const oldIngredients = { ...this.state.ingredients }
        for (let key in oldIngredients) {
            oldIngredients[key] = oldIngredients[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={oldIngredients}
                        totalPrice={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        purchase={this.state.purchase} />
                </Fragment>
            )
            orderSummary = <OrderSummary
                                ingredients={this.state.ingredients}
                                cancelled={this.purchaseCancelHandler}
                                price={this.state.totalPrice}
                                continued={this.purchaseContinueHandler}/>
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)