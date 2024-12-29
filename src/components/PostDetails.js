import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import '../styles/PostDetails.css';
function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <img src={post.poster} alt={post.title} className="post-image" />
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetails;
