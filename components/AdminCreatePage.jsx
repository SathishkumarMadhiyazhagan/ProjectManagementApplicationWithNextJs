"use client";

import { faArrowRotateBack, faBackspace, faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import SideBarNav from './SideBarNav';
import Toast from './Toast';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
//import { string } from 'i/lib/util';
import { postUsers } from '@/controller/requestUser';
import withAuthRole from './withAuthRole';
//import { useRouter } from 'next/router';
//import { useRouter } from 'next/router';

//import CrudOperations from '../Operation/CrudOperations'

function AdminCreatePage() {

  const initialValue = {
    firstname: '',
    lastname: '',
    email: '',
    dateofbirth: '',
    mobilenumber: '',
    password: '',
    confirmpassword: ''
  }

  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setUser((prev) => ({...prev, [event.target.name]:event.target.value}))
  }
  const router = useRouter()
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(user.firstname !== '' && user.lastname !== '' 
    && user.email !== '' && user.role !== ''
     && user.dateofbirth !== '' &&
     user.mobilenumber !== '' && user.password !== '' &&
     user.confirmpassword !== '' && user.password === user.confirmpassword) {
      setLoading(true);
      const role = 'admin';
      console.log(user);
      const res = await postUsers(user.firstname, user.lastname, user.email, user.dateofbirth, role,
        user.mobilenumber, user.password);
      console.log(res);
      if(res.ok) {
        setError('');
        setSuccessMessage("Admin Created Success");
        setTimeout(() => {
          setSuccessMessage(null);
          router.back();
          router.refresh();  // Replace '/another-page' with your desired page URL
        }, 3000);
      } else {
        setError("Email already exists");
        setLoading(false);
      }
     } else {
      setError('All field are required');
      setLoading(false)
     }
    //router.push('/');
    //router.push();
    //window.history.back();
    //CrudOperations.AddUsers();
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideBarNav />
        <div className="col py-3">
            <div className="row mt-4">
                <div className="col-md-12 col-lg-10 mx-auto">
                <h3 className="login-heading mb-4">Create Admin</h3>
                {error ? <div className='text-danger'>{error}</div>: null}
                <form onSubmit={handleOnSubmit} className='mt-2'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="floatingFirstName" placeholder="FirstName" name='firstname' onChange={handleChange}/>
                      <label htmlFor="floatingFirstName">FirstName</label>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="floatingLastName" placeholder="LastName" name='lastname' onChange={handleChange}/>
                      <label htmlFor="floatingLastName">LastName</label>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className="form-floating mb-3">
                      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={handleChange}/>
                      <label htmlFor="floatingInput">Email address</label>
                        </div>
                    </div>
                    <div className='col-md-6'>
                      <div className="form-floating mb-3">
                      <input type="date" className="form-control" id="floatingDateOfBirth" placeholder="DateOfBirth" name='dateofbirth' onChange={handleChange}/>
                      <label htmlFor="floatingDateOfBirth">DateOfBirth</label>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className="form-floating mb-3">
                      <input type="number" className="form-control" id="floatingMobilNumber" placeholder="MobilNumber" name='mobilenumber' onChange={handleChange}/>
                      <label htmlFor="floatingMobilNumber">MobilNumber</label>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className="form-floating mb-3">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={handleChange}/>
                      <label htmlFor="floatingPassword">Password</label>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className="form-floating mb-3">
                      <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="ConfirmPassword" name='confirmpassword' onChange={handleChange}/>
                      <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid align-items-center justify-content-center mt-4">
                  <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit" disabled={loading}>submit</button>
                  </div>
                  
                  {/* <div className="d-grid align-items-center justify-content-center mt-4">
                  <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit"><span><FontAwesomeIcon icon={faBackspace}></FontAwesomeIcon></span></button>
                  </div> */}

                </form>
                {successMessage && <Toast message={successMessage} />}
                </div>
            </div>
        </div>
      </div>
    </div>
    // <div className="container-fluid ps-md-0">
    //     <div className="row g-0">
    //     <div className="position-absolute top-50 start-50 translate-middle">
    //         <div className="container">
    //         <div className="row">
    //             <div className="col-md-6 col-lg-6 mx-auto">
    //             <h3 className="login-heading mb-4">Create Admin</h3>

    //             <form>
    //                 <div className="form-floating mb-3">
    //                 <input type="text" className="form-control" id="floatingFirstName" placeholder="FirstName"/>
    //                 <label htmlFor="floatingFirstName">FirstName</label>
    //                 </div>
    //                 <div className="form-floating mb-3">
    //                 <input type="text" className="form-control" id="floatingLastName" placeholder="LastName"/>
    //                 <label htmlFor="floatingLastName">LastName</label>
    //                 </div>
    //                 <div className="form-floating mb-3">
    //                 <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
    //                 <label htmlFor="floatingInput">Email address</label>
    //                 </div>
    //                 <div className="form-floating mb-3">
    //                 <input type="date" className="form-control" id="floatingDateOfBirth" placeholder="DateOfBirth"/>
    //                 <label htmlFor="floatingDateOfBirth">DateOfBirth</label>
    //                 </div>
    //                 <div className="form-floating mb-3">
    //                 <input type="text" className="form-control" id="floatingRole" placeholder="Role"/>
    //                 <label htmlFor="floatingRole">Role</label>
    //                 </div>
    //                 <div className="form-floating mb-3">
    //                 <input type="number" className="form-control" id="floatingMobilNumber" placeholder="MobilNumber"/>
    //                 <label htmlFor="floatingMobilNumber">MobilNumber</label>
    //                 </div>
    //                 <div className="form-floating mb-3">
    //                 <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
    //                 <label htmlFor="floatingPassword">Password</label>
    //                 </div>
    //                 <div className="form-floating mb-3">
    //                 <input type="text" className="form-control" id="floatingConfirmPassword" placeholder="ConfirmPassword"/>
    //                 <label htmlFor="floatingConfirmPassword">Confirm Password</label>
    //                 </div>

    //                 <div className="d-grid">
    //                 <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">submit</button>
    //                 </div>

    //             </form>
    //             </div>
    //         </div>
    //         </div>
    //     </div>
    //     </div>
    // </div>
  )
}

export default withAuthRole(AdminCreatePage, ['superAdmin'])