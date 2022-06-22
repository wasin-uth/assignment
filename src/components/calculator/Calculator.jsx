import { useContext, useState } from "react";
import "./calc.css"

const Calculator = () => {
    const [calc, setCalc] = useState("");

    const ops = ['/', '*', '+', '-', '.']

    const updateCalc = value => {
        if (
            ops.includes(value) && calc === '' ||
            ops.includes(value) && ops.includes(calc.slice(-1))
        ) {
            return;
        }

        setCalc(calc + value);
    }

    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
            )
        }

        return digits
    }

    const calculate = () => {
        setCalc(eval(calc).toString())
    }

    const clear = () => {
        setCalc('')
    }

    const deleteLast = () => {
        if (calc == '') {
            return;
        }

        const value = calc.slice(0, -1);

        setCalc(value);
    }

    return (
        <div className="container">
            <div className="calculator-grid">
                <div className="output">
                    {calc || "0"}
                </div>

                <button className="ac" onClick={clear}>AC</button>
                <button className="del" onClick={deleteLast}>←</button>

                {createDigits()}
                <button className="zero" onClick={() => updateCalc('0')}>0</button>
                <button onClick={() => updateCalc('.')}>.</button>

                <button onClick={() => updateCalc('/')}>÷</button>
                <button onClick={() => updateCalc('*')}>×</button>
                <button onClick={() => updateCalc('-')}>-</button>
                <button onClick={() => updateCalc('+')}>+</button>
                <button className="equal-to" onClick={calculate}>=</button>
            </div>
        </div>
    )
}

export default Calculator;