import { useState, useEffect } from "react";

function useFetchProducts(api) {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch(api);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();     
        if (json.products) {
          setData(json.products);
        } else {
          setData(json);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApi();
  }, [api]);

  return { data, loading, error };
}

export default useFetchProducts;
