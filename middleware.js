//export {default} from 'next-auth/middleware';
import { NextResponse } from 'next/server'
 
export function middleware(request) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let authToken = request.cookies.get("next-auth.session-token")?.value;
  console.log(authToken) // => { name: 'nextjs', value: 'fast', Path: '/' }
  
  const logged = request.nextUrl.pathname === '/';

  if(logged) {
    if(authToken) {
        return NextResponse.redirect(new URL('/superAdmin', request.url));
    }
  } else {
    if(!authToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = { matcher: ["/", "/admin/:path*", "/superAdmin/:path*", "/user/:path*", "/restrictPage"] };