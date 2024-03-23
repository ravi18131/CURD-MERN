import React from 'react';
import "../stylesheets/NavbarStyle.css"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary custom-nav">
      <div className="container-fluid">
      <a className="navbar-brand" href='#'>ScaleX Finance</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-primary" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
