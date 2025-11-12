import React, {useState} from "react"
import { Link, useSearchParams, useLoaderData } from "react-router-dom"
// import { getAllPosts } from "../../api"
import { getAllPosts } from "../api";
const apiUrl = import.meta.env.VITE_API_URL;

export function Loader() {
    return getAllPosts()
}

 function BlogPosts() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const blogs = useLoaderData();
    // console.log(blogs)
    

    const typeFilter = searchParams.get("category");

    const filterPosts = typeFilter
        ? blogs.filter(blog => blog.category === typeFilter)
        : blogs;
        console.log(filterPosts);

        const totalPage = Math.ceil(filterPosts.length/itemsPerPage);
    const paginate = [...Array(totalPage).keys()].slice(1);
    console.log(paginate);

    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const displayPosts = filterPosts.slice(firstIndex, lastIndex).map(post => (
        <div key={post._id} className="flex flex-col rounded-3xl shadow-2xl my-5 p-4 justify-center items-center w-3/4 mx-auto">
            <Link 
                to={post._id}
                state={{
                    search: `?${searchParams.toString()}`,
                    category: typeFilter
                }}
            >
                {post.images.length>0 && <img src={`${apiUrl}/uploads/${post.images[0].filename}`} className=" my-2  object-cover " alt={post.images[0].originalname}/>}
                <div className="">
                    <h3>{post.title}</h3>
                    <p>By: {post.postedBy?.name}</p>
                    <p>created on: {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <i className={`${post.category}`}>Category: {post.category}</i>
            </Link>
        </div>
    ))

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    };
    const handlePrevious = () =>{
        if(page !== 1) setPage(page-1);
    };
    const handleNext = () =>{
        if(page !== totalPage) setPage(page + 1);
    }

    return (
        <div className="light text-black dark:text-white min-h-screen ">
            <div className="flex justify-between">
            <h1>Blog Post</h1>
            <Link to="/new_post" className="bg-green-500 bg-opacity-10 active:bg-red-500 px-3">Create post</Link>
            </div>
            <div className="flex overflow-x-scroll md:flex-wrap md:overflow-visible my-6">
                <button
                    onClick={() => handleFilterChange("category", "science/technology")}
                    className={
                        `post-category
                        ${typeFilter === "science/technology" ? "selected" : ""}`
                    }
                >Science/Technology</button>
                <button
                    onClick={() => handleFilterChange("category", "entertainment")}
                    className={
                        `post-category 
                        ${typeFilter === "entertainment" ? "selected" : ""}`
                    }
                >Entertainment</button>
                <button
                    onClick={() => handleFilterChange("category", "politics")}
                    className={
                        `post-category 
                        ${typeFilter === "politics" ? "selected" : ""}`
                    }
                >Politics</button>
                <button
                    onClick={() => handleFilterChange("category", "education")}
                    className={
                        `post-category 
                        ${typeFilter === "education" ? "selected" : ""}`
                    }
                >Education</button>
                <button
                    onClick={() => handleFilterChange("category", "health")}
                    className={
                        `post-category 
                        ${typeFilter === "health" ? "selected" : ""}`
                    }
                >Health</button>
                <button
                    onClick={() => handleFilterChange("category", "travel")}
                    className={
                        `post-category 
                        ${typeFilter === "travel" ? "selected" : ""}`
                    }
                >Travel</button>
                <button
                    onClick={() => handleFilterChange("category", "business")}
                    className={
                        `post-category 
                        ${typeFilter === "business" ? "selected" : ""}`
                    }
                >Business</button>
                <button
                    onClick={() => handleFilterChange("category", "news")}
                    className={
                        `post-category 
                        ${typeFilter === "news" ? "selected" : ""}`
                    }
                >News</button>
                <button
                    onClick={() => handleFilterChange("category", "international news")}
                    className={
                        `post-category 
                        ${typeFilter === "international news" ? "selected" : ""}`
                    }
                >International News</button>
                <button
                    onClick={() => handleFilterChange("category", "agriculture")}
                    className={
                        `post-category 
                        ${typeFilter === "agriculture" ? "selected" : ""}`
                    }
                >Agriculture</button>
                <button
                    onClick={() => handleFilterChange("category", "job/vacancies")}
                    className={
                        `post-category 
                        ${typeFilter === "job/vacancies" ? "selected" : ""}`
                    }
                >Job/Vacancies</button>
                <button
                    onClick={() => handleFilterChange("category", "history")}
                    className={
                        `post-category 
                        ${typeFilter === "history" ? "selected" : ""}`
                    }
                >history</button>
                <button
                    onClick={() => handleFilterChange("category", "sport")}
                    className={
                        `post-category 
                        ${typeFilter === "sport" ? "selected" : ""}`
                    }
                >sport</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("category", null)}
                        className="post-category"
                    >Clear filter</button>
                ) : null}
                

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
                {displayPosts}
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

export default BlogPosts