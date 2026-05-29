import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetch(activitiesEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        if (isMounted) {
          setActivities(normalizeCollectionResponse(payload));
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
    return <p className="text-danger">Unable to load activities: {error}</p>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id ?? activity.id} className="list-group-item">
            <strong>{activity.type ?? 'Activity'}</strong>
            <div className="small text-muted">
              Duration: {activity.duration ?? 'N/A'} minutes
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
