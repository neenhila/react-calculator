import React from 'react';
import '../styles/Button.css'

function Button(props) {
    return <button className={props.className} onClick={props.onClick}>{props.children}</button>
}

export default Button
