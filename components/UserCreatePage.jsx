"use client";

import React, { useEffect, useLayoutEffect, useState } from 'react';
import SideBarNav from './SideBarNav';
import { useRouter } from 'next/navigation';
import { getProjects } from '@/controller/requestProject';
import { Form, Button, Dropdown } from 'react-bootstrap';
import Toast from './Toast';
import { postUsers } from '@/controller/requestUser';
import withAuthRole from './withAuthRole';

function UserCreatePage() {
  const [projectDetails, setProjectDetails] = useState("");
  const router = useRouter();

  async function getProjectDetails() {
    const {project} = await getProjects();
    setProjectDetails(project);
  }

  useLayoutEffect(() => {
    getProjectDetails();
  }, [])

  const initialValue = {
    firstname: '',
    lastname: '',
    email: '',
    dateofbirth: '',
    mobilenumber: '',
    password: '',
    confirmpassword: '',
  }

  const [user, setUser] = useState(initialValue);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState('')
  const handleChange = (event) => {
    setUser((prev) => ({...prev, [event.target.name]:event.target.value}))
  }
  const handleCheckboxChange = (option) => {
    const selectedIndex = selectedProjectId.indexOf(option._id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedProjectId, option._id];
    } else {
      newSelected = selectedProjectId.filter((id) => id !== option._id);
    }

    setSelectedProjectId(newSelected);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(user.firstname !== '' && user.lastname !== '' 
    && user.email !== '' && user.dateofbirth !== '' &&
     user.mobilenumber !== '' && user.password !== '' &&
     user.confirmpassword !== '' && user.password === user.confirmpassword && selectedProjectId.length !== 0) {
      setLoading(true);
      const role = 'user';
      console.log(user);
      const res = await postUsers(user.firstname, user.lastname, user.email, user.dateofbirth, role,
        user.mobilenumber, user.password, selectedProjectId);
      if(res.ok) {
        setSuccessMessage("User Created Success");
        setTimeout(() => {
          setError('');
          setSuccessMessage(null);
          router.back();
          router.refresh();  // Replace '/another-page' with your desired page URL
        }, 3000);
        // router.back();
        // router.refresh();        
      } else {
        setLoading(false)
        setError("Email already exists");
      }
     } else {
      setLoading(false);
      setError('All field are required')
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
              <h3 className="login-heading mb-4">Create User</h3>
              {error && <div className='text-danger'>{error}</div>}
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
                    <Dropdown>
                      <Dropdown.Toggle id="selectProject" variant="light" className="form-control" style={{height: '57px', 'text-align': 'left'}}>
                      <label htmlFor="selectProject">Select Project</label>
                      </Dropdown.Toggle>


                      <Dropdown.Menu className="form-control" style = {{padding: '10px', height: '200px', overflow: 'auto'}}>
                      {projectDetails && projectDetails.map((project) => (
                        <Form.Check
                          key={project._id}
                          type="checkbox"
                          id={`checkbox-${project._id}`}
                          label={`${project.projectid}-${project.projectname}`}
                          checked={selectedProjectId.includes(project._id)}
                          onChange={() => handleCheckboxChange(project)}
                        />
                      ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    {/* <select className="form-control" id="selectProject" placeholder="Select Project">
                    {projectDetails && projectDetails.map((project) =>(
                      <option value={project.projectid}>{project.projectid}{project._id}</option>
                    ))};
                    </select> */}
                    {/* <input type="text" className="form-control" id="floatingRole" placeholder="Role"/> */}
                    {/* <label htmlFor="selectProject">Select Project</label> */}
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' onChange={handleChange}/>
                    <label htmlFor="floatingPassword">Password</label>
                    </div>
                  </div>
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

              </form>
              {successMessage && <Toast message={successMessage} />}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthRole(UserCreatePage, ['admin']);