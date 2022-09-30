import React,{ useEffect , useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function TodoList() {
    const [todoList, setTodoList] = useState([]);

    const getTodoList = () => {
        Axios.get('https://mern-todoexam.herokuapp.com/')
        .then(res => {
            setTodoList(res.data);
        })
    }
    useEffect(() => {
        getTodoList();
    }, []);

    // Deleting Todo Item
    const deleteTodo = (id, title) =>{
        if(window.confirm('Are you sure that you want to delete this To-Do item?')) {
            Axios.delete(`https://mern-todoexam.herokuapp.com/todo/${id}`);
            swal('To-Do Deleted Successfully', title , 'success');
            setTimeout(() => getTodoList(), 500);
        }
    };

    // Deleting Todo List
    const deleteTodoList = () =>{
        if(window.confirm('Are you sure that you want to delete this To-Do List?')) {
            Axios.delete(`https://mern-todoexam.herokuapp.com/todo/delete/all`);
            swal('To-Do List Deleted', 'Everything is Deleted', 'success');
            setTimeout(() => getTodoList(), 500);
        }
    };

    function dateFormatter(date){
        const newDate = new Date(date);
        const formattedDate = `${newDate.toLocaleDateString('en-US')}`;
        return formattedDate;
    }
    
  return (
    <section className='container col-lg-10 mt-2 p-4'>
        <div className='d-flex mb-3'>
            <div className='col-4'><h1>To-Do List</h1></div>
            <Link to={'/todo/new'} className='col-2 offset-4 px-2'><button type="button" className="btn btn-outline-primary btn-lg col-12">Add To-Do</button></Link>
            <div className='col-2 px-2'>
                <button type="button" className="btn btn-outline-danger btn-lg col-12" onClick={() => deleteTodoList()}>Delete All</button>
            </div>
            
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover align-middle">
                <thead class="table-dark fs-4">
                    <tr>
                        <th className='col-2'>Reference #</th>
                        <th className='col-2'>Title</th>
                        <th className='col-4'>Description</th>
                        <th className='col-2'>Date</th>
                        <th className='col-2 text-center'>Details</th>
                    </tr>
                    </thead>
                    <tbody class="table-group-divider fs-5">
                        {todoList.map((todo, index) => {
                            
                            return <tr key={index}>
                                        <td>{todo._id.slice(- 9)}</td>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{dateFormatter(todo.date)}</td>
                                        <td className='text-center'>
                                            <Link to={`/todo/${todo._id}`}><i className="bi bi-eye-fill text-primary fs-4 pe-2"></i></Link>
                                            <Link to={`/todo/update/${todo._id}`}><i className="bi bi-pencil-square text-warning fs-4 pe-2"></i></Link>
                                            <i className="bi bi-trash3-fill text-danger fs-4 pe-2" onClick={() => deleteTodo(todo._id, todo.title)} style={{'cursor':'pointer'}}></i>
                                        </td>
                                    </tr>
                        })}
                        
                    </tbody>
            </table>
        </div>
        
    </section>
  )
}

export default TodoList