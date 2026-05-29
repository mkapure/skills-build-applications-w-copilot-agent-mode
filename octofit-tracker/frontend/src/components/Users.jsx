import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch(usersEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        if (isMounted) {
          setUsers(normalizeCollectionResponse(payload));
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
