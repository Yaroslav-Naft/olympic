import { api } from '@/services/api/api';
import { parse } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

interface DateTime {
  timeZone: string;
  time: string;
  date: string;
}

/**
 * A custom hook that fetches and manages date and time information from the API.
 * Provides real-time updates of the current date, time, and timezone.
 *
 * @returns {object} An object containing:
 *   - dateTime: The current DateTime object with timezone, time, and date
 *   - error: Any error that occurred during the fetch
 *   - dateTimeLoading: Boolean indicating if the data is being fetched
 *   - refetch: Function to manually trigger a refresh of the data
 */
export function useDateTime() {
  const [dateTime, setDateTime] = useState<DateTime>({
    timeZone: '',
    time: '',
    date: '',
  });
  const [dateTimeLoading, setDateTimeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDateTime = useCallback(async () => {
    setDateTimeLoading(true);
    setError(null);

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

        setDateTime({
          timeZone: 'PST',
          date: formattedDate,
          time: result.data.time,
        });
      } else if (result.kind === 'error') {
        setError(result.error);
      } else {
        setError('Failed to process date/time data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setDateTimeLoading(false);
    }
  }, []);

  return {
    dateTime,
    error,
    dateTimeLoading,
    refetchDateTime: fetchDateTime,
  };
}
