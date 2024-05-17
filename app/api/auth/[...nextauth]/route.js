import User from "@/models/createUserSchema";
import connectMongoDB from "@/utils/mongodb";
import NextAuth from "next-auth/next";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const {email, password} = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({email});

                    if(!user) {
                        return null;
                    }
                    
                    if(password !== user.password) {
                        return null;
                    }
                    console.log(user);
                    // localStorage.setItem('User', JSON.stringify(user));
                    return {firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    role: user.role,
                    mobileNumber: user.mobileNumber,
                    password: user.password,
                    selectedProjectId: user.selectedProjectId,
                }
                //return NextResponse.json({user});
                } catch(e) {
                    console.log("Error "+error);
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 10800,
        updateAge: 60
    },
    callbacks: {
        async jwt({ user, token}) {
            if (user) {
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;
                token.dateOfBirth = user.dateOfBirth;
                token.role = user.role;
                token.mobileNumber = user.mobileNumber;
                token.selectedProjectId = user.selectedProjectId;
            }    

            return token;
        },
        async session({ session, token }) {
            /* update the sessions.user based on the token object */
            if (token && session.user) {
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.email = token.email;
                session.user.dateOfBirth = token.dateOfBirth;
                session.user.role = token.role;
                session.user.mobileNumber = token.mobileNumber;
                session.user.selectedProjectId = token.selectedProjectId;
            }
            return session;
        },
        // async signIn(user, account, profile) {
        //     if (user) {
        //         //console.log(user.user.role);
        //       // Redirect users based on their roles
        //       if (user.user.role === 'user') {
        //         console.log(user.user.role);
        //         return 'http://localhost:3000/user'; // Redirect users with role 'user' to '/user' page
        //         // return '/user'
        //       } else if (user.user.role === 'admin') {
        //         console.log(user.user.role);
        //         return 'http://localhost:3000/admin'; // Redirect users with role 'admin' to '/admin' page
        //         // return '/admin'
        //       } else if (user.user.role === 'superAdmin') {
        //         console.log(user.user.role);
        //         return 'http://localhost:3000/superAdmin'; // Redirect users with role 'admin' to '/admin' page
        //         // return '/superAdmin'
        //       } else {
        //         //console.log(user.role);
        //         return 'http://localhost:3000/'; // Redirect unrecognized roles back to '/login'
        //         // return '/'
        //       }
        //     }
        //     return false; // Return false if no user object
        // }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn:'/'
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};