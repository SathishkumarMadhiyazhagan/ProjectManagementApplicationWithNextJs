import React from 'react'
import SideBarNav from './SideBarNav'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function RestrictedPage() {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <SideBarNav />
        <div className="col py-3">
          <div className='row'>
            <div className='col'>
            <h1 className="position-absolute top-50 start-50 translate-middle">Restricted Page Access</h1>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default RestrictedPage