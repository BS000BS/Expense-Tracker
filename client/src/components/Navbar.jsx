import React from 'react'
import { RoughNotation } from 'react-rough-notation'
import { Link } from 'react-router-dom'



function Navbar() {

    return (
        <div style={{ marginBottom: '150px' }}>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand" href="#">
                        <RoughNotation type="highlight" animationDuration={2500} show={true} color='#C6E2FA' className='d-flex justify-content-center'>
                            <h4 className='ms-3'>Expense Tracker</h4>
                        </RoughNotation>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link active" aria-current="page" href="#">Expenses</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/categories'} className="nav-link" href="#">Categories</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Filter by category
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Category 1</a></li>
                                        <li><a className="dropdown-item" href="#">Category 2</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="#">Login / Logout</a>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
