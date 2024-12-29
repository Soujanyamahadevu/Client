import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import '../styles/PostForm.css';
function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '', poster: '' });

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get(`/posts/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching post', error);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosInstance.put(`/posts/${id}`, formData);
        alert('Post updated successfully');
      } else {
        await axiosInstance.post('/posts', formData);
        alert('Post created successfully');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post', error);
    }
  };

  return (
    <div className="post-form">
      <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="poster"
          placeholder="Poster Image URL"
          value={formData.poster}
          onChange={handleChange}
        />
        <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
}

export default PostForm;
