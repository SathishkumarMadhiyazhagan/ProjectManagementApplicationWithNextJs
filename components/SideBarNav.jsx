'use client'
import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faDashboard, faProjectDiagram, faUser} from '@fortawesome/free-solid-svg-icons'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

function SideBarNav() {
    const {data: session} = useSession() 
    // function getdetails(session) {;
    // console.log(session);
    // }
    // useEffect(() => {
    //     getdetails()
    // }, [])
    let superAdmin = false;
    let admin = false;
    let user = false;
    if(session?.user?.role == 'superAdmin') {
        superAdmin = true;
    } else if(session?.user?.role == 'admin') {
        admin = true;
    } else if(session?.user?.role == 'user') {
        user = true;
    }

    // const signOut = () => {
    //     localStorage.clear();
    //     router.push("/");
    // }
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 sticky-top mt-3">
                {/* <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">
                    <FontAwesomeIcon icon={faLockOpen}></FontAwesomeIcon><span className="fs-5 d-none d-sm-inline">Menu</span>
                </a> */}
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {superAdmin && <li className="nav-item">
                        <Link href="/superAdmin" className="nav-link align-middle px-0">
                            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> <span className="ms-1 d-none d-sm-inline">Admins</span>
                        </Link>
                    </li>}
                    { admin && <><li>
                        <Link href="/admin" className="nav-link px-0 align-middle">
                        <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> <span className="ms-1 d-none d-sm-inline">Projects</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/users" className="nav-link px-0 align-middle">
                        <FontAwesomeIcon icon={faDashboard}></FontAwesomeIcon> <span className="ms-1 d-none d-sm-inline">Users</span>
                        </Link>
                    </li></>}
                    {user && <li><Link href="/user" className="nav-link px-0 align-middle">
                        <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> <span className="ms-1 d-none d-sm-inline">Projects</span>
                        </Link>
                    </li>}
                    {/* <li>
                        <a href="#" className="nav-link px-0 align-middle">
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> <span className="ms-1 d-none d-sm-inline">Orders</span></a>
                    </li> */}
                    {/* <li>
                        <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Products</span> </a>
                            <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li className="w-100">
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                            </li>
                            <li>
                                <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                            </li>
                        </ul>
                    </li> */}
                </ul>
                <hr />
                <div className="dropdown pb-4">
                    {/* <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                        <span className="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul> */}
                    <button type="button" className="btn btn-danger add-new" onClick={signOut}>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> <span className="ms-1 d-none d-sm-inline">Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
  )
}

export default SideBarNav