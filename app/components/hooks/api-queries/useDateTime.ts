import { api } from '@/services/api/api';
import { useCallback, useEffect, useState } from 'react';

interface DateTime {
  timeZone: string;
  time: string;
  date: string;
}

export const useDateTime = () => {
  const [dateTime, setDateTime] = useState<DateTime>({
    timeZone: '',
    time: '',
    date: '',
  });
  const [dateTimeLoading, setDameTimeLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDateTime = useCallback(async () => {
    setDameTimeLoading(true);
    try {
      const result = await api.getDateTime();
      if (result.kind === 'ok') {
        const date = new Date(result.data.date);
        const formattedDate = date
          .toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })
          .replace(',', '');

        setDateTime({ ...result.data, date: formattedDate });
      } else {
        setError('Failed to load Date Time data');
      }
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setDameTimeLoading(false);
    }
  }, []);

  return {
    dateTime,
    setDateTime,
    dateTimeLoading,
    setDameTimeLoading,
    error,
    setError,
    fetchDateTime,
  };
};
