import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import "../styles/PostList.css"

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
