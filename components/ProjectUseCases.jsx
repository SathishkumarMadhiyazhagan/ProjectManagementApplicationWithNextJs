'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import SideBarNav from './SideBarNav';
import withAuthRole from './withAuthRole';
import { getProjects } from '@/controller/requestProject';

function ProjectUseCases() {
  const [project, setProject] = useState(null);
  const [useCases, setUseCases] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState([]);
  const [loading, setLoading] = useState(true);


  async function getProjectDetails() {
    const {project} = await getProjects();
    setUseCases(project);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const queryParams = new URLSearchParams(window.location.search);
        const projectDetails = queryParams.get('projectDetails');
  
        if (projectDetails) {
          const parsedProject = JSON.parse(decodeURIComponent(projectDetails));
          setProject(parsedProject);
        }
    }
    getProjectDetails();
  }, []);

  const handleCheckboxChange = (option) => {
    const selectedIndex = selectedUseCase.indexOf(option._id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedUseCase, option._id];
    } else {
      newSelected = selectedUseCase.filter((id) => id !== option._id);
    }

    if(newSelected.length > 0) {
        setLoading(false);
    } else {
        setLoading(true);
    }

    console.log(newSelected);
    setSelectedUseCase(newSelected);
  };

  return (
    <div className="container-fluid">
        <div className="row flex-nowrap">
        <SideBarNav />
            <div className="col py-3">
            <h2>Project Details</h2>
            {project && (<div className='row mt-3'>
                <div className='row mt-2'>
                <div className="col-md-6">
                    <div className='row'>
                    <label className="col-md-4">Project Id</label>
                    <h6 className="col-md-8">{project.projectid}</h6>
                    </div>
                </div>
                    <div className="col-md-6">
                    <div className='row'>
                    <label className="col-md-4">Project Name</label>
                    <h6 className="col-md-8">{project.projectname}</h6>
                    </div>
                    </div>
                </div>
                <div className='row mt-2'>
                <div className="col-md-6">
                    <div className='row'>
                    <label className="col-md-4">Start Date</label>
                    <h6 className="col-md-8">{project.startdate}</h6>
                    </div>
                </div>
                    <div className="col-md-6">
                    <div className='row'>
                    <label className="col-md-4">End Date</label>
                    <h6 className="col-md-8">{project.enddate}</h6>
                    </div>
                    </div>
                </div>
                <div className='row mt-2'>
                <div className="col-md-6">
                    <div className='row'>
                    <label className="col-md-4">Project Type</label>
                    <h6 className="col-md-8">{project.projecttype}</h6>
                    </div>
                </div>
                    <div className="col-md-6">
                    <div className='row'>
                    <label className="col-md-4">Project SBU</label>
                    <h6 className="col-md-8">{project.projectsbu}</h6>
                    </div>
                    </div>
                </div>
                <div className='row mt-2'>
                <div className="col-md-6">
                    <div className='row'>
                    <label className="col-md-4">Project Manager</label>
                    <h6 className="col-md-8">{project.projectmanager}</h6>
                    </div>
                </div>
                </div>
            </div>)}
            <div className="row mt-3">
                <div className="col-sm-8">
                <h2>Project UseCases</h2>
                </div>
            </div>
            {useCases ? useCases.length > 0 ? 
            (<div className='p-3'>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-gap-2">
                {useCases.map((useCase) => (<div class="col p-2">
                        <input
                        type="checkbox"
                        checked={selectedUseCase.includes(useCase._id)}
                        onChange={() => handleCheckboxChange(useCase)}
                        /> {useCase.projectname}
                    </div>))}
                </div>
                <div className="d-grid align-items-center justify-content-center mt-4">
                    <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit" disabled={loading} >submit</button>
                </div>
            </div>) : (<div>Don't have usecases</div>) : <div>...Loading</div>}
            </div>
        </div>
    </div>
  )
}

export default withAuthRole(ProjectUseCases, ['user'])