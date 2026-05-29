import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('activities')
      .then((data) => {
        if (isMounted) {
          setActivities(data);
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
