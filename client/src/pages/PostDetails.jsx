import React, {useState} from "react"
import { Link, useParams, Form, useLocation, useNavigate, useLoaderData, redirect } from "react-router-dom"
import { getAllPosts } from "../api"
import Comment from "../components/Comment";
import ImageSlider from "../components/ImageSlider";
// import { postComment } from "../api";
// import SimilarPost from "../components/SimilarPost";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function Loader({params}) {

    return getAllPosts(params.id)
};

// export async function Action ({params, request}) {
//     const id = await params.id;
//     console.log(id)
//  const formData = await request.formData();
//  const text = formData.get("text");

//  try {
//     await postComment(id, text)
//     return redirect(".")
//  } catch (error) {
//     return error.message
//  }
// }

export default function PostDetails() {
    const location = useLocation();
    const posts = useLoaderData();
    const post = posts[0];
    console.log(post);
    const [comments, setComments] = useState(post.comments);
    // const comments = post.comments
    // console.log(comments);
    // console.log(localStorage.getItem("token"))
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    // console.log(decoded)

   // api call to delete comment
 async function handleCommentDelete(id, cred) {
   try{ const res =await axios.put(`http://localhost:3800/api/blogspot/uncomments/${post._id}`, cred);
    if (!res.data) {
        throw new Error("fail to delete");
    };
  await getAllPosts(post._id);
   const data = await res.data;
   setComments(data.comments)
} catch (err){
    console.log(err.message)
   }

 }
  
    const search = location.state?.search || "";
    const category = location.state?.category || "all"

    return (
        <div className={ `container flex flex-col mb-5 light text-black dark:text-white w-screen m-auto ${!post.images? "h-dvh" : ""}`}>
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {category} blogs</span></Link>

            <div className=" flex flex-col justify-center">
            <h2 className=" my-2 flex justify-center font-black">{post.title}</h2>
           
                {post.images.length >0 && <ImageSlider imageData={post.images}/>}
               
                <div className="flex flex-col justify-center">
                <i className="mt-5">
                 Category: {post.category}
                </i>
                <h3 className="my-2">By: {post.postedBy?.name}</h3>
                <p>{post.description}</p>
                </div>
            </div>
            <hr className="my-5"/>
            <h2 className="text-4xl font-bold">Comments</h2>
                {comments && comments.map(comment => (
                    <div key={comment._id} className="my-2">
                        <i>{comment.text}</i>
                        <h3>By: {comment.postedBy?.name}</h3>
                        <h6 className="float-right font-light -translate-y-6">{new Date(comment.created).toLocaleDateString()}</h6>
                        {comment.postedBy?._id === decoded.id ? <button onClick={() => { handleCommentDelete(comment.id, {_id: comment._id})}} className="bg-red-300 rounded-full px-3 my-3 hover:bg-red-600">Delete</button> : ""}
                    </div>
                ))
                }
                <hr className="my-6"/>

                {/* <Form Method="post" replace>
            <textarea name="text" placeholder='post your comment here' id="comment"
             className='text-black'/>
        {token ? <button >comment</button> : <p>log in to post comment</p>}
        </Form> */}
                <Comment post={post}/>
               {/* <hr/>

               {similarPosts && similarPosts.map(similarPost=>(  
                <SimilarPost key={similarPost._id} similarPost={similarPost}/> 
            ))
            } */}

        </div>
    )
}