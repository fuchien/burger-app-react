import React from 'react'

import classes from './Backdrop.css'

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop}></div> : null
    // onClick={props.modalClosed} 
)

export default backdrop