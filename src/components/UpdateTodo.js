import React, { useState, useEffect } from 'react';
import { useNavigate, useParams , Link} from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';

function UpdateTodo() {
    const navigate = useNavigate();

    const [todoInput, setTodoInput] = useState([]);

    // updating project
    const { id } = useParams();
    useEffect(() => {
        Axios.get(`https://mern-todoexam.herokuapp.com/todo/update/${id}`).then((res => {
            setTodoInput(res.data)
        }
        ));
    }, [navigate,id])

    // Getting Data from Form
    const handleInputUpdate = (e) => {
        e.persist();
        setTodoInput({...todoInput,
            [e.target.name] : e.target.value})
    }

    // update New Todo
    const updateTodo = (e) => {
        e.preventDefault();
        const data = {
            title: todoInput.title,
            description: todoInput.description,
        };
        console.log(data);
        Axios.post(`https://mern-todoexam.herokuapp.com/todo/update/${id}`, data)
            .then(res => {
                // if(res.status === 200){
                    swal('To-Do Updated Successfully', res.data.title , 'success');
                    setTodoInput({
                    title: '',
                    description: '',
                });
                navigate('/');
                // }
            })
            .catch(err => {
                console.error(err)
                swal('Error', err._message , 'error')
            })

    }

    function dateFormatter(date){
        const newDate = new Date(date);
        const formattedDate = `${newDate.toLocaleDateString('en-US')} ${newDate.toLocaleTimeString('en-US')}`;
        return formattedDate;
    }

  return (
    <div className='container col-lg-6 mt-3 p-3'>
        <div className="card">
            <div className="card-header">
                <h1>Update To-Do</h1>
            </div>

            <div className="card-body">
                <form onSubmit={updateTodo}>
                    <div className="form-group mb-3">
                        <label htmlFor="title" className="form-label">Title: </label>
                        <input type="text" name="title" id="title" className="form-control" value={todoInput.title} onChange={handleInputUpdate} required/> 
                    </div>
                        
                    <div className="form-group mb-3">
                        <label htmlFor="description" className="form-label">Description: </label>
                        <input type="text" name="description" id="description" className="form-control" value={todoInput.description} onChange={handleInputUpdate} required/> 
                    </div>
                        
                    <div className="form-group mb-3">
                        <label htmlFor="date" className="form-label">Date Added: </label>
                        <input type="text" name="date" id="date" className="form-control" value={dateFormatter(todoInput.date)} readOnly/> 
                    </div>

                    <div className='row ms-3'>
                        <Link to='/' className="btn btn-outline-secondary col-2 ">Go Back</Link>
                        <div className='col-6 offset-1'>
                            <button type="submit" className="btn btn-primary col-12">Submit</button>
                        </div>
                    </div>
                        
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateTodo