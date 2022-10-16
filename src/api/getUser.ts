/**
 * getUser.ts
 *
 * /2/users/by/username/:id
 *
 * Returns a particular user's info
 */
import get from '../helpers/get';

const getUser = async (username: string) => {
  const url = `https://api.twitter.com/2/users/by/username/${username}`;
  return get(url);
};

export default getUser;
