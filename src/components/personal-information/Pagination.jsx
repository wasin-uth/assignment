import React, { useState } from "react";

export const Pagination = ({ data, requestSort, getClassNamesFor }) => {
    const [currentPage, setcurrentPage] = useState(1);
    const [todosPerPage] = useState(3);

    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const [title] = useState([
        { name: "name", sorting: false },
        { name: "gender", sorting: false },
        { name: "age", sorting: false },
    ]);

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = data.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? "active" : null}
                >
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {title.map((list, i) => (
                            <th key={i}>
                                <p
                                    onClick={() => {
                                        requestSort(list.name)
                                        list.sorting = !list.sorting
                                    }}
                                    className={getClassNamesFor(list.name)}
                                >
                                    {list.name} {list.sorting ? "↑" : "↓"}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentTodos.map((todo, i) => (
                        <tr key={i}>
                            <td>{todo.name}</td>
                            <td>{todo.gender}</td>
                            <td>{todo.age}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
            <ul className="pageNumbers">
                <li>
                    <button
                        onClick={handlePrevbtn}
                        disabled={currentPage === pages[0] ? true : false}
                    >
                        ⫷
                    </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}

                <li>
                    <button
                        onClick={handleNextbtn}
                        disabled={currentPage === pages[pages.length - 1] ? true : false}
                    >
                        ⫸
                    </button>
                </li>
            </ul>
        </>
    );
}
