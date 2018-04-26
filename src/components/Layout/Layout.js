import React, { Fragment, Component } from 'react'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import classes from './Layout.css'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    render () {
        return (
            <Fragment>
                <Toolbar
                    drawerToggle={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default Layout