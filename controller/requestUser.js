//import { json } from "react-router-dom";

export async function getUsers() {
    try {
        const res = await fetch("/api/user", {
          cache:"no-store",
        })
        if(!res.ok) {
            throw new Error("Failed to fetch Users");
        }
        return res.json();
    } catch(error) {
        console.log("Error loading users", error)
    }
};

export async function getAdmins() {
  try {
      const res = await fetch("/api/user/admin", {
        cache:"no-store",
      })
      if(!res.ok) {
          throw new Error("Failed to fetch Users");
      }
      return res.json();
  } catch(error) {
      console.log("Error loading users", error)
  }
};

export async function postUsers(firstName, lastName, email, dateOfBirth, role,
    mobileNumber, password, selectedProjectId) {
    try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({firstName, lastName, email, dateOfBirth, role,
            mobileNumber, password, selectedProjectId}),
        });
        console.log(res);
  
        // if (res.ok) {
          return res;
        // } else {
          // throw new Error("Failed to create a user");
        // }
      } catch (error) {
        console.log(error);
        return ;
      }
};

export async function loginWithCredentials(email, password) {
    try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({email, password}),
        });
  
        if (res.ok) {
            const json = await res.json();
            console.log('Login successful:', json);
            return json;
            // Handle successful login - redirect or set user state, etc.
          } else {
            console.error('Login failed:', res.message);
            // Handle login failure - show error message, etc.
            return false;
          }
      } catch (error) {
        console.log(error);
        return false;
      }
};

