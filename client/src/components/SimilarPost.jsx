import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const SimilarPost = ({similarPost}) => {
    const navigate = useNavigate();
  return (
    <div>
        <h3>Similar posts</h3>
                  <img src={`${apiUrl}/uploads/${similarPost.images}`} height={200} width={200}/>
                  <p>{similarPost.title}</p>
    </div>
  )
}

export default SimilarPost