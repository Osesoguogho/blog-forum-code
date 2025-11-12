import {redirect} from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

// get all post Api
export async function getAllPosts (id) {
    const url = id ? `${apiUrl}/api/blogspot/${id}` : `${apiUrl}/api/blogspot`
    const response = await fetch(url);

    if (!response.ok) throw {message:"unable to fetch data",
        status: response.status,
        statusText: response.statusText
    };
    const data = await response.json();
    console.log(data);
    return data;
};

// To get user post 
export async function userPosts(token) {
    const response = await fetch(`${apiUrl}/api/blogspot/user`, {
        headers: {
            Authorization: token
        }
    });
    if (!response.ok) throw {message:"unable to fetch data",
        status: response.status,
        statusText: response.statusText
    };
    
    const data = await response.json();
    console.log(data);
    return data;
};

// send postv to server 

export async function postData(cred) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${apiUrl}/api/blogspot`, {
        method: "POST",
        header: {Authorization: token},
        body: JSON.stringify(cred)
    })

    if (response.ok) {
        const data = await response.json();
        getAllPosts();
        console.log(data);
    }  else if(!response.ok){
        throw {message: "Post not sent",
           status: response.status,
           statusText: response.statusText
       };
   };
};

// Api to edit post 

export const editPost = async (id, cred) => {
    const response = await fetch(`${apiUrl}/api/update/blogspot/${id}`, {
        method: "PATCH",
        body: cred
    })

    if (response.ok) {
        const data = await response.json();
        getAllPosts(id);
        console.log(data);
        return data;
    } else if(!response.ok){
         throw {message: "Post not sent",
            status: response.status,
            statusText: response.statusText
        };
    };
};

// delete route

export async function deletePost(id) {
    // const token = localStorage.getItem("token");
    await fetch(`${apiUrl}/api/blogspot/delete/${id}`,
       { method: "DELETE"}
    );
};

// API FOR COMMENTS

// Post comment

export async function postComment(id, cred) {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await fetch(`${apiUrl}/api/blogspot/comments/${id}`,
       { method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cred)
       }
    );
    if(!response.ok) throw {message: "unable to post data, please log in",
        status: response.status,
        statusText: response.statusText
    };
 const data  = response.json();
 console.log(data);
 await getAllPosts(id)

};

export async function deleteComment(id, cred) {
    const response = await fetch(`${apiUrl}/api/blogspot/uncomments/${id}`,
       { method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cred)
       }
    );
    if(!response.ok) throw {message: "unable to post data",
        status: response.status,
        statusText: response.statusText
    };
    return getAllPosts(id);
};

//Register and Login API
export async function registerUser(cred) {
    const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cred)
    });
    const token = await response.json();
    if(!response.ok) throw {message: token.message,
        satus: response.status,
        statusText: response.statusText
    };
    localStorage.setItem("token", token);
};
// login API
export  async function loginUser(cred) {
    const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cred)
    });
    const Token = await response.json();
if(!response.ok) throw { message: Token.message,
status: response.status,
statusText: response.statusText
};
console.log(Token);
    localStorage.setItem("token", Token);
};

export async function RequireAuth() {
    //   const pathname = new URL(request.url).pathname;
      const token = localStorage.getItem("token");
  
        try {
         const res = await fetch(`${apiUrl}/api/verify`, 
             {
               method: "post",
               headers:{Authorization: token}}
         );
         const response = await res.json();
         const verify = response.status;
         console.log(verify);
         return verify;
         
       } catch(err) {
             console.log(err.message)
         }
     };

