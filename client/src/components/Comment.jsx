import React, {useState} from 'react';
import {jwtDecode} from "jwt-decode";
import { getAllPosts } from '../api';
import axios from "axios";


export default function Comment ({post}) {
    const token = localStorage.getItem("token");
    console.log(token);
    // const decoded = jwtDecode(token);
const [comments, setComments] = useState("");
console.log(post)
const posts = post;
const id = posts._id;
console.log(id)
function handleChange (e) {
    setComments(e.target.value)
};
const Text = comments;
const comment = {text: Text }
console.log(Text)
console.log(comment)
// async function handleSubmit () {
//     await postComment(posts._id, comment)
// }
async function handleSubmit() {
    const config =  { headers: {
        Authorization: token
    }};
   try { const response = await axios.put(`http://localhost:3800/api/blogspot/comments/${id}`, comment,
      config);
    if(!response.ok) throw {message: "unable to post data, please log in",
        status: response.status,
        statusText: response.statusText
    };
 const data  = response.data;
 console.log(data);
 await getAllPosts(id)}catch (err){
    console.log(err.message)
 }

};


  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col  justify-center items-center">
            <textarea name="text" placeholder='post your comment here' id="comment"
            onChange={handleChange} cols="50" rows="4" className='text-black text-center w-3/4 rounded-lg'/>
        {token ? <button className="my-3 px-3 bg-blue-600 w-1/4 rounded-xl">submit</button> : <p>log in to post comment</p>}
        </form>
    </div>
  )
}
