import React, { Fragment } from 'react'

import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
    <Fragment>
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            >
            <span className={classes.Close} onClick={props.modalClosed}>X</span>
            {props.children}
        </div>
        <Backdrop show={props.show} closed={props.modalClosed} />
    </Fragment>
)

export default modal