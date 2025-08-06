import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getUsers } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  company?: {
    name: string;
  };
  phone?: string;
  website?: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="container">Loading users...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Users Directory</h1>
        <p className="page-subtitle">
          Browse through our user database fetched from JSONPlaceholder API
        </p>
        <div className="stats">
          <span className="stat-item">{users.length} users loaded</span>
        </div>
      </div>
      
      <div className="users-grid">
        {users.map((user) => (
          <Card key={user.id}>
            <div className="user-profile">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-username">@{user.username || 'user'}</p>
                <div className="user-details">
                  <div className="detail-item">
                    <span className="detail-icon">📧</span>
                    <span className="detail-text">{user.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <span className="detail-text">{user.phone || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🌐</span>
                    <span className="detail-text">{user.website || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🏢</span>
                    <span className="detail-text">{user.company?.name || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Users;
