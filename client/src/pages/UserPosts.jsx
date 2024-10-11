import React, {Suspense, useState} from 'react';
import { userPosts, RequireAuth, deletePost } from '../api';
import { Link, useSearchParams, useLoaderData, Await, defer, redirect, useNavigate } from "react-router-dom";
// import { RequireAuth } from '../utils';
import PostDetails from './PostDetails';



export async function Loader() {
    // const pathname = new URL(request.url).pathname;
    // const isAuthenticated = await RequireAuth();
    // console.log(isAuthenticated)
    // if(isAuthenticated === !true) {
    //     return redirect(`/login?message=You must log in first.&redirectTo=${pathname}`)
    // };
    const token = localStorage.getItem("token")
    let userPost = userPosts(token);
    console.log(userPost);
 return defer({userPost});
};

const UserPosts = () => {
    const data = useLoaderData();
    console.log(data.userPost);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)


    
    function postRender(userBlogs){
        const totalPage = Math.ceil(userBlogs.length/itemsPerPage);
        const paginate = [...Array(totalPage).keys()].slice(1);
    
        const lastIndex = page * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
    
        const handlePrevious = () =>{
            if(page !== 1) setPage(page-1);
        };
        const handleNext = () =>{
            if(page !== totalPage) setPage(page + 1);
        }

        const userPostings = userBlogs.slice(firstIndex, lastIndex).map(post => (
            <div key={post._id} className="flex flex-col rounded-3xl shadow-2xl my-5 p-4 justify-center items-center w-3/4 mx-auto">
                <Link
                    to={`/${post._id}`}
                >
                   {post.images.length> 0 && <img src={`http://localhost:3800/uploads/${post.images[0].filename}`} className=" my-2  object-cover " alt={post.images[0].originalname}/>}
                    <div className="">
                        <h3>{post.title}</h3>
                        <p>By: {post.postedBy?.name}</p>
                        <p>created on: {post.createdAt}</p>
                    </div>
                    <i className={`${post.category}`}>Category: {post.category}</i>
                </Link>
                <div className='flex justify-between m-3'>
                    <Link to={`/edit_post?id=${post._id}`} state={{postId:post._id, title:post.title, category:post.category, 
                    PostDetails:post.description, images:post.images
                    }} className='px-3 bg-yellow-500 text-black rounded-lg mx-5 float-left'>Edit</Link>
                    <button onClick={()=> {deletePost(post._id); navigate(".")}} className='px-3 bg-red-500 rounded-lg float-right mx-5'>Delete</button>
                </div>
            </div>
        ));
        return (
            <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
            {userPostings}
           </div>
           <div className="flex justify-center items-center">
            {paginate.length>0 &&<p className=" cursor-pointer" onClick={handlePrevious}>Prev</p>}
            {paginate.map((pages, index) =>(
                    <ul className={`flex justify-center items-center cursor-pointer mx-1 my-5 border-solid border-white bg-green-500 px-2 ${pages===page? "bg-red-500 font-bold":""}`} key={index}>
                        <li onClick={()=>setPage(pages)}>{pages}</li>
                    </ul>
                ))}
                {paginate.length>0 && <p className=" cursor-pointer" onClick={handleNext}>Next</p>}
            </div>
            </div>
        )
    }

  return (
    <div className="light text-black dark:text-white flex-grow min-h-screen ">
        <div className="flex justify-between">
            <h1>Your Posts</h1>
            <Link to="/new_post" className="bg-green-500 bg-opacity-10 active:bg-red-500 px-3">Create post</Link>
            </div>
        
        <Suspense fallback={<p>loadin page.........</p>}>
        <Await resolve={data.userPost}>
                {postRender}
                </Await>
            </Suspense>
           
    </div>
  )
}

export default UserPosts