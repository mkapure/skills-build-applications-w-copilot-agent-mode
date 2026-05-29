import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch(teamsEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        if (isMounted) {
          setTeams(normalizeCollectionResponse(payload));
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
    return <p className="text-danger">Unable to load teams: {error}</p>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="list-group">
        {teams.map((team) => (
          <div key={team._id ?? team.id} className="list-group-item">
            <strong>{team.name ?? 'Unnamed team'}</strong>
            <div className="small text-muted">
              Members: {Array.isArray(team.members) ? team.members.length : 0}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
