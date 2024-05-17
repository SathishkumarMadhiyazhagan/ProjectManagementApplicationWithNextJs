'use client';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import SideBarNav from './SideBarNav';
import { getAdmins } from '@/controller/requestUser';
import { useSession } from 'next-auth/react';
import withAuthRole from './withAuthRole';

function SuperAdmin() {
  const [userDetails, setUserDetails] = useState('');
  const [loading, setLoading] = useState(false);
  // const {data: session, status} = useSession();

  async function getAdminDetails() {
    const {user} =  await getAdmins();
    setUserDetails(user)
  }

  useLayoutEffect(() => {
    getAdminDetails();
    // if(status === 'authenticated' && session?.user?.role) {
    //   if(session?.user?.role === 'superAdmin') {
    //     router.push("/superAdmin");
    //   } else if(session?.user?.role === 'admin') {
    //     router.push("/admin");
    //   } else if(session?.user?.role === 'user') {
    //     router.push("/user");
    //   } else {
    //     return;
    //   }
    // }
  }, [])
  const router = useRouter();
  const handleOnClick = () => {
    setLoading(true)
      router.push('/superAdmin/createAdmin')
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
                      <h2>Admin Details</h2>
                    </div>
                    <div className="col-sm-4">
                      <button type="button" className="btn btn-info add-new" onClick={handleOnClick} disabled={loading}>
                          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Admin
                      </button>
                    </div>
                  </div>
                </div>
                {userDetails ? (<table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>DateOfBirth</th>
                      {/* <th>Role</th> */}
                      <th>MobilNumber</th>
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  {userDetails.map((user) => (<tbody>
                    <tr>
                      <td key={user.firstName}>{user.firstName}</td>
                      <td key={user.lastName}>{user.lastName}</td>
                      <td key={user.email}>{user.email}</td>
                      <td key={user.dateOfBirth}>{user.dateOfBirth}</td>
                      {/* <td key={user.role}>{user.role}</td> */}
                      <td key={user.mobileNumber}>{user.mobileNumber}</td>
                      {/* <td key={user._id}>
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

export default withAuthRole(SuperAdmin, ['superAdmin'])