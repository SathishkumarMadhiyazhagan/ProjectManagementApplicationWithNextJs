'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import SideBarNav from './SideBarNav';
import { useRouter } from 'next/navigation';
import { getProjects } from '@/controller/requestProject';
import withAuthRole from './withAuthRole';



function AdminProjectDetails() {

  const [projectDetails, setProjectDetails] = useState('');
  const [loading, setLoading] = useState(false);
  async function getProjectDetails() {
    const {project} = await getProjects();
    setProjectDetails(project)
  }

  useLayoutEffect(() => {
    getProjectDetails();
  }, [])
  const router = useRouter();
  const handleOnClick = () => {
    setLoading(true)
    router.push('/admin/createProject');
  }
  const handleEdit = () => {
      router.back();
  }
  const handleDelete = () => {
      router.push('/');
  }

  return (
<div className="container-fluid">
    <div className="row flex-nowrap">
        <SideBarNav />
        <div className="col py-3">
            <div className="table-wrapper table-responsive mt-3">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2>Project Details</h2>
                    </div>
                    <div className="col-sm-4">
                      <button type="button" className="btn btn-info add-new" onClick={handleOnClick} disabled={loading}>
                          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Project
                      </button>
                    </div>
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
                      <th>Project File</th>
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  {projectDetails.map((project) => (
                  <tbody>
                    <tr>
                      <td key={project.projectid}>{project.projectid}</td>
                      <td key={project.projectname}>{project.projectname}</td>
                      <td key={project.startdate}>{project.startdate}</td>
                      <td key={project.enddate}>{project.enddate}</td>
                      <td key={project.projecttype}>{project.projecttype}</td>
                      <td key={project.projectsbu}>{project.projectsbu}</td>
                      <td key={project.projectmanager}>{project.projectmanager}</td>
                      <td key={project.projectfile}>{project.projectfile}</td>
                      {/* <td>
                        <button type="button" className="btn btn-success" onClick={handleEdit}>
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                      </td> */}
                    </tr>
                  </tbody>))}
                </table>) : (<div>...Loading</div>)}
            </div>
        </div>
    </div>
</div>
  )
}

export default withAuthRole(AdminProjectDetails, ['admin'])