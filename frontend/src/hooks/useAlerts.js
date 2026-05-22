import { useState, useEffect } from 'react';
import { getAlerts } from '../services';

const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const res = await getAlerts();
        // your backend returns { message, alerts: [] }
        const data = Array.isArray(res.data) ? res.data : res.data.alerts;
        setAlerts(data || []);
      } catch (err) {
        // if no alerts exist, treat as empty — not a crash
        setAlerts([]);
        setError(err.message || 'Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  // true if any alert exists
  const hasAlerts = alerts.length > 0;

  // total exceeded amount across all categories
  const totalExceeded = alerts.reduce((sum, a) => sum + a.exceeded, 0);

  return { alerts, hasAlerts, totalExceeded, loading, error };
};

export default useAlerts;