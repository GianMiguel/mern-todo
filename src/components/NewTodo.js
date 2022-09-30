import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';

function NewTodo() {
    const navigate = useNavigate();

    const [todoInput, setTodoInput] = useState({
        title: '',
        description: '',
        date: ''
    });

    // Getting Data from Form
    const handleInput = (e) => {
        e.persist();
        setTodoInput({...todoInput,
            [e.target.name] : e.target.value})
    }

    // Adding New Todo
    const addTodo = (e) => {
        e.preventDefault();
        const data = {
            title: todoInput.title,
            description: todoInput.description,
            date: todoInput.date
        };

        Axios.post('https://mern-todoexam.herokuapp.com/todo/new', data)
            .then(res => {
                // if(res.status === 200){
                    swal('To-Do Added Successfully', res.data.title , 'success');
                    setTodoInput({
                    title: '',
                    description: '',
                    date: ''
                });
                // }
            })
            .catch(err => {
                console.error(err)
                swal('Error', err , 'error')
            })

    }

  return (
    <div className='container col-lg-6 mt-3 p-3'>
        <div className="card">
            <div className="card-header">
                <h1>Add New To-Do</h1>
            </div>

            <div className="card-body">
                <form onSubmit={addTodo}>
                    <div className="form-group mb-3">
                        <label for="title" className="form-label">Title: </label>
                        <input type="text" name="title" id="title" className="form-control" value={todoInput.title} onChange={handleInput} required/> 
                    </div>
                        
                    <div className="form-group mb-3">
                        <label for="description" className="form-label">Description: </label>
                        <input type="text" name="description" id="description" className="form-control" value={todoInput.description} onChange={handleInput} required/> 
                    </div>
                        
                    <div className="form-group mb-3">
                        <label for="date" className="form-label">Date: </label>
                        <input type="datetime-local" name="date" id="date" className="form-control" value={todoInput.date} onChange={handleInput} required/> 
                    </div>
  
                        <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewTodo