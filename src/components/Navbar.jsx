import { useState } from 'react';
import { NavLink } from "react-router-dom"

export const Navbar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <style>
        {`
          .navbar-nav-scroll {
            --bs-scroll-height: 100px;
          }
        `}
      </style>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="bi bi-safe" style={{ fontSize: '1.5rem' }}></i>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Clientes
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li><NavLink to={"/users/create"} className="dropdown-item">Registrar</NavLink></li>
                  <li><NavLink to={"/users/list"} className="dropdown-item">Listado</NavLink></li>
                </ul>
              </li>
            </ul>
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
              </button>
              {showUserMenu && (
                <ul className="dropdown-menu dropdown-menu-end show mt-2">
                  <li><a className="dropdown-item" href="#">Ver perfil</a></li>
                  <li><a className="dropdown-item" href="#">Cerrar sesión</a></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="d-flex vh-100">
        <div className="flex-grow-1">
          <nav className="navbar navbar-light bg-light justify-content-end px-4">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
              </button>
              {showUserMenu && (
                <ul className="dropdown-menu dropdown-menu-end show mt-2">
                  <li><a className="dropdown-item" href="#">Ver perfil</a></li>
                  <li><a className="dropdown-item" href="#">Cerrar sesión</a></li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div> */}
    </>
  )
}
