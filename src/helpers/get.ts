/**
 * get.ts
 *
 * GET endpoint using bearer token authorization
 */
import axios from 'axios';

const get = async (url: string) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });
};

export default get;
