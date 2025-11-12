import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    try {
      await axios.post(`${API_URL}/posts`, formData);
      setDescription('');
      setImage(null);
      fetchPosts();
    } catch (err) {
      console.error('Error adding post:', err);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div className="App">
      <h1>Content Management App</h1>
      
      {/* Add Post Form */}
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Post</button>
      </form>

      {/* Posts Grid */}
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={`http://localhost:5000${post.image_url}`} alt="Post" />
            <p>{post.description}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
