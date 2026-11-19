import { useEffect, useState } from 'react';
import axios from 'axios';
import offlineRecipes from '../data/offlineRecipes';

export default function useRecipes(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    axios.get('https://www.themealdb.com/api/json/v1/1/search.php', {
      params: { s: query },
      signal: controller.signal,
    })
      .then((response) => setData(response.data.meals || []))
      .catch((requestError) => {
        if (!axios.isCancel(requestError)) {
          setData(offlineRecipes.filter((meal) => meal.strMeal.toLowerCase().includes(query.toLowerCase())));
          setError('TheMealDB is unavailable. Showing a small offline collection instead.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  return { data, loading, error };
}