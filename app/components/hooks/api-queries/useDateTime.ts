import { api } from '@/services/api/api';
import { parse } from 'date-fns';
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
        const date = parse(result.data.date, 'MM-dd-yyyy', new Date());
        const formattedDate = date
          .toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: 'America/Los_Angeles',
          })
          .replace(',', '');
        // const formattedTime = date.toLocaleTimeString('en-US', {
        //   hour: 'numeric',
        //   // minute: '2-digit',
        //   hour12: false,
        //   timeZone: 'America/Los_Angeles',
        // });

        setDateTime({ timeZone: 'PST', date: formattedDate, time: '' });
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
