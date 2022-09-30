import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';

function TodoItem() {
    const [todo, setTodo] = useState({});

    // Display todo item
    const { id } = useParams();
    useEffect(() => {
        Axios.get(`https://mern-todoexam.herokuapp.com/todo/${id}`).then((res => setTodo({...res.data})));
    }, [id])

    function dateFormatter(date){
        const newDate = new Date(date);
        const formattedDate = `${newDate.toLocaleDateString('en-US')} ${newDate.toLocaleTimeString('en-US')}`;
        return formattedDate;
    }


  return (
    <div className="container col-lg-6 mt-5 p-3">
        <div className="card">
            <div className="card-header fs-3 fw-bold">
                Reference: {todo._id}
            </div>
            <div className="card-body">
                <h5 className="card-title fs-4 fw-bold">
                    Details
                </h5>
                <div className="card-text fs-5">
                    <div className='row'>
                        <div className='col-3 fw-bold'>Title:</div>
                        <div className='col'>{todo.title}</div>
                    </div>
                    <div className='row'>
                        <div className='col-3 fw-bold'>Description:</div>
                        <div className='col'>{todo.description}</div>
                    </div>
                    <div className='row'>
                        <div className='col-3 fw-bold'>Date:</div>
                        <div className='col'>{dateFormatter(todo.date)}</div>
                    </div>

                </div>
                <Link to='/' className="btn btn-primary mt-5 col-3">Go Back</Link>
            </div>
        </div>
    </div>
  )
}

export default TodoItem