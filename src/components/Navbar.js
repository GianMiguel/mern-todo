import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark ">
            <div className="container justify-content-center">
                <Link className="navbar-brand fs-3" to='/'>Todo App.</Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar