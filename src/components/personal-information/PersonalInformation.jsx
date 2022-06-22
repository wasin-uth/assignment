import { createContext, useState } from 'react';
import { Form } from './Form';
import './style.css'

export const DataContext = createContext()

const PersonalInformation = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodo = localStorage.getItem("todos");

        if (savedTodo) {
            return JSON.parse(savedTodo)
        } else {
            return [];
        }
    });

    return (
        <DataContext.Provider value={todos}>
            <div className="per-information">
                <div className="card">
                    <Form todos={todos} setTodos={setTodos} />
                </div>
            </div>
        </DataContext.Provider>
    )
}

export default PersonalInformation;
