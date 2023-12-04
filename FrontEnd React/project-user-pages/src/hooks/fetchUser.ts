import { useEffect, useState } from "react";
import { fetchUser } from "../Service/FetchLogin.Service";
import { AxiosError } from "axios";

export const useFetchData = async <T>() => {
  const [user, setUser] = useState<T>();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState();

  useEffect(() => {
    fetchUser()
      .then((res) => {
        
        const data = res.data as T
        if (data) {
          
        setUser(data);
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data.errors);
        }
      });
      
  }, []);

  return { user, loading, error };
};


export const fetchData = async () => {
    try {
    const data = await fetchUser();
    return data
    } catch (error) {
        
    }

  };
