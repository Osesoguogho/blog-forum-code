import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { getAllPosts } from '../api';
import axios from "axios";
const token = localStorage.getItem("token");

// export async function ComposeLoader ({request}) {
//   await requireAuth(request);
// }


// export async function Action({request}) {
//   const formData = await request.formData();
//   const image = formData.get("images");
//   console.log(image);
//   const titles = formData.get("title");
//   const descriptions = formData.get("description");
//   const categorys = formData.get("category")
//   const submit = {images: image, title: titles, description: descriptions, category: categorys};
//   // const submit = Object.fromEntries(await request.formData())
//   // console.log(submit.images)
  
//   try {
//     console.log(submit);
//   console.log(token);
//     const config =  { headers: {
//       'Content-type': 'multipart/form-data',
//       Authorization: token
//   }};
//   const response = await axios.post("http://localhost:3800/api/blogspot", submit,
//     config);
//     if (!response.data) {
//       return ({message: "unable to fetch data"})
//     };
//     const data = response.data;
//     console.log(data);
//     await getAllPosts();
//     return redirect("/")
//   } catch (error) {
//     console.log(error.message);
//     console.log(error.status)
//     return error.message
//   }
// };

const ComposePost = () => {
  const navigate = useNavigate();
  // const data = useActionData();
  const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [posts, setPosts] = useState({
      title: "",
      description: "",
      category: ""
    });
    const [loading, setLoading] = useState(false)
    function handleChange(e) {
      setPosts({...posts, [e.target.name]:e.target.value})
    };
    const {title, description, category} = posts;
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    // formData.append("images", images);
    // 
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i])
    };
    // formData.append("jsonData", posts);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    console.log(formData);
    const config =  { headers: {
      'Content-type': 'multipart/form-data',
      Authorization: token
  }};
    try {
      const response = await axios.post("http://localhost:3800/api/blogspot", formData, config);
        if (!response.data) {
       throw new Error("unable to fetch data")
        }
        const data = response.data;
        console.log(data);
        getAllPosts();
        console.log("file uploaded successfully")
        setLoading(false)
      return navigate("/")
    
    } catch (error) {
      setError(error.message)
      console.log(error.response)
    }
  }

  return (
     <div className='min-h-screen flex flex-col justify-center items-center'>
      <form method="post" encType='multipart/form-data' className='flex flex-col w-3/4 rounded-xl shadow-2xl p-5'
      onSubmit={handleSubmit}>
        <label htmlFor="file" className='text-black dark:text-white font-bold'>Upload your photos</label>
           <input type="file" name='images' placeholder='upload pictures' multiple className='form-input' onChange={(e)=> setImages(e.target.files)}/>
        <label htmlFor="title" className='text-black dark:text-white font-bold'>Title</label>
           <input type="text" name='title' placeholder='Title of your Article' required className='form-input' onChange={handleChange}value={posts.title}/>
         <label htmlFor="descrition" className='text-black dark:text-white font-bold'>Description</label>
          <textarea type="text" name='description' rows="6" placeholder='Your Description' required className='form-input' onChange={handleChange} value={posts.description}/>
        <label htmlFor="category" className='text-black dark:text-white font-bold'>Category</label>
         <select name="category" id="category" className='form-input' required onChange={handleChange} value={posts.category}>
          <option value="">Select a category</option>
          <option value="health">Health</option>
          <option value="science/technology">Science/Technology</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
          <option value="politics">Politics</option>
          <option value="travel">Travel</option>
          <option value="news">News</option>
          <option value="business">Business</option>
          <option value="international News">International News</option>
          <option value="agriculture">Agriculture</option>
          <option value="job/vacancies">Jobs/Vacancies</option>
          <option value="sport">Sport</option>
          <option value="history">History</option>
        </select>
        <button className='bg-blue-600 my-5 mx-1 rounded-lg text-center p-2'
        disabled={loading}
        >
          
        {loading ? "submitting..." : "submit"}
        </button>
        {error && <p>{error.message}</p>}
        
      </form>
    </div>
  )
}

export default ComposePost