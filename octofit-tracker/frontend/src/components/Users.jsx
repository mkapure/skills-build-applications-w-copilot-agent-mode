import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('users')
      .then((data) => {
        if (isMounted) {
          setUsers(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <p className="text-danger">Unable to load users: {error}</p>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id ?? user.id} className="list-group-item">
            <strong>{user.username ?? 'Unknown user'}</strong>
            <div className="small text-muted">{user.email ?? 'No email'}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
