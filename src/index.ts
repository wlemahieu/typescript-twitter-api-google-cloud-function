/**
 * This Google Cloud Function will connect to Twitter using
 * the provided Twitter Bearer token stored inside of Cloud
 * secrets and allow you to use the Twitter API!
 *
 * Example #1 fetches the 20th Tweet ever recorded in history but @jack
 * Example #2 lists all of your own Tweets using tail-call recursion
 */
import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import axios from 'axios';

const getTweets = async (
  myUserId: string,
  perPage: number,
  nextToken?: string
) => {
  let url = `https://api.twitter.com/2/users/${myUserId}/tweets?tweet.fields=entities&max_results=${perPage}`;
  if (nextToken?.length) {
    url = `${url}&pagination_token=${nextToken}`;
  }

  const results = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });

  // collect tweets
  const tweets = results?.data?.data;
  const newNextToken = results?.data?.meta?.next_token;

  return {newNextToken, tweets};
};

export const run: HttpFunction = async (req, res) => {
  console.log('Connecting to Twitter API...');

  // allow our local apps to interact with this gcf. (affects local only)
  res.set('Access-Control-Allow-Origin', '*');

  const {nextToken, rowsPerPage} = req.query;

  console.log({nextToken, rowsPerPage});
  try {
    console.log('Fetching all my tweets...');
    const myUser = await axios.get(
      'https://api.twitter.com/2/users/by/username/WesleyLeMahieu',
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    const myUserId = myUser.data?.data?.id;

    if (myUserId) {
      // const likes = await client.tweets.usersIdLikedTweets(myUser.data.id);
      const {newNextToken, tweets} = await getTweets(
        myUserId,
        parseInt((rowsPerPage as string) || '100', 0),
        (nextToken as string) || ''
      );
      res.send({
        // likes: likes?.data,
        nextToken: newNextToken,
        tweets,
      });
    } else {
      res.send('No user found, check your Twitter secrets!');
    }
  } catch (e) {
    console.log(e);
  }
};
