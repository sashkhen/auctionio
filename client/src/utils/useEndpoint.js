import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINT } from '../variables';

const instance = axios.create({
  baseURL: ENDPOINT,
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
