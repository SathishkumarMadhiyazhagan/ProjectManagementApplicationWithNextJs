"use client";

import React ,{useState} from 'react';
//import { useNavigate } from 'react-router-dom';
import SideBarNav from './SideBarNav';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import Toast from './Toast';
import { postProjects } from '@/controller/requestProject';
import withAuthRole from './withAuthRole';
//import { useState } from 'react/cjs/react.production.min';



function ProjectCreatePage() {

  const initialValue = {
    projectid: '',
    projectname: '',
    startdate: '',
    enddate: '',
    projecttype: '',
    projectsbu: '',
    projectmanager: '',
  }

  const [project, setProject] = useState(initialValue);
  const [projectfile, setProjectFile] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (event) => {
    setProject((prev) => ({...prev, [event.target.name]:event.target.value}))
  }
  const handleFileChange = (event) => {
    setProjectFile(event.target.files[0]);
  };
  const router = useRouter()
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //console.log(projectfile)
    if(project.projectid !== '' && project.projectname !== ''
    && project.startdate !== '' && project.enddate !== '' &&
     project.projecttype !== '' && project.projectsbu !== ''
      && project.projectmanager !== '' && projectfile !== '') {
      setLoading(true);
      console.log(projectfile);
      // const formData = new FormData();
      // formData.append('projectid', project.projectid);
      // formData.append('projectname', project.projectname);
      // formData.append('startdate', project.startdate);
      // formData.append('enddate', project.enddate);
      // formData.append('projecttype', project.projecttype);
      // formData.append('projectsbu', project.projectsbu);
      // formData.append('projectmanager', project.projectmanager);
      // formData.append('projectfile', projectfile);
      //console.log(formData);
      const res = await postProjects(project.projectid, project.projectname, project.startdate, project.enddate,
        project.projecttype, project.projectsbu, project.projectmanager, projectfile.name);
      if(res.ok) {
        setSuccessMessage("Project Created Success");
        setError("");
        setTimeout(() => {
          //setSuccessMessage(null);
          router.back();
          router.refresh();  // Replace '/another-page' with your desired page URL
        }, 3000);
        // router.refresh();
        // router.back();
      } else {
        setError('Project id already exists');
        setLoading(false);
      }
    } else {
      setError("All field are required");
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideBarNav />
        <div className="col py-3">
          <div className="row mt-4">
              <div className="col-md-12 col-lg-10 mx-auto">
              <h3 className="login-heading mb-4">Create Project</h3>
              {error && <div className='text-danger'>{error}</div>}
              <form onSubmit={handleOnSubmit} className='mt-2'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingProjectId" placeholder="ProjectId" name='projectid' onChange={handleChange}/>
                    <label htmlFor="floatingProjectId">Project Id</label>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingProjectName" placeholder="ProjectName" name='projectname' onChange={handleChange}/>
                    <label htmlFor="floatingProjectName">Project Name</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="date" className="form-control" id="floatingStartDate" placeholder="StartDate" name='startdate' onChange={handleChange}/>
                    <label htmlFor="floatingStartDate">Start Date</label>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="date" className="form-control" id="floatingEndDate" placeholder="EndDate" name='enddate' onChange={handleChange}/>
                    <label htmlFor="floatingEndDate">End Date</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingProjectType" placeholder="ProjectType" name='projecttype' onChange={handleChange}/>
                    <label htmlFor="floatingProjectType">Project Type</label>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingProjectSBU" placeholder="ProjectSBU" name='projectsbu' onChange={handleChange}/>
                    <label htmlFor="floatingProjectSBU">Project SBU</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingProjectManager" placeholder="ProjectManager" name='projectmanager' onChange={handleChange} required/>
                    <label htmlFor="floatingProjectManager">Project Manager Email Address</label>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="form-floating mb-3">
                    <input type="file" className="form-control" id="floatingProjectFile" placeholder="ProjectFile" name='projectfile' onChange={handleFileChange} required/>
                    <label htmlFor="floatingProjectFile">Project File</label>
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

export default withAuthRole(ProjectCreatePage, ['admin'])