import axios from 'axios';
import { useEffect, useState } from 'react';

// const API_URL = 'http://127.0.0.1:4001/';
const API_URL = 'http://localhost:4001/';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

export default function useEndpoint(req, immediate = true) {
  const [res, setRes] = useState({
    data: null,
    loading: immediate && req.url ? true : false,
    completed: false,
    error: false,
  });
  const dispatch = (payload) => {
    if (!req.url) return;

    setRes({
      data: null,
      loading: true,
      completed: false,
      error: false,
    });

    return instance({
      ...req,
      data: payload,
    })
      .then((res) =>
        setRes({
          data: res.data,
          loading: false,
          error: false,
          complete: true,
        }),
      )
      .catch(() =>
        setRes({
          data: null,
          loading: false,
          error: true,
          complete: true,
        }),
      );
  };

  useEffect(() => {
    if (!immediate) return;

    dispatch(req);
    // }, [req.url]);
  }, []);

  return {
    ...res,
    dispatch,
  };
}
