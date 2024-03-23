import { useEffect, useState } from "react";

export function useFetch(fetchFunc, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFunc();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.messge || "Failed to fetch data." });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFunc]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData,
  };
}
