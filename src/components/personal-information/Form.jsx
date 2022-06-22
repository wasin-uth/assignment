import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Table } from './Table';

export const Form = ({ todos, setTodos }) => {
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleInputChange = (e) => {
        setName(e.target.value);
    }
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }
    const handleAgeChange = (e) => {
        setAge(e.target.value);
    }

    const handleFormSubmit = () => {
        setTodos([
            ...todos,
            {
                id: todos.length + 1,
                name: name,
                gender: gender,
                age: age,
            }
        ])

        setName("");
        setAge("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="name">
                    <label htmlFor="name"> Name </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        {...register("name", { required: true, minLength: 2 })}
                        defaultValue={name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                    />
                    {Object.keys(errors).length !== 0 && (
                        <div style={{ color: "red" }}>
                            {errors.name?.type === 'required' &&
                                <span>
                                    Name is required.
                                </span>
                            }
                            {errors.name?.type === 'minLength' &&
                                <span>
                                    At least 2 characters.
                                </span>
                            }
                        </div>
                    )}
                </div>
                <br />

                <div className="gender">
                    <label> Gender </label>
                    <br />
                    <input
                        type="radio"
                        name="gender"
                        id="male"
                        defaultValue="Male"
                        onChange={handleGenderChange}
                    />
                    <label htmlFor="male"> Male </label><br />
                    <input
                        type="radio"
                        name="gender"
                        id="female"
                        defaultValue="Female"
                        onChange={handleGenderChange}
                    />
                    <label htmlFor="female"> Female </label><br />
                </div>

                <br />
                <div className="age">
                    <label htmlFor="age"> Age </label>
                    <input
                        type="text"
                        name="age"
                        id="age"
                        placeholder="Enter your age"
                        {...register("age", { required: true, maxLength: 2 })}
                        defaultValue={age}
                        onChange={handleAgeChange}
                    />
                    {Object.keys(errors).length !== 0 && (
                        <div style={{ color: "red" }}>
                            {errors.age?.type === 'required' &&
                                <span>
                                    Age is required.
                                </span>
                            }
                            {errors.age?.type === 'maxLength' &&
                                <span>
                                    No more than 2 characters.
                                </span>
                            }
                        </div>
                    )}
                </div>
                <br />
                <input type="Submit" defaultValue="Add" />
            </form>
            <div className="table">
                <Table />
            </div>
        </div>
    )
}