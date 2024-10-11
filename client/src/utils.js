import { redirect } from "react-router-dom";
import  React, {useState, useLayoutEffect} from "react";

export function RequireAuth(request) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = new URL(request.url).pathname;
    const token = localStorage.getItem("token");

    async function handleSignIN() {
      try {
       const res = await fetch("http://localhost:3800/api/verify", 
           {
             method: "post",
             headers:{Authorization: token}}
       );
       const response = await res.json();
       console.log(response.status);
      return response.status
       
     } catch(err) {
           console.log(err.message)
       }
   };

  //  useLayoutEffect( () =>{
  //   const verify = handleSignIN();
    
  //    console.log("useEffect: ");
  //     if(verify){ setIsAuthenticated(true)};
  //     console.log("yes")
  //     console.log(isAuthenticated);
  //  }, []);

    if (!isAuthenticated) {
      throw redirect(`/login?message=You must log in first.&redirectTo=${pathname}`)
    };
}