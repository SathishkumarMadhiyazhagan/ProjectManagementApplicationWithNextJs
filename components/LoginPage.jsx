'use client';
//import { createContext } from 'react'
 
//const Context = createContext()
import React, {useState, useEffect} from 'react';
//import Users from '../pages/api/Users'
//import {useNavigate} from 'react-router-dom';
import { redirect, useRouter } from 'next/navigation';
//import { useRouter } from 'next/router';
import Link from 'next/link';
//import { loginWithCredentials } from '@/controller/requestUser';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false);   
    const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {
      if(status === 'authenticated' && session?.user?.role) {
        if(session?.user?.role === 'superAdmin') {
          router.push("/superAdmin");
        } else if(session?.user?.role === 'admin') {
          router.push("/admin");
        } else if(session?.user?.role === 'user') {
          router.push("/user");
        } else {
          return;
        }
      }
    }, [session, router])

    const loginWithUserCredentails = async (e) => {
        e.preventDefault()
        try {
            const res = await signIn("credentials", {
              email,
              password,
              redirect: false
            });
            setError('');
            setLoading(true)
            if (res.error) {
              setLoading(false);
              setError("Invalid Credentials");
              return;
            }
            // } else {
            //   console.log(res.url);
            //   const urlsplit = res.url.split('/');
            //   console.log(urlsplit.length);
            //   // const user = await signIn('credentials', { email, password, redirect: false });
            //   // console.log(user);
            //   if (urlsplit[urlsplit.length-1] === 'user') {
            //     router.push('/user');
            //     // redirect('/user')
            //   } else if (urlsplit[urlsplit.length-1] === 'admin') {
            //     router.push('/admin');
            //     // redirect('/admin')
            //   } else if (urlsplit[urlsplit.length-1] === 'superadmin') {
            //     router.push('/superadmin');
            //     // redirect('/superAdmin')
            //   }
            // }
            //console.log(res);
            // // Manually handle redirection based on user's role
            // const user = await signIn('credentials', { email, password, redirect: false });
            // if (urlsplit[urlsplit.length-1] === 'user') {
            //   router.push('/user');
            // } else if (urlsplit[urlsplit.length-1] === 'admin') {
            //   router.push('/admin');
            // } else if (urlsplit[urlsplit.length-1] === 'superAdmin') {
            //   router.push('/superAdmin');
            // } else {
            //   router.push('/');
            // }
            // if(session?.urlsplit[urlsplit.length-1] == 'superAdmin') {
            //   router.replace("superAdmin")
            // } else if(session?.urlsplit[urlsplit.length-1] == 'admin') {
            //   router.replace("admin")
            // } else if(session?.urlsplit[urlsplit.length-1] == 'user') {
            //   router.replace("user")
            // }
            //router.replace('superAdmin');
          } catch (error) {
            setError('');
            setLoading(false);
            console.log(error);
          }

        // if(email !== '' && password !== '') {
        //     console.log(email+password);
        //     setError('');
        //     const {user, message} = await loginWithCredentials(email, password);
        //     //console.log(user.firstName + " "+ message);
        //     //e.preventDefault();
        //     if(user) {
        //         localStorage.setItem('User', JSON.stringify(user));
        //         if(user.role === 'superAdmin') {
        //             router.push('/superAdmin');
        //         } else if(user.role === 'admin') {
        //             router.push('/admin');
        //         } else if(user.role === 'user') {
        //             router.push('/user');
        //         }
        //     } else {
        //         setError("Invailde Credentials");
        //     }
        // } else {
        //     setError('Input Filed required values');
        //     //setEmail('');
        //     //setPassword('');
        //     console.log(error)
        // }
    }

  return (
    <div className="container-fluid ps-md-0">
        <div className="row g-0">
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className="container">
            <div className="row">
                <div className="col-md-6 col-lg-6 mx-auto">
                <h3 className="login-heading mb-2">Welcome back!</h3>
                {error && <div className='text-danger bold'>{error}</div>}
                <form onSubmit={loginWithUserCredentails} className='mt-2'>
                    <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" onChange={e => setEmail(e.target.value)} value={email} placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                    </div>

                    {/* <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                    <label className="form-check-label" htmlFor="rememberPasswordCheck">
                        Remember password
                    </label>
                    </div> */}

                    <div className="d-grid">
                    <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit" disabled={loading}>Sign in</button>
                    {/* <div className="text-center">
                        <a className="small" href="#">Forgot password?</a>
                    </div> */}
                    </div>

                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default LoginPage;