import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import NewTodo from './components/NewTodo';
import UpdateTodo from './components/UpdateTodo';

function App() {
  return (
    <div>
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<TodoList/>}/>
        <Route path='/todo/new' element={<NewTodo/>}/>
        <Route path='/todo/:id' element={<TodoItem/>}/>
        <Route path='/todo/update/:id' element={<UpdateTodo/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
