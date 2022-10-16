/**
 * getTweets.ts
 *
 * /2/users/:id/tweets
 *
 * Returns a list of tweets while considering pagination
 */
import get from '../helpers/get';

interface ReturnI {
  newNextToken?: string;
  tweets: Array<any>;
}

type GetTweetsT = (
  myUserId: string,
  perPage: number,
  nextToken?: string
) => Promise<ReturnI>;

const getTweets: GetTweetsT = async (myUserId, perPage, nextToken) => {
  let url = `https://api.twitter.com/2/users/${myUserId}/tweets?tweet.fields=entities&max_results=${perPage}`;

  // if there is another page, we'll have a token
  if (nextToken?.length) {
    url = `${url}&pagination_token=${nextToken}`;
  }

  // collect tweets
  const results = await get(url);
  const tweets = results?.data?.data;
  const newNextToken = results?.data?.meta?.next_token;

  return {newNextToken, tweets};
};

export default getTweets;
