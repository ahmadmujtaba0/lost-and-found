import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data)).catch(err => console.error(err));

    axios.get('http://localhost:5000/api/admin/items', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setItems(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>All Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} ({user.email}) - Admin: {user.isAdmin ? 'Yes' : 'No'}</li>
        ))}
      </ul>

      <h3>All Items</h3>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            [{item.type.toUpperCase()}] {item.itemName} - {item.location} <br />
            By: {item.userId?.name} ({item.userId?.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;