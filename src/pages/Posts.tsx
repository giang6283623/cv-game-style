import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getPosts, createPost } from '../services/api';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostBody, setNewPostBody] = useState<string>('');
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsData = await getPosts();
      setPosts(postsData.slice(0, 10)); // Show only first 10 posts
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostBody.trim()) return;

    try {
      setCreating(true);
      const newPost = await createPost({
        title: newPostTitle,
        body: newPostBody,
        userId: 1
      });
      
      // Add the new post to the beginning of the list
      setPosts([newPost, ...posts]);
      setNewPostTitle('');
      setNewPostBody('');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div className="container">Loading posts...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Posts & Articles</h1>
        <p className="page-subtitle">
          Create and browse posts with our interactive content management system
        </p>
        <div className="stats">
          <span className="stat-item">{posts.length} posts loaded</span>
        </div>
      </div>
      
      {/* Create Post Form */}
      <Card className="create-post-section" hover={false}>
        <div className="create-post-header">
          <h2>📝 Create New Post</h2>
          <p>Share your thoughts with the community</p>
        </div>
        <form onSubmit={handleCreatePost} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter an engaging title..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              disabled={creating}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Post Content</label>
            <textarea
              id="body"
              placeholder="Write your post content here..."
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              disabled={creating}
              rows={5}
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={creating || !newPostTitle.trim() || !newPostBody.trim()}
          >
            {creating ? '⚙️ Creating...' : '🚀 Publish Post'}
          </button>
        </form>
      </Card>

      <div className="posts-section">
        <h2>Latest Posts</h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <Card key={post.id}>
              <article className="post-article">
                <header className="post-header">
                  <h3 className="post-title">{post.title}</h3>
                  <div className="post-meta">
                    <span className="post-author">👤 User {post.userId}</span>
                    <span className="post-id">#{ post.id}</span>
                  </div>
                </header>
                <div className="post-content">
                  <p>{post.body}</p>
                </div>
                <footer className="post-footer">
                  <div className="post-actions">
                    <button className="action-btn">👍 Like</button>
                    <button className="action-btn">💬 Comment</button>
                    <button className="action-btn">🔄 Share</button>
                  </div>
                </footer>
              </article>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
