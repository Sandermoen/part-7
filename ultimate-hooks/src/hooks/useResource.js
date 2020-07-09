import { useState } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
  const [resource, setResource] = useState(null);
  const handleError = (err) => {
    throw new Error(
      err.response
        ? err.response.data.error
        : err.request
        ? err.request
        : err.message
    );
  };

  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl);
      setResource(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
    }
  };

  return [resource, { getAll }];
};
