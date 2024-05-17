'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
//import { useNavigate } from 'react-router-dom';
import SideBarNav from './SideBarNav';
import { useRouter } from 'next/navigation';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { getUsers } from '@/controller/requestUser';
import { fetchDetailsByIds } from '@/controller/requestProject';
import withAuthRole from './withAuthRole';
import Link from 'next/link';


function User() {
  const [projectDetails, setProjectDetails] = useState([]);
  const {data: session, status} = useSession();
  //const selectedProjectId = session?.user?.selectedProjectId;

  async function getProjectsDetails(idsArray) {
    const {project} = await fetchDetailsByIds(idsArray)
    setProjectDetails(project);
  }
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.selectedProjectId) {
      const idsArray = session.user.selectedProjectId;
      getProjectsDetails(idsArray)
    }
    // Replace with your actual array of IDs
  }, [status, session]);

  
  // const storage = localStorage.getItem("User");
  // const user = JSON.parse(storage);
  return (
<div className="container-fluid">
    <div className="row flex-nowrap">
      <SideBarNav />
        <div className="col py-3">
          <h2>User Details</h2>
          {/* <h1>{data.users}</h1> */}
          <div className='row mt-3'>
            <div className='row mt-2'>
              <div className="col-md-6">
                  <div className='row'>
                  <label className="col-md-4">First Name</label>
                  <h6 className="col-md-8">{session?.user?.firstName}</h6>
                  </div>
              </div>
                <div className="col-md-6">
                  <div className='row'>
                  <label className="col-md-4">Last Name</label>
                  <h6 className="col-md-8">{session?.user?.lastName}</h6>
                  </div>
                </div>
            </div>
            <div className='row mt-2'>
              <div className="col-md-6">
                  <div className='row'>
                  <label className="col-md-4">Email</label>
                  <h6 className="col-md-8">{session?.user?.email}</h6>
                  </div>
              </div>
                <div className="col-md-6">
                  <div className='row'>
                  <label className="col-md-4">DateOfBirth</label>
                  <h6 className="col-md-8">{session?.user?.dateOfBirth}</h6>
                  </div>
                </div>
            </div>
            <div className='row mt-2'>
              <div className="col-md-6">
                  <div className='row'>
                  <label className="col-md-4">Role</label>
                  <h6 className="col-md-8">{session?.user?.role}</h6>
                  </div>
              </div>
                <div className="col-md-6">
                  <div className='row'>
                  <label className="col-md-4">Mobile Number</label>
                  <h6 className="col-md-8">{session?.user?.mobileNumber}</h6>
                  </div>
                </div>
            </div>
          </div>
          <div className="table-wapper table-responsive mt-3">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                  <h2>Project Details</h2>
                </div>
                {/* <div className="col-sm-4">
                  <button type="button" className="btn btn-info add-new">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Admin
                  </button>
                </div> */}
              </div>
            </div>
            {projectDetails ? (<table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Project Id</th>
                  <th>Project Name</th>
                  <th>Start Date</th> 
                  <th>End Date</th>
                  <th>Project Type</th>
                  <th>Project SBU</th>
                  <th>Project Manager Email Address</th>
                  {/* <th>Project File</th> */}
                  {/* <th>Project Type</th>
                  <th>Project SBU</th>
                  <th>Project Manager Email Address</th>
                  <th>Project Type</th>
                  <th>Project SBU</th>
                  <th>Project Manager Email Address</th> */}
                </tr>
              </thead>
              {projectDetails.length>0 ? projectDetails.map((project) => (
                  <tbody>
                    <tr>
                      <td key={project.projectid}>
                        <Link href={{
                              pathname: '/user/projectUseCases',
                              query: { projectDetails: JSON.stringify(project) },
                            }}
                            passHref>
                          {project.projectid}
                        </Link>
                      </td>
                      <td key={project.projectname}>{project.projectname}</td>
                      <td key={project.startdate}>{project.startdate}</td>
                      <td key={project.enddate}>{project.enddate}</td>
                      <td key={project.projecttype}>{project.projecttype}</td>
                      <td key={project.projectsbu}>{project.projectsbu}</td>
                      <td key={project.projectmanager}>{project.projectmanager}</td>
                      {/* <td key={project.projectfile}>{project.projectfile}</td> */}
                      {/* <td>
                        <button type="button" className="btn btn-success" onClick={handleEdit}>
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                      </td> */}
                    </tr>
                  </tbody>)) : <tbody style={{textAlign: 'center'}}><tr><td>...Loding</td></tr></tbody>}
            </table>):(<div>...Loading</div>)}
          </div>
        </div>
    </div>
</div>
  )
} 

export default withAuthRole(User, ['user']);