import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('teams')
      .then((data) => {
        if (isMounted) {
          setTeams(data);
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
