import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/user/permissions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPermissions(res.data.permissions);
    };

    fetchPermissions();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <div style={{ width: '200px', float: 'left' }}>
        <h3>Menu</h3>
        <ul>
          {permissions.map((perm, idx) => (
            <li key={idx}><a href="#">{perm}</a></li>
          ))}
        </ul>
      </div>
      <div style={{ marginLeft: '220px' }}>
        <h3>Placeholder Page</h3>
        <p>This is a common page shown when a menu item is clicked.</p>
      </div>
    </div>
  );
}

export default Dashboard;
