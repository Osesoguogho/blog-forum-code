import React, {useState} from 'react';
import { Form, useActionData, useLocation, useNavigation, redirect, useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { getAllPosts } from '../api';


// export async function Action({request}) {
//     const formData = await request.formData();
//     const image = formData.get("images");
//     const titles = formData.get("title");
//     const descriptions = formData.get("description");
//     const categorys = formData.get("category")
//     const submit = {images: image, title: titles, description: descriptions, category: categorys};
//     const id = new URL(request.url).searchParams.get("id");
//     console.log(id)
    

    
//     try {
//       console.log(submit);
//       const config =  { headers: {
//         'Content-type': 'multipart/form-data',
//         Authorization: token
//     }};
//     const response = await axios.patch(`http://localhost:3800/api/blogspot/update/${id}`, submit,
//       config);
//       if (!response.data) {
//         return ({message: "unable to fetch data"})
//       };
//       const data = response.data;
//       console.log(data);
//       await getAllPosts();
//       return redirect("/user_posts")
//     } catch (error) {
//       console.log(error.message);
//       console.log(error.status)
//       return error.message
//     }
//   };

const EditPost = () => {
    const navigate = useNavigate();
    // const navigation = useNavigation();
    // const data = useActionData();
    const location = useLocation();
    console.log(location);
    const token = localStorage.getItem("token")
    const titles = location.state.title;
    const descriptions = location.state.PostDetails;
    const categorys = location.state.category;
    const id = location.state.postId;
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [posts, setPosts] = useState({
      title:titles,
      description:descriptions,
      category:categorys
    });
    const [loading, setLoading] = useState(false)
    function handleChange(e) {
      setPosts({...posts, [e.target.name]:e.target.value})
    };
    console.log(posts);
    const {title, description, category} = posts;
    console.log(title);
    async function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      // formData.append("images", images);
      // 
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i])
      };
      formData.append("posts", JSON.stringify(posts))
      // formData.append("title", title);
      // formData.append("description", description);
      // formData.append("category", category);
      console.log(formData);
      const config =  { headers: {
        Authorization: token
    }};
      try {
        const response = await axios.patch(`http://localhost:3800/api/blogspot/update/${id}`, posts, config);
          if (!response.data) {
         throw new Error("unable to fetch data")
          }
          const data = response.data;
          console.log(data);
          getAllPosts();
          console.log("file uploaded successfully")
          setLoading(false)
        return navigate(`/${id}`)
      
      } catch (error) {
        setError(error.message)
        console.log(error.response)
      }
    }
  
    return (
       <div className='min-h-screen flex flex-col justify-center items-center'>
        {error && <h3 className='text-red-500'>{error}</h3>}
        <form className='flex flex-col w-3/4 rounded-xl shadow-2xl p-5 my-5'
         onSubmit={handleSubmit}>
          <label htmlFor="file" className='text-black dark:text-white font-bold'>Upload your photos</label>
            <input type="file" placeholder='upload pictures' multiple className='form-input'
            onChange={(e)=> setImages(e.target.files)}/>
          <label htmlFor="title" className='text-black dark:text-white font-bold'>Title</label>
            <input type="text" name='title' required className='form-input' value={posts.title} onChange={handleChange} />
           <label htmlFor="descrition" className='text-black dark:text-white font-bold'>Description</label>
            <textarea type="text" name='description' rows="6" required className='form-input' value={posts.description} onChange={handleChange}/>
          <label htmlFor="category" className='text-black dark:text-white font-bold'>Category</label>
           <select name="category" id="category" className='form-input' value={posts.category}
           onChange={handleChange} required>
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
            <option value="History">History</option>
          </select>
          <button className='bg-blue-600 my-5 mx-1 rounded-lg text-center p-2'
          disabled={loading}
          >
            
         {loading ? "Loading" : "submit"}
          </button>
            {error && <p>{error.message}</p>}
          
        </form>
      </div>
    )
}

export default EditPost