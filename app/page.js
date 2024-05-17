import Image from 'next/image'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginPage from '@/components/LoginPage'
import Script from 'next/script';

export default function Home() {
  return (
    <>
    {/* <Script src="https://code.jquery.com/jquery-3.6.0.min.js"></Script>
    <Script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></Script> */}

    <LoginPage/>
    </>
  )
}
