import React, { Component } from 'react';
import Button from './Button.jsx'
import '../styles/Container.css'
const btnValues = [
    ["+", "-", "*", "/", "⌫"],
    [1, 2, 3, "CLS"],
    [4, 5, 6],
    [7, 8, 9],
    [0, "="]
];
const classNameMaps = {
    "+": "btn expr",
    "-": "btn expr",
    "*": "btn expr",
    "/": "btn expr",
    "⌫": "btn backspace",
    1: "btn",
    2: "btn",
    3: "btn",
    4: "btn",
    5: "btn",
    6: "btn",
    7: "btn",
    8: "btn",
    9: "btn",
    0: "btn zero",
    "CLS": "btn clear",
    "=": "btn equal"
}
class Container extends Component {
    render() {
        return (
            <div className='container'>
                {btnValues.flat().map((btn, i) => {

                    return (

                        <Button
                            key={i}
                            className={classNameMaps[btn]}
                            children={btn}
                            onClick={async () => {
                                let displayScreen = document.getElementById("disp")
                                if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(btn)) {
                                    displayScreen.innerText += btn;
                                } else if (["-", "+", "*", "/"].includes(btn)) {
                                    if (["-", "+", "*", "/"].some(expr => displayScreen.innerText.includes(expr))) return;
                                    if (displayScreen.innerText.length < 1) return;
                                    displayScreen.innerText += btn;
                                } else if (btn === "CLS") {
                                    return displayScreen.innerText = ""
                                } else if (btn === "⌫") {
                                    return displayScreen.innerText = displayScreen.innerText.slice(0, displayScreen.innerText.length - 1)
                                } else if (btn === "=") {
                                    if (["-", "*", "/", "+"].some(expr => displayScreen.innerText.includes(expr) && displayScreen.innerText.charAt(displayScreen.innerText.length - 1) !== expr)) {
                                        async function calculate(expr) {
                                            if (expr.includes("-")) {
                                                let splitted = expr.split("-");
                                                let result = Math.floor(splitted[0]) - Math.floor(splitted[1])
                                                return result;
                                            } else if (expr.includes("+")) {
                                                let splitted = expr.split("+");
                                                let result = Math.floor(splitted[0]) + Math.floor(splitted[1])
                                                return result;
                                            } else if (expr.includes("/")) {
                                                let splitted = expr.split("/");
                                                let result = Math.floor(splitted[0]) / Math.floor(splitted[1])
                                                return result;
                                            } else if (expr.includes("*")) {
                                                let splitted = expr.split("*");
                                                let result = Math.floor(splitted[0]) * Math.floor(splitted[1])
                                                return result;
                                            }
                                        }
                                        let result = await calculate(displayScreen.innerText)
                                        displayScreen.innerText = result;
                                    }
                                }
                            }}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Container
