import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const { data } = await axios.get(url, {
          cancelToken: source.token,
          withCredentials: true,
        });
        setLoading(false);
        setData(data.data);
      } catch (err) {
        setLoading(false);
        setError(err.response.data.message);
      }
    })();

    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
