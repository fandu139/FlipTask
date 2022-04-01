import { API_URI } from '../index';
import axios from 'axios';

export type Response = {
  message: string;
  response: {
    status: number;
    data: {
      metadata: { status_code: number };
      data: { media: { media_key: string; uuid: string }[] };
    };
  };
};

export const fetchData = async (): Promise<Response | null> => {
  return new Promise((resolve) => {
    axios
      .get(API_URI, {
        timeout: 15000,
      })
      .then(async (response) => {
        if (response.data.status === 200) {
          return resolve({
            message: 'success',
            response,
          });
        }
        return resolve({
          message: 'error',
          response,
        });
      })
      .catch((error) =>
        resolve({
          message: 'error',
          response: error,
        }),
      );
  });
};

export default fetchData;
